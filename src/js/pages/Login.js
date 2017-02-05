/**
 * Created by me on 1/31/17.
 */

import React from "react";
import PasswordField from "react-ux-password-field";

export default class Login extends React.Component {
	render() {
//		console.log("settings");
		return (

					<form name="login" action="index_submit" method="get" acceptCharset="utf-8">

					<ul>
						<li><label for="member_id">Member ID</label>
							<input name="member_id" placeholder="your-member-id" required /></li>
						<li><label for="password">Password</label>
							<PasswordField /></li>
					<li>
							<input type="submit" value="Login" />
						</li>*
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