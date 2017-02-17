/**
 * Created by me on 1/31/17.
 */
import React from "react";

import InfinityMenu from "react-infinity-menu";
/*
Infinity menu documentation
 https://github.com/socialtables/react-infinity-menu
 */


//import Title from "./Header/Title";

export default class Header extends React.Component {

	constructor() {
		super();

		this.state = {
			 schema: []
		};
	}

	componentWillMount() {

		this.setState({
			schema:
				[
                    {
                        name: "---",
                        id: 0,
                        isOpen: false,
                        children: [
                            {
                                name: "Home",
                                id: 0,
                                isOpen: false,
                                children: [],
                            },
                            {
                                name: "Expert Picks",
                                id: 1,
                                isOpen: false,
                                children: [],

                            },
                            {
                                name: "Purchases",
                                id: 2,
                                isOpen: false,
                                children: [],

                            },
                            {
                                name: "Privacy Policy",
                                id: 3,
                                isOpen: false,
                                children: [],

                            },
                        ],
                    },

				]

		});


	}

	render() {
		return (
			<InfinityMenu
				tree={this.state.schema}
                disableDefaultHeaderContent={true}
                //	onNodeMouseClick={this.onNodeMouseClick.bind(this)}
				onNodeMouseClick={(event, schema, node, level, keyPath) => {
					this.setState({
						schema: schema
					});
//					console.log("Mouse click: ", node, level, keyPath);
					switch (keyPath) {
						case "0":
							this.props.router.push('/');
						break;
						case "1":
							this.props.router.push('expert-picks');
						break;
						case "2":
							this.props.router.push('purchases');
							break;
						case "3":
							this.props.router.push('privacy-policy');
						break;
					}

				}}
			//	maxLeaves={2}
			/>


		);
	}
}
