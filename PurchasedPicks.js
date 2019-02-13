/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";
import Utils from "../lib/Utils";


export default class PurchasedPicks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillUnmount() {
    }


    render() {


  //      console.log("<Cart> # Picks ", this.state.picks.length);
        return (
        <div>


            {/*<!--Start Cart Box-->*/}
            <table width="630" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                <tr style={{textAlign: 'center', backgroundcolor: '#990000'}}>
                    <td height="40" style={{textAlign: 'center', backgroundcolor: '#990000'}}><div title="Page 1">
                        <div>
                            <div> <span className="trebuchet14BW">Your Picks</span> </div>
                        </div>
                    </div></td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundcolor: '#990000' }} >
                        <table width="620" border="0" cellSpacing="0" cellPadding="0">
                            <tbody>
                            <tr>
                                <td style={{textAlign: 'center', backgroundcolor: '#990000' }}>
                                    <table width="630" border="0" cellSpacing="2" cellPadding="2">
                                    <tbody>


                                  {this.props.purchasedPicks.map((pick, i) => {
                                        //  console.log("PurchasedPicks pick", pick, i);
                                        return (
                                        <tr key={i}>
                                          <td colSpan="5"
                                              style={{textAlign: 'left', backgroundcolor: 'White'}}>
                                              <span className="trebuchet14B" style={{float:'left'}}>{pick.title}
                                              </span>

                                              <br />


                                              <span
                                                  className="trebuchet14" style={{float:'left'}}
                                                   dangerouslySetInnerHTML={
                                                        {__html: pick.body}
                                                    }
                                              />

                                              <br />
                                              <br />
                                          </td>
                                        </tr>
                                        );

                                    })}




                                <tr>
                                    <td width="28"
                                        style={{textAlign: 'center', backgroundcolor: 'White'}}>


                                    </td>
                                </tr>

                                </tbody>
                                </table>
                                </td>
                            </tr>

                            </tbody>

                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a href="#" onClick={event=> {
                            this.props.pubsub.publish('mode-normal');
                        }
                        }><img src="/images/return_catalog_btn.png" border="0" />
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
            {/*<!--end cartn box-->*/}
        </div>



        );
    }
}




