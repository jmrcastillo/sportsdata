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

        const src = this.props.type === 'CC' ? 'images/checkoutCC.png' : 'images/checkoutT.png';
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

        if (! this.props.minified) {
            return (
                <img src={src} width={width} height={height}
                     onClick={handler}
                     style={{opacity: opacity}}
                />

            );
        }

        // Kludge TODO:  FIX THIS..
        return (
            <table>
            <tbody>
            <tr>
            <td>
            <img src={src} width={width} height={height}
               onClick={handler}
               style={{opacity: opacity}}
            />
            </td>
                <td>
            {this.props.minified && this.props.type === 'CC' &&
                <img src={"images/creditcard-logos.jpg"} height={height} />

            }
            {this.props.minified && this.props.type === 'TOKENS' &&
                 <img src={"images/token_green.png"} height={height} />
            }
            </td>
            </tr>

            </tbody>
            </table>
        );
    }
}






