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
        this.subscribe_logged_in = this.props.pubsub.subscribe('logged-in', (message, data)=> {
            this.setState({modalIsOpen: false});
        });
    }
    componentWillUnmount() {
        this.props.pubsub.unsubscribe(this.subscribe_logged_in);
    }

    render() {

        const onClickLoggedIn = (event)=>{
            this.props.pubsub.publish('add-pick', {pick:
                    {
                        ...this.props.pick,
                        isPAW: this.props.isPAW,
                    }
                })
        };
        const onClickLoggedOut = (event)=>{
            this.setState({modalIsOpen: true});
            this.props.pubsub.publish('add-pick', {pick:
                {
                    ...this.props.pick,
                    isPAW: this.props.isPAW,
                }
            })
        };
    //    const onClickMemberSuspended =
        var x = ()=>{
            alert('There is a problem with your account.  To resolve this, please call us at 1-800-643-4700.');
        };

        const onClick = this.props.memberSuspended ?
            ()=>{
                alert('There is a problem with your account.  To resolve this, please call us at 1-800-643-4700.');
            } : this.props.loggedIn ? onClickLoggedIn : onClickLoggedOut;

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

                    <Login pubsub={this.props.pubsub}/>
                </Modal>
            </div>
        );


    }

}



