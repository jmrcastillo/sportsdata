
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
	checkFlaggedMemberLevel(member) {
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
    	if (member.level === 1) {
            console.log("cf returning true ", member.level);
            return true;
		}
        return false;

	}



}
export default (new Utils);
