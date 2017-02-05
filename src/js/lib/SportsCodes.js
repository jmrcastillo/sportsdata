/**
 * Created by me on 2/4/17.
 */
//export default class SportsCodes  {
class SportsCodes  {

	constructor() {
		this.sports = {
			12: 'NFL Football',
			13: 'NCAA Football',
			10: 'NBA Basketball',
			11: 'NCAA Basketball',
			1: 'NBA Baseball',
			6: 'Hockey',
			8: 'Soccer',
			7: 'Horse Racing',
			9: 'Auto Racing',
			5: 'Golf',
			3: 'Boxing',
		};
	}
	getText(sport) {
		return this.sports[sport];
	}

}
export default (new SportsCodes);