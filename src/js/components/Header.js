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
            schema: [],
            functions: [
                ()=>{this.props.router.push('/')},
                ()=>{this.props.router.push('privacy-policy')},
                ()=>{this.props.router.push('purchases')},
                ()=>{this.props.router.push('expert-picks')},
                ()=>{this.props.router.push('publications')},
                ()=>{this.props.router.push('scores-lines')},
                ()=>{this.props.router.push('videos-podcasts')},
                ()=>{this.props.router.push('betting-tools')},
                ()=>{this.props.router.push('steam-alerts')},
            ]
		};
	}

	componentWillMount() {

		this.setState({
			schema:
				[
                    {
                        name: "Playbook Cube",
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
                                name: "Privacy Policy",
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
                                name: "Expert Picks",
                                id: 3,
                                isOpen: false,
                                children: [],

                            },
                            {
                                name: "Newsletters & Publications",
                                id: 4,
                                isOpen: false,
                                children: [],

                            },
                            {
                                name: "Scores & Lines",
                                id: 5,
                                isOpen: false,
                                children: [],

                            },
                            {
                                name: "Videos & Podcasts",
                                id: 6,
                                isOpen: false,
                                children: [],

                            },
                            {
                                name: "Betting Tools",
                                id: 7,
                                isOpen: false,
                                children: [],

                            },
                            {
                                name: "Steam Alerts",
                                id: 8,
                                isOpen: false,
                                children: [],

                            },


                        ],
                    },

				]

		});


	}

/*
    componentWillMount() {

        this.setState({
            schema:
                [
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
                ]

        });


    }
*/



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
 //                   console.log("node.id is ", node.id);
                    this.state.functions[node.id]();




				}}
			//	maxLeaves={2}
			/>


		);
	}
}
