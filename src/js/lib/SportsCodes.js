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
			1: 'MLB Baseball',
			6: 'Hockey',
			8: 'Soccer',
			7: 'Horse Racing',
			9: 'Auto Racing',
			5: 'Golf',
			3: 'Boxing',
		};

		this.sportsOrdered = [
			12,13,10,11,1,6,8,7,9,5,3
		]


	}
	getText(sport) {
		return this.sports[sport];
	}
	getGameStart(sport, minutes) {
	//	console.log("Getting game start for sport", sport, minutes);

		var gameStart = "Game starting";
		if (minutes > 10) {
			return gameStart;
		}

		switch (parseInt(sport, 10)) {
			case 12:
			case 13:
				gameStart = "KICKOFF";
			break;
			case 10:
			case 11:
				gameStart = "TIP OFF";
			break;

		}
		return gameStart;
	}

	getSportsOrdered() {
		return this.sportsOrdered;
	}
}
export default (new SportsCodes);