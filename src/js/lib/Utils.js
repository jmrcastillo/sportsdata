import Money from "money-formatter";
import Cookies from "universal-cookie";

class Utils  {

  constructor() {
    this.cookies =  new Cookies();


  }
  // TODO:  try constructor for Cookies()
/*	contains(target) {
		for (i in this) {
			if (this[i] === target) return true;
		}
		return false;
	}*/

  applyPrepaidDiscount(price) {
        return Math.floor(0.7 * price);
  }
	isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	// Turns array of picks into string of pick_id|isPAW
	stringifyPicks(picks) {
		return picks.map(pick => {
			return {pick_id: pick.pick_id, isPAW: pick.isPAW};
		}).reduce((prev, curr) => {
			return prev  + curr.pick_id + '|' + curr.isPAW + ',';
		},'').slice(0, -1);
	}

    /*
          if ($member->level == 1) {
        ShowError ($level_error);

    } elseif ($member->level == 2 && $member->current_purchases >= 7) {
        ShowError ($level_error);

    } elseif ($member->level == 3 && $member->current_purchases >= 14) {
        ShowError ($level_error);

    } elseif ($member->level == 4 && $member->current_purchases >= 21) {
        ShowError ($level_error);

    }
     */
	checkFlaggedMemberLevel(member) {
    	let retValue = false;
    	if (member.level === 1) {
            retValue = true;
		} else if (member.level === 2 && member.current_purchases >= 7) {
            retValue = true;
        } else if (member.level === 3 && member.current_purchases >= 14) {
            retValue = true;
        } else if (member.level === 4 && member.current_purchases >= 21) {
            retValue = true;
        }
//            console.log("cf level is 3, cp >= 14, returning true ", member.level);
        return retValue;
	}

	getTokenBalance(tokens) {
       return Money.format ('USD', parseInt(tokens.realTokens) + parseInt(tokens.awardTokens) + parseInt(tokens.makeupTokens));
	}
	getTokensApplied(tokens) {
      return parseInt(tokens.realTokensApplied) + parseInt(tokens.awardTokensApplied)  + parseInt(tokens.makeupTokensApplied)
    }
	getMemberTokenBalance(member) {
        return Money.format ('USD', parseInt(member.tokens_real) + parseInt(member.tokens_award) + parseInt(member.tokens_makeup));
    }

	getSiteID() {
    let result = '0';
    const id = this.cookies.get('site-id');
    if (typeof (id) != 'undefined') {
      result = id;
    }
    return result;
    //return Playbook.state.isMobile ? '11' : '0'
	}
// TODO:  Design some kind of a global cookie object (or cookie manager)
	// Presently does no stringification
	saveCookie(name, value) {
  //  console.log("Setting cookie ", name, value);
    this.cookies.set(name, value, {path: "/"});

  }
  getCookie(name) {
    return this.cookies.get(name);
  }

  fakeGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }


}
export default (new Utils);
