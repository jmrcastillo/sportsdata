/**
 * Created by me on 1/31/17.
 */

import React from "react";
import ReadMore from '../components/ReadMore';

export default class Freeplay extends React.Component {

    constructor(props) {
        super(props);

    }
    componentWillMount() {

    }
    componentDidMount() {

    }


    render() {

        const freePickTitle = this.props.freePick ? this.props.freePick.title : 'Free pick is not available yet.';
        const freePickBody = this.props.freePick ? this.props.freePick.body : '';

        return (
        <div>
            {/*<!--Start loggedin box-->*/}
            <div className="alert alert-secondary" role="alert">
            <span className="trebuchet14B" style={{textAlign: 'left'}}>{freePickTitle}</span>
            <ReadMore text={freePickBody} />
            </div>
            {/*<!--end loggedin box-->*/}
        </div>
        );
    }
}






