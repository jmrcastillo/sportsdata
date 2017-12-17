/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";
import Pick from "../components/Pick";
import Moment from "moment";

export default class PickList extends React.Component {

    constructor() {
        super();

        this.state = {
            picks: [],
            teaserEnabled: [],
        };
    }
    componentWillMount() {
    //    const values = Base64.decode(this.props.params.ecapperdata).split("|");
     //   this.setState({ecapper_id: values[0], photo_uri: values[1], handicapper_name: values[2]});
    }
    componentDidMount() {

        this.loadPicks(this, true);

     //   setInterval(this.loadPicks, 30000, this);

        // Todo: setInterval for every minute:
        /*
            pickExpirationUTC - Coming from server as UTC date/time.
            currentDateUTC - current local system time adjusted to UTC date / time
            diff - # of minutes remaining to expiration time that came from server

            For each pick we can calculate the current minutes remaining until expired.
            If <= 2 mins, drop the pick off the list


        */
    }


    loadPicks(self, firstLoad=false) {

        var newPicks = [];

        PicksAPI.loadPicks().done((picks) => {
            newPicks = picks.map(pick => {
                    // Todo:  Any processing on load..
                    return pick;
                });

                self.setState({picks:newPicks});

            }
        );

        //      console.log ("newPicks inside ", newPicks);

/*        if (firstLoad) {
            self.setState({picks:newPicks});
            return;
        }*/

        var d = new Date();
        const moment = new Moment();
//2017-12-16 00:05

      //  console.log("Picks loaded... UTC epoch date: ", Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getMinutes(), d.getSeconds()));


        var date1 = new Moment('2016-10-08 10:29:23');
        var date2 = new Moment('2016-10-08 11:06:55');
        var diff = date2.diff(date1, 'minutes');

     //   console.log ("MOMENT", moment, moment.utc(), diff);



        const pickExpirationUTC = Moment('2017-12-16 00:05');


        //const currentDateUTC = Moment().utc();
        //const other = Moment.utc().toDate()
        const currentDateUTC = Moment().add(-(Moment().utcOffset()), 'm');


        console.log ("pickExpirationUTC ", pickExpirationUTC, "currentDateUTC", currentDateUTC, "diff: ", pickExpirationUTC.diff(currentDateUTC, 'minutes'), currentDateUTC);



    }
//.getUnixTime()

