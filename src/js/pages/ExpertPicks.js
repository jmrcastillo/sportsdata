/**
 * Created by me on 1/31/17.
 */
/**
 * Created by me on 1/15/17.
 */
import React from "react";
import $ from "jquery";

import Base64 from "base-64";

export default class ExpertPicks extends React.Component {

	constructor() {
		super();
		this.state = {
			handicappers: [],
		};
	}

	componentDidMount() {
		this.loadCubeHandicappers();
	//	this.loadDonationsFromServer();
	//	setInterval(this.loadDonationsFromServer, this.props.pollInterval);
	}

	loadCubeHandicappers() {
		let url =  "https://www.playbook.com/cube-api3/experts";
		//console.log ("Trying to load url", url);

		$.ajax({
			//url: this.props.url,
			url: url,
			dataType: 'json',
			type: 'GET',
			cache: false,
			success: (handicappers) => {

				this.setState({handicappers: Object.values(handicappers)});
			//	console.log ("Got handicappers ", handicappers);
			},
			error: (xhr, status, err) => {
			//	console.log ("Got ERROR", err.toString());
				console.error(url, status, err.toString());
			}
		});
	}

	handleClick(e) {
		console.log ("CLICKED");
		debugger;
		this.context.router.transitionTo('/');
	}

	render() {
		var letterStyle = {
			padding: 10,
			margin: 0,
			backgroundColor: "#000000",
			color: "#ffffff",
			fontFamily: "monospace",
			fontSize: "32",
			textAlign: "center"
		};
		return (

			<div>
				<div style={letterStyle}>
					EXPERT PICKS
				</div>
				<table width="100%" border="0" cellSpacing="0" cellPadding="0">
				<tbody>
				{this.state.handicappers.map((handicapper, i) => {
					const parameter = `${handicapper.ecapper_id}|${handicapper.photo_uri}|${handicapper.handicapper_name}`;
					const url = "/#/ecapper-picks/" + Base64.encode(parameter);
					return <tr key={i}>
					<td key="0" width="70" align="left"><a href={url}> <img src={handicapper.photo_uri} /></a></td>
						<td key="1">&nbsp;<a href={url}>{handicapper.handicapper_name}</a></td>
						<td key="2" width="14" align="right"><a href={url}><img src="images/arrow.png" width="11" height="20" border="0" /></a></td>
					</tr>
				})}
				</tbody>
				</table>
			</div>
		);
	}
}


/*
 var ReactTable = React.createClass({
 handleClick: function(e) {
 this.router.transitionTo('index');
 },
 render: function() {
 return(
 <div>
 <table>
 <thead>
 <tr>
 <th>Name</th>
 <th>Age</th>
 <th>Full Detail</th>
 </tr>
 </thead>
 <tbody>
 <tr onClick={this.handleClick.bind(this)}>
 <td>{user.name}</td>
 <td>{user.age}</td>
 <td>{details}</td>
 </tr>
 </tbody>
 </table>
 </div>
 );
 }



 */



















/*


 var DonationBox = React.createClass({
 getInitialState: function() {
 //this will hold all the data being read and posted to the file
 return {data: []};
 },
 loadDonationsFromServer: function() {
 $.ajax({
 url: this.props.url,
 dataType: 'json',
 cache: false,
 success: function(data) {
 this.setState({data: data});
 }.bind(this),
 error: function(xhr, status, err) {
 console.error(this.props.url, status, err.toString());
 }.bind(this)
 });
 },
 componentDidMount: function() {
 this.loadDonationsFromServer();
 setInterval(this.loadDonationsFromServer, this.props.pollInterval);
 },
 handleDonationSubmit: function(donation) {
 //this is just an example of how you would submit a form
 //you would have to implement something separately on the server
 $.ajax({
 url: this.props.url,
 dataType: 'json',
 type: 'POST',
 data: donation,
 success: function(data) {
 this.setState({data: data});
 }.bind(this),
 error: function(xhr, status, err) {
 console.error(this.props.url, status, err.toString());
 }.bind(this)
 });
 },
 render: function() {
 return (
 <div className="donationBox">
 <h1>Donations</h1>
 <DonationList data={this.state.data} />
 <DonationForm onDonationSubmit={this.handleDonationSubmit} />
 </div>
 );
 }
 });


 */

/*

 return `<tr>
 <td width="70" align="left">{handicapper.photo_uri</td>
 <td>&nbsp;{handicapper.handicapper_name}</td>
 <td width="14" align="right"><img src="../arrow.png" width="11" height="20" border="0">
 </tr>
 `;

 */