/**
 * Created by me on 1/15/17.
 */

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