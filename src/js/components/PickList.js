/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";
import Pick from "../components/Pick";
import Moment from "moment";
import SportsCodes from "../lib/SportsCodes"
import Login from "../components/Login";
import Cart from "../components/Cart";

export default class PickList extends React.Component {

    constructor() {
        super();

        this.state = {
            picks: [],
            allPicks: [],

        };
    }
    componentWillMount() {
    //    const values = Base64.decode(this.props.params.ecapperdata).split("|");
     //   this.setState({ecapper_id: values[0], photo_uri: values[1], handicapper_name: values[2]});
    }
    componentDidMount() {

        this.loadPicks(this, true);

       setInterval(this.loadPicks, 60000, this);

    }


    loadPicks(self, firstLoad=false) {

    //    var newPicks = [];

        PicksAPI.loadPicks().done((picks) => {
/*            newPicks = picks.map(pick => {
                    // Todo:  Any processing on load..
                    return pick;
                });

                self.setState({picks:newPicks});*/

                var allPicks = {};
                SportsCodes.getSportsOrdered().forEach (sport=>{
                    allPicks[sport] = [];
                });

                picks.forEach(pick=>{
                    allPicks[pick.sport].push(pick);
                });

                self.setState({allPicks: allPicks});

            }
        );

    }

    render() {

        const sportBox = {
            backgroundColor:'#990000',
        };
        const pickBox = {
            backgroundColor:'#000000',
        };

        return (


                <table width="1000" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                <tr>
                <td align="left" valign="top">
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
                                                                        <h4>
{/*                                                                                <script type="text/javascript" language="javascript"><!--
function leapto(form)  {
var myindex=form.dest.selectedIndex
window.location=(form.dest.options[myindex].value);

}
// -->
                                                                            </script>
                                                                                [Script for dropdown]*/}

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
                                                                                </form>
                                                                            </h4>
                                                                            </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style={sportBox}>
                                                                    {/*  Picks grouped by sport */}
                                                                    {SportsCodes.getSportsOrdered().map((sport, i) => {

                                                                        const picks = this.state.allPicks[sport];
                                                                        if (typeof (picks) != 'undefined' && picks.length > 0) {

                                                                            return (
                                                                                <div key={sport}>
                                                                                    <table width="630" border="0"
                                                                                           cellSpacing="0"
                                                                                           cellPadding="0">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <td height="28"
                                                                                                style={sportBox}>&nbsp;&nbsp;
                                                                                                <span
                                                                                                    className="trebuchet14B"><font
                                                                                                    color="white">{SportsCodes.getText(sport)}</font></span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>

                                                                                    <table>
                                                                                        <tbody>
                                                                                        {/*  List of picks for this sport */}

                                                                                        {picks.map((pick, i) => {
                                                                                         return (
                                                                                         <tr key={i} >
                                                                                         <td>
                                                                                         <Pick pick={pick} />
                                                                                         </td>
                                                                                         </tr>
                                                                                         )})}

                                                                                        </tbody>
                                                                                    </table>


                                                                                </div>

                                                                            )
                                                                        }
                                                                    })}

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
                                                        </div>
                                                        <br />
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

                    </td>
                    <td>



                <div className="col-5b maxheight">
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
                                                            <Login />
                                                            <br />
                                                                <br />
                                                            <Cart/>
                                                                    <br />
                                                                    <p align="center"><a href="http://record.webpartners.co/_urEveSwgFbXpoAg-rElY5NKIKMO3cZ1b/4/" target="blank" title="%DESCRIPTION%%" ><img src="http://media.webpartners.co/uploads/MB-GenSports-PromCodePLAYBOOK-280x280.gif" width="280" height="280" alt="Bet on Sports-Join MyBookie.ag today!" /></a></p>
                                                                    <br />
                                                                    <h11>&nbsp;Playbook Publications</h11>
                                                                    <ul className="list5">
                                                                        <li>
                                                                            <br />
                                                                            <a href="https://www.ipsports.net/ecps/ecapper_store/product_info.php?PRODUCT_ID=1190&amp;SITE_ID=0"><img src="https://www.ipsports.net/ecps/site_locals/store/0/product_images/2014yb.jpg" alt="NFL Totals Tip Sheet!" width="82" height="104" hspace="4" border="0" align="left" /><span className="topnav_trebuchet14Bred">2017 Playbook Football Handicapper's Yearbook Magazine</span><br />
                                                                                <span className="topnav_trebuchet12">Marc Lawrence's Playbook Football Preview Guide magazine is the nation's best-selling combination College and NFL Preview publication and is now available for sale and on the newsstands nationwide in mid-June. The 2017 magazine contains 248 pages of wall-to-wall information, jam packed with stats, logs, trends, winning systems, College and NFL previews, ATS Top 10 Teams, exclusive charts (Monday Night results, Coaches records, College Overtime games and many more.
</span>
                                                                            </a>

                                                                        </li>
                                                                        <li>
                                                                            <br />
                                                                            <br />
                                                                            <a href="https://www.ipsports.net/ecps/ecapper_store/product_info.php?PRODUCT_ID=300106&SITE_ID=0"><img src="https://www.ipsports.net/ecps/site_locals/store/0/product_images/fb.jpg" alt="" width="82" height="104" border="0" />
                                                                                <h5><span className="topnav_trebuchet14Bred">2017 Weekly Playbook Football Newsletter</span></h5>
                                                                                <span className="topnav_trebuchet12">Includes: Playbook Football Newsletter online weekly subscription The weekly Playbook Football Newsletter spans College and NFL Games throughout the 2017 season straight through the Super Bowl, featuring comprehensive write-ups on every College and NFL game along with star-rated Best Bets, Upset Specials, Awesome Angles, Top Trends, Incredible Stats, Wise Guy Contest Picks and a complete schedule with opening lines and projected margins for the entire week. Don't make a move without it!</span></a>
                                                                        </li>

                                                                    </ul>

                                                        </div><br /><br />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- box end -->*/}













            </div>

            </td>
            </tr>

            </tbody>
            </table>



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



/*

 // Pro football
 picks = picks.filter(pick=>{
 if (pick.sport === '12') {
 return true;
 }
 });
 self.setState({proFBPicks:picks});

 console.log ("TESTING 1234");

 const separatedPicks = Object.keys(SportsCodes.getSports()).map(sport=>{
 console.log ("Sport is ", sport, typeof(sport));
 return {
 sport: sport,
 picks: picks.filter(pick=>{
 console.log ("pick sport is ", pick.sport, typeof (pick.sport));
 if (pick.sport === sport) {
 return true;
 }
 })
 };

 });
 */



//           console.log ("separated picks: ", separatedPicks);

