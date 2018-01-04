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
        //     console.log('LOGIN (member_id), (logged_in):', this.state.member_id, this.state.logged_in);

    }
    componentDidMount() {
        this.props.observer.subscribe('logged-in', (data)=> {
            this.setState({modalIsOpen: false});
        });
    }
    render() {

    //    console.log ("<BuyNow> Render", this.props);
        const onClickLoggedIn = (event)=>{
            alert ("Adds this pick to the cart");
        };
        const onClickLoggedOut = (event)=>{
            this.setState({modalIsOpen: true});
        };
        const onClick=this.props.loggedIn ? onClickLoggedIn : onClickLoggedOut;

/*
        if (onClick === onClickLoggedIn) {
            console.log ("<BuyNow> Render Function is onClickedLoggedIn");
        }
        if (onClick === onClickLoggedOut) {
            console.log ("<BuyNow> Render Function is onClickedLoggedOut");
        }
*/


        return (
            <div>
                <img src="images/buynow.png"  className={this.props.loggedIn ? 'buynow-enabled' : 'buynow-disabled'}
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

                    <Login observer={this.props.observer}/>
                </Modal>
            </div>
        );


    }
}



