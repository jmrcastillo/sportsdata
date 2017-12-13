/**
 * Created by me on 2/4/17.
 */

// TODO:  Is this really needed?

import $ from "jquery";
import CryptoJS from "crypto-js";
import URLSafeBase64 from "urlsafe-base64";
//var URLSafeBase64 = require('urlsafe-base64');

// Following patterns from
//https://davidwalsh.name/write-javascript-promises


class PicksAPI  {


	loadServerTime() {
		return $.getJSON('https://www.playbook.com/picks-api1/get-server-time').then(function(time) {
			return time;
		});
	}

	loadPicks() {
		return this.loadServerTime().then((time) => {
			var data = {time: time + 10};
			//console.log("data", JSON.stringify(data));
			var text = CryptoJS.AES.encrypt(JSON.stringify(data), 'devotedtoartofsportshandicapping').toString();
//			console.log ("ID was " + text)

			text = URLSafeBase64.encode(text);

//console.log ("ID is " + text)

			return $.getJSON(`https://www.playbook.com/picks-api1/getpicks/${text}`).then(function(picks) {
				return picks;
			}).fail(()=>console.log('GETPICKS FAIL.'))
		})

	}




}
export default (new PicksAPI);