/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Money from "money-formatter";
import Utils from "../lib/Utils";


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picks: [],
            logged_in: this.props.loggedIn,
        }

         const ta = [0,1,2];
   /*     if (this.state.picks.contains(2)) {
            console.log("The test array contains 2");
        } */

    }
    componentWillMount() {
        // var arr1 = [0, 1, 2];
        // var arr2 = [3, 4, 5];
        // arr1 = [...arr1, ...arr2];
    }
    componentDidMount() {
        this.props.pubsub.subscribe('add-pick', (message, data)=> {

                        console.log('<Cart> received add-pick message. ', message, data);

            const findIndex = this.state.picks.findIndex((pick)=>{
          //      console.log("findIndex: pick.pick_id, data.pick.pick_id", pick.pick_id, data.pick.pick_id);
                return pick.pick_id === data.pick.pick_id;
            });

            if (findIndex === -1) {
                this.setState({
                    picks: this.state.picks.concat([data.pick])
                })
            } else {
                if (this.state.picks[findIndex].isPAW === data.pick.isPAW) {
                    alert ("Already added  " + data.pick.title + ' ' + (data.pick.isPAW ? "Pay after Win" : "Guaranteed Prepaid"));
                } else {
                    console.log("<Cart> findIndex is ", findIndex);

                    let picks = this.state.picks;
        //            console.log("<Cart> picks b4 splice/insert ", picks);
                    picks.splice (findIndex, 1);
                    picks.splice (findIndex, 0, data.pick);
           //         console.log("<Cart> picks after splice/insert ", picks);
                    this.setState({
                        picks: picks
                    })

                }
            }
        });

        this.props.pubsub.subscribe('logged-in', (message, data)=> {
            this.setState({logged_in: true});
        });
        this.props.pubsub.subscribe('logged-out', (message, data)=> {
            this.setState({logged_in: false,
                            picks: []});


        });


    }
    componentWillUnmount() {
    }


    render() {

        const itemsTitle = this.state.picks.length === 0 ? "Add picks to cart to purchase" : "Items In My Cart";

  //      console.log("<Cart> # Picks ", this.state.picks.length);
        return (
        <div>





            {/*<!--Start Cart Box-->*/}
            <table width="630" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                <tr style={{textAlign: 'center', backgroundColor: '#990000'}}>
                    <td height="40" style={{textAlign: 'center', backgroundColor: '#990000'}}><div title="Page 1">
                        <div>
                            <div> <span className="trebuchet14BW">My Cart 1</span> </div>
                        </div>
                    </div></td>
                </tr>
                <tr>
                    <td style={{textAlign: 'center', backgroundColor: '#990000' }} >
                        <table width="620" border="0" cellSpacing="0" cellPadding="0">
                            <tbody>
                            <tr>
                                <td style={{textAlign: 'center', backgroundColor: '#990000' }}>
                                    <table width="630" border="0" cellSpacing="2" cellPadding="2">
                                        <tbody>
                                        <tr>
                                            <td colSpan="5" style={{textAlign: 'center', backgroundColor: 'White'}}>
                                                <span className="trebuchet14B">{PickTitle}</span><br />
                                                <span className="trebuchet14B">{PickBody}</span><br /><br />
                                            </td>
                                        </tr>


                                        <tr>
                                            <td width="28" style={{textAlign: 'center', backgroundColor: 'White'}}>


                                            </td>

                                        </tr>





                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>

                        </table></td>
                </tr>

                </tbody>
            </table>
            {/*<!--end cartn box-->*/}
        </div>



        );
    }
}


{/*
 <i className={'fa fa-trash'} ></i>
 */}



