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
    return (
      <div>
        {/*<!--Start Cart Box-->*/}
        <div className="row m-0">
          <div className="col-12 m-auto">
            <h2 className="row mx-0 my-4">Your Picks</h2>
            <div className="row m-0">
              {this.props.purchasedPicks.map((pick, i) => {
                //  console.log("PurchasedPicks pick", pick, i);
                return (
                  <div className="my-2" key={i}>
                    <div style={{textAlign: 'left'}}>
                                              <span className="font-weight-bold my-2 w-100">{pick.title}
                                              </span>
                      <p
                        className=""
                        dangerouslySetInnerHTML={
                          {__html: pick.body}
                        }
                      />
                    </div>
                  </div>
                );

              })}
            </div>
          </div>
        </div>
        <table width="630" border="0" cellSpacing="0" cellPadding="0">
          <tbody>
          <tr style={{textAlign: 'center', backgroundcolor: '#990000'}}>
            <td height="40" style={{textAlign: 'center', backgroundcolor: '#990000'}}><div title="Page 1">
              <div>
                <div> <span className="trebuchet14BW"></span> </div>
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
              <button className="btn btn-lg pl-cartbtn m-2" onClick={event=> {
                this.props.pubsub.publish('mode-normal');
              }
              }><i className="fa fa-angle-left"></i>Continue Shopping
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        {/*<!--end cartn box-->*/}
      </div>



    );
  }
}



