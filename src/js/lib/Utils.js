
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
}
export default (new Utils);
