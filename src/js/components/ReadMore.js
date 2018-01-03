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


        if (! this.state.expanded) {
            text = Striptags(text.substring(0, 25));

        }


        return (
        <div>

            <span
                dangerouslySetInnerHTML={
                {__html: text}
                }

            />

            {this.state.expanded ? '' : <a onClick={event=>{
                this.setState({expanded: true});
            }}>Read more..</a>}

        </div>



        );
    }
}






