
class Utils  {

	contains(target) {
		for (i in this) {
			if (this[i] === target) return true;
		}
		return false;
	}



}
export default (new Utils);

Array.prototype.contains = function ( needle ) {
    for (let i in this) {
        if (this[i] === needle) return true;
    }
    return false;
}