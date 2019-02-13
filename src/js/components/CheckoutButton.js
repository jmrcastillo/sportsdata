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

        const src = this.props.type === 'CC' ? 'Checkout Ccard' : 'Checkout Tokens';
        const opacity = this.props.enabled ? 1 : .1;
        const handler = this.props.enabled ?
        (event)=>{
            this.props.pubsub.publish('mode-checkout', this.props.type);
        } : ()=>{};

        let width = 211;
        let height = 50;
        if (this.props.minified) {
            width = 105;
            height = 25;
        }

        return (
            <React.Fragment>
                <button type="button" className="btn pl-cartbtn col mx-1" onClick={handler}>{src}</button>
                {/* <img src={src} width={width} height={height}
                
                style={{opacity: opacity}}
                /> */}

                {this.props.enabled && this.props.minified && this.props.type === 'CC' &&
                    <img src={"images/creditcard-logos.jpg"} height={height} style={{display: 'inline-block'}}  />

                }
                {this.props.enabled && this.props.minified && this.props.type === 'TOKENS' &&
                    <img src={"images/token_green.png"} height={height}   style={{display: 'inline-block'}}  />
                }
            </React.Fragment>
        );
    }
}






