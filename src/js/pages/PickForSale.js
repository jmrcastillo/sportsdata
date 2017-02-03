/**
 * Created by me on 1/31/17.
 */

import React from "react";
import $ from "jquery";
//import Iconv from "iconv-lite";

import Money from "money-formatter";

export default class PickForSale extends React.Component {

	constructor() {
		super();
		this.state = {
			pick: {},
		};
	}

	componentDidMount() {
		this.loadPick();

	}

	loadPick() {

		const url =  `https://www.playbook.com/cube-api4/experts/cube/picks/${this.props.params.pick_id}`;
	//	console.log ("Trying to load url", url);

		$.ajax({
			url: url,
			dataType: 'json',
			type: 'GET',
			cache: false,
			success: (pick) => {
				this.setState({pick: pick});
//				console.log ("Got pick ", pick);
			},
			error: (xhr, status, err) => {
				console.error(url, status, err.toString());
			}
		});

	}

/*
	Encrypt:
	Pass-in list:
	ecapper_id eg larry (change back on CubeAPI server side)
	photo_uri
	handicapper_name


	TODO:  Do Sport
	TODO:  Currency format price

 protected $key = "devotedtoartofsportshandicapping"
 $key = $this->key . $pick_id;
 $pick_body  = Yii::$app->ecutils->aesEncrypt($pick_body, $key);


 public function aesEncrypt($source_data, $key = "changeme") {

 $ciphertext = openssl_encrypt($source_data,
 'aes-256-cbc' ,
 hex2bin(hash("sha256", $key, false)),
 OPENSSL_RAW_DATA,
 hex2bin("00000000000000000000000000000000"));

 return base64_encode($ciphertext);


 */
	render() {

	//	debugger;

		const {pick} = this.state;
		if (Object.keys(pick).length === 0) {
			return <div />;
		}

		return (
			<div>
				PICK ID {pick.pick_id}
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td colspan="2">CAPPER_IMAGE&nbsp;&nbsp;CAPPER_NAME</td>
				</tr>
				<tr>
					<td colspan="2">SPORT</td>
				</tr>
				<tr>
					<td colspan="2">{this.state.pick.title}</td>
				</tr>
				<tr>
					<td colspan="2"><a href="#">Read More.. {this.state.pick.teaser} </a></td>
				</tr>
				<tr>
					<td width="100" align="left">{Money.format ('USD', pick.price)}</td>
					<td align="right"><img src="images/buy_now.png" width="70" height="20" border="0" /></td>
				</tr>
				<tr>
					<td colspan="2"><hr />
					</td>
				</tr>
			</table>
			</div>
		);
	}
}

/*
	TODO:  Stuff for pick body encryption if needed:
 import Base64 from "base-64";

 BOTH THESE UNINSTALLED:
 import Aes from "aes-js";
 import Sha256 from "js-sha256"


TEST CODE:

 let key = "devotedtoartofsportshandicapping" + pick.pick_id;
 let hash = Sha256(key);
 // TEST
 let encrypted = Base64.decode(pick.body);

 let key2 = Aes.util.convertStringToBytes(hash);
 let iv = Aes.util.convertStringToBytes("0000000000000000");
 var aesCbc = new Aes.ModeOfOperation.cbc(key2, iv);

 var decryptedBytes = aesCbc.decrypt(encrypted);
 var decryptedText = Aes.util.convertBytesToString(decryptedBytes);


 console.log (decrypted.substring(0, 45));




 */