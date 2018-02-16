
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
}
export default (new Utils);
