import Money from "money-formatter";

class Utils  {

/*	contains(target) {
		for (i in this) {
			if (this[i] === target) return true;
		}
		return false;
	}*/

    applyPrepaidDiscount(price) {
        return Math.floor(0.8 * price);
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

}
export default (new Utils);
