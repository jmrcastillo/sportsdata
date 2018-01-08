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
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
/*        this.props.observer.subscribe('logged-in', (data)=> {
            this.setState({modalIsOpen: false});
        });*/
        this.props.pubsub.subscribe('logged-in', (message, data)=> {
            this.setState({modalIsOpen: false});
        });
    }
    componentWillUnmount() {
     //   this.props.observer.unsubscribe('logged-in');
  //      this.props.pubsub.clearAllSubscriptions();
    }

    render() {


        const onClickLoggedIn = (event)=>{
            // alert ("Adds this pick to the cart");
            this.props.pubsub.publish('add-pick', {pick: this.props.pick,
                isPAW: this.props.isPAW})
        };
        const onClickLoggedOut = (event)=>{
            this.setState({modalIsOpen: true});
            console.log("<BuyNow> Going to add pick", this.props.pick);
            this.props.pubsub.publish('add-pick', {pick: this.props.pick,
                isPAW: this.props.isPAW})


        };
        const onClick = this.props.loggedIn ? onClickLoggedIn : onClickLoggedOut;

        const buynowClass = 'buynow-enabled';

        return (

            <div>
                <img src="images/buynow.png"  className={buynowClass}
                     onClick={onClick} width="85"  border="0" align="left"/>


                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={(event)=>{
                        // references are now sync'd and can be accessed.
                        this.subtitle.style.color = '#00f';
                    }}
                    onRequestClose={(event)=>{
                        this.setState({modalIsOpen: false});
                    }}
                    style={this.customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>LOGIN</h2>
                    <button onClick={(event)=>{
                        this.setState({modalIsOpen: false});
                    }}>close</button>

                    <Login observer={this.props.observer} pubsub={this.props.pubsub}/>
                </Modal>
            </div>
        );


    }

}



