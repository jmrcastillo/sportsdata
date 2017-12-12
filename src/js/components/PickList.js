/**
 * Created by me on 1/31/17.
 */

import React from "react";
import $ from "jquery";
import Base64 from "base-64";
import Money from "money-formatter";
import SportsCodes from "../lib/SportsCodes";
import Update from "immutability-helper";
import PicksAPI from "../lib/PicksAPI";


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
        function htmlTeaser(teaser) {
            return {__html: teaser};
        }
        return (
            <div>
                PICKS LIST
                <table>
                <tbody>
                {this.state.picks.map((pick, i) => {
                    return (
                        <tr key={i}>
                            <td>

                                <table width="630" border="0" cellSpacing="2" cellPadding="2" bgcolor="#FFFFFF">
                                    <tbody>
                                    <tr>
                                        <td colSpan="3">
                                            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                            <tr>
                                                <td bgcolor="white">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="white"><div align="left" class="trebuchet14B">{pick.title}</div></td>
                                            </tr>
                                            </tbody>
                                        </table></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" align="center"><img src="images/dot_h.png" width="626" height="7"></img></td>
                                    </tr>
                                    <tr>
                                        <td width="262" align="left">
                                            <table width="96%" border="0" cellSpacing="0" cellPadding="0">
                                                <tbody>
                                            <tr>
                                                <td width="85" valign="middle"><img src="images/buynow.png" width="85"  border="0" align="left"></img></td>

                                                <td valign="middle">Pay After Win: {Money.format ('USD', (Math.floor(pick.price * .4)))}</td>
                                            </tr>
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td><img src="images/buynow.png" width="85" border="0" align="left"></img></td>
                                                <td valign="middle">Guaranteed Pre-Paid:  {Money.format ('USD', pick.price)}</td>
                                            </tr>
                                                </tbody>
                                        </table>
                                        </td>
                                        <td width="3"><img src="images/dots_v.png" width="7" height="92"></img></td>
                                        <td width="345">
                                            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                            <tr>
                                                <td bgcolor="white"><div align="left" dangerouslySetInnerHTML={

                                                    htmlTeaser(pick.teaser)

                                                } /></td>
                                            </tr>
                                            </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>





                            </td>
                        </tr>


                    )
                })}

                </tbody>
                </table>
                END PICKS LIST

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




