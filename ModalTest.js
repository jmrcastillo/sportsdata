/**
 * Created by me on 1/31/17.
 */

import React from "react";
import Login from "../components/Login";
import Modal from 'react-modal';

export default class ModalTest extends React.Component {

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



        return (
            <div>
                <button onClick={(event)=>{
                    this.setState({modalIsOpen: true});
                }}>
                Open Modal
                </button>

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

                    <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                    <button onClick={(event)=>{
                        this.setState({modalIsOpen: false});
                    }}>close</button>
                    <div>I'm a modal window</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                    <Login observer={this.props.observer}/>
                </Modal>
            </div>
        );


    }
}



