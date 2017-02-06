/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PasswordField from "react-ux-password-field";
import $ from "jquery";

// TODO:  What validation to be done with member_id (should be email)?  Password?  Anything else?
export default class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			postal: '',
			country: '',
			day_phone: '',
			eve_phone: '',
			member_id: '',
			password: '',
		}
	}

	tryRegister (successCallback, failCallback) {
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

//		console.log ("AUTH: ", window.cubedata.IS_AUTHENTICATED, " DEST ROUTE: ", window.cubedata.DESTINATION_ROUTE );
		return (
			<form name="register"
				onSubmit={(event) => {
			      //  alert('Going to try values: ' + this.state.member_id + ' Pass: ' + this.state.passwd);
					event.preventDefault();
					this.tryRegister((data, self) => {
						window.cubedata.IS_AUTHENTICATED = true;
						window.cubedata.LOGGED_IN_MEMBER = this.state.member_id;
						console.log ("User is now registered and logged in, data returned:", data);
						console.log ("AUTH: ", window.cubedata.IS_AUTHENTICATED, " DEST ROUTE: ", window.cubedata.DESTINATION_ROUTE );
						// push to window.cubedata.DESTINATION_ROUTE  ?
					//	self.props.router.push('/')
					},
					(self) => {
						// Fail callback - do what if registration fails?  registration_failed: true?
						//self.setState ({login_failed: true});
					}

					)
				}}
			>

			<ul>

				<li>
					<label for="first_name">First Name </label>
					<input name="first_name" id="first_name" onChange={(event) =>
					{ this.setState({first_name: event.target.value}); }
					} />
				</li>

				<li>
					<label for="last_name">Last Name </label>
					<input name="last_name" id="last_name" onChange={(event) =>
					{ this.setState({last_name: event.target.value}); }
					} />
				</li>
				<li>
					<label for="address1">Address1</label>
					<input name="address1" id="address1" onChange={(event) =>
					{ this.setState({address1: event.target.value}); }
					} />
				</li>
				<li>
					<label for="address2">Address2 </label>
					<input name="address2" id="address2" onChange={(event) =>
					{ this.setState({address2: event.target.value}); }
					} />
				</li>
				<li>
					<label for="city">City </label>
					<input name="city" id="city" onChange={(event) =>
					{ this.setState({city: event.target.value}); }
					} />
				</li>
				<li>
					<label for="state">State </label>
					<input name="state" id="state" onChange={(event) =>
					{ this.setState({state: event.target.value}); }
					} />
				</li>
				<li>
					<label for="postal">Zip / Postal </label>
					<input name="postal" id="postal" onChange={(event) =>
					{ this.setState({postal: event.target.value}); }
					} />
				</li>
				<li>
					<label for="country">Country </label>
					<input name="country" id="country" onChange={(event) =>
					{ this.setState({country: event.target.value}); }
					} />
				</li>
				<li>
					<label for="day_phone">Day Phone </label>
					<input name="day_phone" id="day_phone" onChange={(event) =>
					{ this.setState({day_phone: event.target.value}); }
					} />
				</li>
				<li>
					<label for="eve_phone">Evening Phone </label>
					<input name="eve_phone" id="eve_phone" onChange={(event) =>
					{ this.setState({eve_phone: event.target.value}); }
					} />
				</li>

			<li>
			<label for="member_id">Member ID </label>
			<input name="member_id" id="member_id" placeholder="your-member-id" onChange={(event) =>
				{ this.setState({member_id: event.target.value}); }
			} />
			</li>
			<li><label for="password">Password </label>
					<PasswordField 
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