    render() {

        const sportBox = {
            backgroundColor:'#990000',
        };
        const pickBox = {
            backgroundColor:'#000000',
        };

        return (
            <div>
                <div className="col-9a maxheight">
                    {/*<!-- box begin -->*/}
                    <div className="box maxheight">
                        <div className="border-top maxheight">
                            <div className="border-right maxheight">
                                <div className="border-bot maxheight">
                                    <div className="border-left maxheight">
                                        <div className="left-top-corner maxheight">
                                            <div className="right-top-corner maxheight">
                                                <div className="right-bot-corner maxheight">
                                                    <div className="left-bot-corner maxheight">
                                                        <div className="inner2">
                                                            <br />
                                                            <h3>Guaranteed Experts Picks</h3><h4>You Win Or You Don't Pay - It's That Simple</h4>
                                                            <h5>Red Hot Experts Best Bets</h5>
                                                            <div align="center">
                                                                <table width="640" border="0" cellSpacing="0" cellPadding="0">
                                                                <tbody>
                                                                <tr>
                                                                    <td height="40" align="center" style={pickBox}>
                                                                        <table width="630" border="0" cellSpacing="0" cellPadding="0">
                                                                        <tbody>
                                                                        <tr>
                                                                        <td align="right">
{/*                                                                                <script type="text/javascript" language="javascript"><!--
function leapto(form)  {
var myindex=form.dest.selectedIndex
window.location=(form.dest.options[myindex].value);

}
// -->
                                                                            </script>*/}
                                                                                [Script for dropdown]
                                                                                <form name="myform1" id="myform1">
                                                                                    <select name="dest" size="1" onchange="leapto(document.myform1);">
                                                                                        <option value="">Sort By</option>

                                                                                        <option value="../football/issue12/newsletter.pdf">Issue 12</option>
                                                                                        <option value="../football/issue11/newsletter.pdf">Issue 11</option>
                                                                                        <option value="../football/issue10/newsletter.pdf">Issue 10</option>
                                                                                        <option value="../football/issue9/newsletter.pdf">Issue 9</option>
                                                                                        <option value="../football/issue8/newsletter.pdf">Issue 8</option>
                                                                                        <option value="../football/issue7/newsletter.pdf">Issue 7</option>
                                                                                        <option value="../football/issue6/newsletter.pdf">Issue 6</option>
                                                                                        <option value="../football/issue5/newsletter.pdf">Issue 5</option>
                                                                                        <option value="../football/issue4/newsletter.pdf">Issue 4</option>
                                                                                        <option value="../football/issue3/newsletter.pdf">Issue 3</option>
                                                                                        <option value="../football/issue2/newsletter.pdf">Issue 2</option>
                                                                                        <option value="../football/pre/newsletter.pdf">Preseason</option>
                                                                                    </select>
                                                                                </form></td>
                                                                        </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style={sportBox}>
                                                                        <table width="630" border="0" cellSpacing="0" cellPadding="0">
                                                                        <tbody>
                                                                        {/*<!-- Start sports red bar-->*/}
                                                                        <tr>
                                                                            <td height="28" style={sportBox}>&nbsp;&nbsp;<span className="trebuchet14B"><font color="white">NBA</font></span></td>
                                                                        </tr>
                                                                        {/*<!-- End sports red bar -->*/}
                                                                        </tbody>
                                                                    </table>

                                                                        <table>
                                                                            <tbody>
                                                                            {this.state.picks.map((pick, i) => {
                                                                                return (
                                                                                    <tr key={i} >
                                                                                        <td>
                                                                                            <Pick pick={pick} />
                                                                                        </td>
                                                                                    </tr>


                                                                                )
                                                                            })}

                                                                            </tbody>
                                                                        </table>


                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td backgroundColor="black">&nbsp;</td>
                                                                </tr>
                                                                </tbody>
                                                                </table>
                                                                <img src="http://www.playbook.com/images/grey_line3.gif" alt="" width="550" height="12" />
                                                            </div>
                                                            <br />
                                                            <br />
                                                            <br />
                                                        </div><br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<!-- box end -->*/}
                </div>



            </div>


        );
    }
}
//        PicksAPI.loadServerTime().done((time)=>console.log("PROMISED time return: ", time));
//        console.log("PROMISED picks return: ", picks)


/*  loadPicks() {
 let url =  "https://www.playbook.com/picks-api1/get-server-time";
 console.log ("Loading url", url);

 var time = 0;
 $.ajax({
 url: url,
 dataType: 'json',
 type: 'GET',
 cache: false,
 success: (result) => {
 time = result;
 //	this.setState({handicappers: Object.values(handicappers)});
 console.log ("Got server time", time);
 },
 error: (xhr, status, err) => {
 console.error(url, status, err.toString());
 }
 }).then(() => console.log('AFTER DONE', time));
 return time;
 }
 */

/*    loadPicks() {
 let url =  `https://www.playbook.com/cube-api3/experts/${this.state.ecapper_id}/picks`;
 //	console.log ("Trying to load url", url);

 $.ajax({
 //url: this.props.url,
 url: url,
 dataType: 'json',
 type: 'GET',
 cache: false,
 success: (picks) => {
 const paidPicks = Object.values(picks).filter(pick=> {
 if (pick.price > 0) {
 return pick;
 }
 });
 this.setState({picks: paidPicks});
 this.setState ({teaserEnabled: paidPicks.map((pick) => {return false})});

 console.log ("Got picks ", paidPicks);
 },
 error: (xhr, status, err) => {
 console.error(url, status, err.toString());
 }
 });
 }*/

/*	handleClick(e) {
 console.log ("CLICKED");
 debugger;
 this.context.router.transitionTo('/');
 }*/



