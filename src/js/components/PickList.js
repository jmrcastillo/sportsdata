/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";
import Pick from "../components/Pick";

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

//        PicksAPI.loadServerTime().done((time)=>console.log("PROMISED time return: ", time));
        PicksAPI.loadPicks().done((picks)=>{
        //        console.log("PROMISED picks return: ", picks)
                this.setState({picks:picks})
            }
        );

    }

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

    render() {

        const sportBoxStyle = {
            backgroundColor:'#990000',

        };
        const pickBoxStyle = {
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
                                                                    <td height="40" align="center" style={pickBoxStyle}>
                                                                        <table width="630" border="0" cellSpacing="0" cellPadding="0">
                                                                        <tbody>
                                                                        <tr>
                                                                        <td align="right"><h4>
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
                                                                                </form></h4></td>
                                                                        </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="center" style={sportBoxStyle}>
                                                                        <table width="630" border="0" cellSpacing="0" cellPadding="0">
                                                                        <tbody>
                                                                        {/*<!-- Start sports red bar-->*/}
                                                                        <tr>
                                                                            <td height="28" style={sportBoxStyle}>&nbsp;&nbsp;<span className="trebuchet14B"><font color="white">NBA</font></span></td>
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


/*
 <div></div>

<table width="100%" border="0" cellSpacing="0" cellPadding="0">
    <tbody>
    {this.state.picks.map((pick, i) => {
        if (pick.price > 0) {

            //	const url = "/#/pick-forsale/" + pick.pick_id;
            const buyUrl = `https://www.ipsports.net/ecps/default/gpicks_4sale.php?SITE_ID=11&SEARCH_MODE=ECAPPER_ID&ECAPPER_ID=${this.state.ecapper_id}`;
            return (
                <tr key={i}>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan="2"><img src={this.state.photo_uri} width="70"  alt={this.state.handicapper_name} border="0"/>&nbsp;&nbsp;{this.state.handicapper_name}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">{SportsCodes.getText(pick.sport)}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">{pick.title}</td>
                            </tr>
                            <tr>
                                <td colSpan="2" onClick={(event) => {

                                    //	console.log ("toggling to", i, ! this.state.teaserEnabled[i])

                                    this.setState({teaserEnabled:
                                        Update(this.state.teaserEnabled,
                                            {[i]: {$set: ! this.state.teaserEnabled[i]}})
                                    })

                                }}>
                                    {this.state.teaserEnabled[i] ? pick.teaser + ' <<Read less' : 'Read more >>'}
                                </td>
                            </tr>
                            <tr>
                                <td width="100" align="left">  {Money.format ('USD', pick.price)}
                                </td>
                                <td align="right"><a href={buyUrl}><img src="images/buy_now.png" width="70" height="20" border="0"/></a></td>
                            </tr>
                            <tr>
                                <td colSpan="2"><hr /></td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            )
        }})}
    </tbody>
</table>
 */




