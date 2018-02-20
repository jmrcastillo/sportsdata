/**
 * Created by me on 1/31/17.
 */

import React from "react";

export default class CheckoutButton extends React.Component {

    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    componentDidMount() {

    }


    render() {

        const src = this.props.type == 'CC' ? 'images/checkoutCC.png' : 'images/checkoutT.png';
        const opacity = this.props.enabled ? 1 : .1;
        const handler = this.props.enabled ?
        (event)=>{
            this.props.pubsub.publish('mode-checkout', this.props.type);
        } : ()=>{};


        return (
          <img src={src} width="211" height="50"
               onClick={handler}
               style={{opacity: opacity}}
          />
        );
    }
}






