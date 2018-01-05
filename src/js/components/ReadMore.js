/**
 * Created by me on 1/31/17.
 */

import React from "react";

import Striptags from "striptags";



export default class ReadMore extends React.Component {

    constructor() {
        super();
        this.state = {
            expanded: false,
        }
    }
    componentWillMount() {

    }
    componentDidMount() {

    }


    render() {


        let text = this.props.text;
        let read = 'Read less';

        if (! this.state.expanded) {
            text = Striptags(text.substring(0, 150));
            text = text.substr(0, text.lastIndexOf(' '));
            text += '..  ';
            read = 'Read more';
        }


        return (
        <div>

            <span
                dangerouslySetInnerHTML={
                {__html: text}
                }

            />

{/*            {this.state.expanded ? '' : <a onClick={event=>{
                this.setState({expanded: ! this.state.expanded});
            }}>{read}</a>}*/}
            <a className="topnav_trebuchet14Bred" onClick={event=>{
                this.setState({expanded: ! this.state.expanded});
            }}>&nbsp;{text.length > 0 ? read : ''}</a>

        </div>



        );
    }
}






