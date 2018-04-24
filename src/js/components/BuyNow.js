/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Login from "../components/Login";
import Modal from 'react-modal';


export default class BuyNow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };

        this.customStyles = {
            content : {
/*                 top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)',*/


                left                  : '40%',
                width                 : '350',
                height                : '300',
                top                   : '10px',
                backgroundColor       : '#ff8'
            },


/*            backgroundColor: '#ff8',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30*/


        };
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.subscribe_logged_in = this.props.pubsub.subscribe('logged-in', (message, data)=> {
            this.setState({modalIsOpen: false});
        });

    }
    componentWillUnmount() {
        this.props.pubsub.unsubscribe(this.subscribe_logged_in);
    }

    doClose() {
  //      console.log ("Buynow doing Close()");
        this.props.pubsub.publish('empty-cart');
        this.setState({modalIsOpen: false});
    }

    render() {

        const onClickLoggedIn = (event)=>{
            this.props.pubsub.publish('add-pick', {pick:
                {
                    ...this.props.pick,
                    isPAW: this.props.addAsPAW,
                }
            });
        };
        const onClickLoggedOut = (event)=>{
            this.setState({modalIsOpen: true});
            this.props.pubsub.publish('add-pick', {pick:
                {
                    ...this.props.pick,
                    isPAW: this.props.addAsPAW,
                }
            });
        };

        
        let onClick = {};
        if (this.props.memberSuspended) {
            onClick = ()=>{
                alert('There is a problem with your account.  To resolve this, please call us at 1-800-643-4700.');
            }
        } else if (this.props.memberLevelFlagged) {   // member level issue returns true;
            onClick = ()=>{
                alert("For your protection there is a purchase limit associated with your account. Please call 1-800-643-4700 to have your limit changed. Thank You -- The Staff at Ecapper LLC");
            }
        } else if (this.props.loggedIn) {
            onClick = onClickLoggedIn;
        } else {
            onClick = onClickLoggedOut;
        }
 
        const buynowClass = 'buynow-enabled';

/*       if (this.props.inCart) {
            console.log ("BuyNow pick in cart ", this.props.pick.pick_id);
            console.log ("addAsPAW: ", this.props.addAsPAW);
            console.log ("inCartAsPAW: ", this.props.inCartAsPAW);
       }
       */

        const alreadyInCartAsPAW =  this.props.inCart && this.props.addAsPAW && this.props.inCartAsPAW;
        const alreadyInCartAsPPD =  this.props.inCart &&  (! this.props.addAsPAW) && (! this.props.inCartAsPAW);

        return (

            <div>

                {alreadyInCartAsPAW &&
                <h5 style={{'color': 'maroon'}}>PAY after WIN selection.</h5>
                }
                {alreadyInCartAsPPD &&
                <h5 style={{'color': 'maroon'}}>GUARANTEED selection.</h5>
                }


                {! alreadyInCartAsPAW && ! alreadyInCartAsPPD &&
                    <img src="images/buynow.png" className={buynowClass}
                         onClick={onClick} width="85" border="0" align="left"
                    />
                }
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={(event)=>{
                        // references are now sync'd and can be accessed.


                        //    console.log ("BuyNow onAfterOpen()", this.state.modalIsOpen);
                        // Workaround for being iframe'd (auto scroll to top)
                        //window.scrollTo(0, 0);

                        this.subtitle.style.color = '#00f';
                    }}
                    onRequestClose={(event)=>{
                        this.doClose();
                    }}
                    style={this.customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>LOGIN</h2>
                    <button onClick={(event)=>{
                        this.doClose();
                    }}>close</button>

                    <Login pubsub={this.props.pubsub}/>
                </Modal>
            </div>
        );


    }

}



