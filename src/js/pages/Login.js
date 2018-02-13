/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PasswordField from "react-ux-password-field";
import $ from "jquery";


export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			member_id: '',
			password: '',
			login_failed: false
		}
	}

	tryLogin (successCallback, failCallback) {
		let url =  `https://www.playbook.com/cube-api4/login/key/0`;
			console.log ("Faking load url", url);

		$.ajax({
			url: url,
			data: {member_id: this.state.member_id, password: this.state.password},
			dataType: "text",

			type: 'POST',
			cache: false,
			success:(data) => {
				successCallback (data, this)
			},
			error: (xhr, status, err) => {
				console.error(url, status, err.toString());
				failCallback(this);
			}
		});


	}


	render() {

	//	console.log ("AUTH: ", window.cubedata.IS_AUTHENTICATED, " DEST ROUTE: ", window.cubedata.DESTINATION_ROUTE );
		return (
			<form name="login"
				onSubmit={(event) => {
			      //  alert('Going to try values: ' + this.state.member_id + ' Pass: ' + this.state.passwd);
					event.preventDefault();
					this.tryLogin((data, self) => {
						window.cubedata.IS_AUTHENTICATED = true;
						window.cubedata.LOGGED_IN_MEMBER = this.state.member_id;
						console.log ("User is now logged in, data returned:", data);
						console.log ("AUTH: ", window.cubedata.IS_AUTHENTICATED, " DEST ROUTE: ", window.cubedata.DESTINATION_ROUTE );
						// TODO:  push to window.cubedata.DESTINATION_ROUTE
						self.props.router.push('/')
					},
					(self) => {
						self.setState ({login_failed: true});
					}

					)
				}}
			>

			<ul>
			<li>
			<label for="member_id">Member ID </label>
			<input name="member_id" id="member_id" placeholder="your-member-id" onChange={(event) =>
				{ this.setState({member_id: event.target.value}); }
			} />
			</li>
			<li><label for="password">Password </label>
					<PasswordField infoBar={false}
						onChange={(value) =>
						{ this.setState({password: value}); }
						}
					/></li>
			<li>
					<input type="submit" value="Login" />
				</li>*
				<li>
					{this.state.login_failed ? "Member ID or Password  incorrect" : ''}
				</li>
			</ul>

		</form>

		);
	}
}

/*


import React from "react";


export default class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			name: '',
			address: '',
		};
	}


	render() {

		return (
			<form onSubmit={(event) => {
				alert('Value submitted: ' + this.state.address + ' Name: ' + this.state.name);
				event.preventDefault();
			}}>
				<label>
					Name:
					<input type="text" id="name" value={this.state.name} onChange={(event) =>
					{ this.setState({name: event.target.value}); }
					} />
				</label>

				<label>
					Address:
					<input type="text" id="address" value={this.state.address} onChange={(event) =>
					{ this.setState({address: event.target.value}); }
					} />

				</label>


				<input type="submit" value="Submit" />
			</form>
		);
	}
}



 */

/*
 {"member_id":"five0","password":"johnny777"}
 */