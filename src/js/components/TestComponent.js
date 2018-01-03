/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PicksAPI from "../lib/PicksAPI";
import Freeplay from "../components/Freeplay";
import Cookies from "universal-cookie";

export default class TestComponent extends React.Component {

    constructor(props) {
        super(props);

        console.log('<TestComponent> is at least called. ');


        /*
         const memberIDCookie = new Cookies().get("pb-member");
         this.state = {
         record_id: typeof (memberIDCookie) === 'undefined' ? '' : memberIDCookie,
         member_id: '',
         password: '',
         logged_in: ! (typeof (memberIDCookie) === 'undefined'),
         member: null,
         }


         // Auto-login member on record_id
         if (this.state.logged_in ) {
         PicksAPI.loginMember(this.state.record_id).done((result) => {
         console.log("CONSTRUCTOR Login results", result);
         if (result.success) {
         this.setState({member: result.member});
         console.log("Login PUBLISHING logged-in");
         this.props.observer.publish('logged-in');
         }
         });

         }*/

    }
    componentWillMount() {
        console.log('<TestComponent> will soon subscribe to the logged-in event/message: ');

    }
    componentDidMount() {
        console.log('<TestComponent> is now subscribing to the logged-in event/message: ');

        var listener = this.props.observer.subscribe('logged-in', (data)=> {
            console.log('<TestComponent> received logged-in message as another TEST: ');
        });

        listener.on('error',(e)=>{
            console.log('Your <TestComponent> function has error:')
            console.log(e);
        })

        listener.on('succeed',()=>{
            console.log('Your <TestComponent> function was successfully executed')
        })

    }


    render() {

        //     console.log('LOGIN (member_id), (logged_in):', this.state.member_id, this.state.logged_in);


        return (
            <div>


            </div>
        )


    }
}



