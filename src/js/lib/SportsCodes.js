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
			14: 'CFL Football',
			15: 'WNBA Basketball',
			16: 'Soccer',
			1: 'MLB Baseball',
			5: 'Golf',
			3: 'Boxing',
			6: 'Hockey',
			7: 'Horse Racing',
			8: 'Other',
			9: 'Auto Racing',
		};

		this.sportsOrdered = [
			12,13,14,10,11,15,1,6,5,16,3,8,7,9
		]


	}
	getText(sport) {
		return this.sports[sport];
	}

	getImgsrc(sport){
		var imgsrc;
		console.log(sport);
		switch(sport){
			case 12 : imgsrc = 'images/Sport_Logos/nfl_logo.png'; break;
			case 13 : imgsrc = 'images/Sport_Logos/ncaafb_logo.jpeg'; break;
			case 10 : imgsrc = 'images/Sport_Logos/nba_blueborder.png'; break;
			case 11 : imgsrc = 'images/Sport_Logos/mens_ncaabb.jpeg'; break;
			case 14 : imgsrc = 'images/Sport_Logos/cfb_playoffs.jpeg'; break;
			case 15 : imgsrc = 'images/Sport_Logos/wnba_logo.jpeg'; break;
			case 16 : imgsrc = 'images/Sport_Logos/soccer_logo.jpeg'; break;
			case 1 : imgsrc = 'images/Sport_Logos/mlb_logo.png'; break;
			case 5 : imgsrc = 'images/Sport_Logos/PGA_Golf.png'; break;
			case 3 : imgsrc = 'images/Sport_Logos/Boxing_logo.jpeg'; break;
			case 6 : imgsrc = 'images/Sport_Logos/hockey.png'; break;
			case 7 : imgsrc = 'images/Sport_Logos/horseracing.jpeg'; break;
			case 8 : imgsrc = 'images/Sport_Logos/nfl_logo.png'; break;
			case 9 : imgsrc = 'images/Sport_Logos/nascar_border.jpeg'; break;
			default: 
		}

		return imgsrc;
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