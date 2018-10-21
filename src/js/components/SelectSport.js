

import React from "react";
import SportsCodes from "../lib/SportsCodes"


export default class SelectSport extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avalableSports: [],
    }
  }
  componentWillMount() {

  }
  componentDidMount() {

  }


  componentWillReceiveProps(nextProps) {

    // Scan Sports Codes, see which ones have length > 0
    const availableSports = SportsCodes.getSportsOrdered().filter((sport, i) => {
      const picks = nextProps.allPicks[sport];
      return (typeof (picks) != 'undefined' && picks.length > 0);
    });
    this.setState({availableSports: availableSports});

 //   console.log ("GOt available", availableSports);

    }







/*
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

 */

//  allPicks[pick.sport].push(pick);
  render() {

 //   console.log ("Selectsport wrp", this.state.sportsWithPicks);

    return (
      <div>



        <select name="sport" size="1" onChange={e=>{
         // Utils.saveCookie('selected-sport', 'ALL')
          console.log("CHANGED", e);
        }}>
          <option value="">All Sports</option>

          <option value="12">Professional Football</option>
          <option value="13">College Football</option>
          <option value="14">Canadian Football</option>
          <option value="10">Professional Basketball</option>
          <option value="11">College Basketball</option>
          <option value="15">Women's Basketball</option>
          <option value="1">Baseball</option>
          <option value="6">Hockey</option>
          <option value="5">Pro Golf</option>
          <option value="16">Soccer</option>
          <option value="16">Boxing</option>
          <option value="7">Horse Racing</option>
          <option value="9">Auto Racing</option>
          <option value="8">Other</option>

        </select>


      </div>



    );
  }
}






