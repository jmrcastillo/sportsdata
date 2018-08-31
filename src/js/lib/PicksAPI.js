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

	loadPicks(ecapper_id) {
		return this.loadServerTime().then((time) => {
			var data = {time: time + 10};
			//console.log("data", JSON.stringify(data));
			var text = CryptoJS.AES.encrypt(JSON.stringify(data), 'devotedtoartofsportshandicapping').toString();
//			console.log ("ID was " + text)

			text = URLSafeBase64.encode(text);

//console.log ("ID is " + text)
            let url = `https://www.playbook.com/picks-api1/getpicks/${text}`;

            if (ecapper_id && ecapper_id.length > 0) {
                url = `https://www.playbook.com/picks-api1/get-ecapper-picks/${ecapper_id}/${text}`;
            }

			return $.getJSON(url).then(function(picks) {
                return picks;
			}).fail(()=>console.log('GETPICKS FAIL.'))
		})
	}
/*

			let url = `https://www.playbook.com/picks-api1/getpicks/${text}`;
console.log ("url is " + url);

 */

	login(member_id, password, notificationManager) {

    const failAlert = function(code) {
        notificationManager.error('*** Login Failed ***', 'More Help', 120000, ()=>{
            alert('Login with your email address and password, or Register a new account. Support line 1-800-643-4700.');
        });
    };

    // For if special chars in password
    const urlPassword = encodeURIComponent(password);
    return $.getJSON(`https://www.playbook.com/picks-api1/login/${member_id}/${urlPassword}`).then(function(result) {
		    if (! result.success) {
		        failAlert('');
            }
			return result;
		}).fail(()=> {
            failAlert('');
        });
	}


	loginMember(record_id) {
		return this.loadServerTime().then((time) => {
			var data = {time: time + 10};
			var text = CryptoJS.AES.encrypt(JSON.stringify(data), 'devotedtoartofsportshandicapping').toString();
			text = URLSafeBase64.encode(text);
			return $.getJSON(`https://www.playbook.com/picks-api1/login-member/${record_id}/${text}`).then(function(result) {
				return result;
			});

		})
	}

    loadPicksList(list) {
        return this.loadServerTime().then((time) => {
            var data = {time: time + 10};
            var text = CryptoJS.AES.encrypt(JSON.stringify(data), 'devotedtoartofsportshandicapping').toString();

            text = URLSafeBase64.encode(text);

            const url = `https://www.playbook.com/picks-api1/getpicks-list/${list}/${text}`;

            return $.getJSON(url).then(function(picks) {
                return picks;
            }).fail(()=>console.log('GETPICKS FAIL.'));
        })
    }

    // TODO  Pass in the fail function to display an error msg??
	saveMember(member) {
        return $.post("https://www.playbook.com/picks-api1/save-member",
            member,
           ).then(function(res) {
            return res;
        }).fail(()=>console.log('SAVEMEMBER FAIL.'));
	}

/*  checkMember(member) {
    return $.post("https://www.playbook.com/picks-api1/check-member",
      member,
    ).then(function(res) {
      return res;
    }).fail(()=>console.log('CHECKMEMBER FAIL.'));
  }*/


    purchaseCCard(purchaseData) {
        return $.post("https://www.playbook.com/picks-api1/purchase-ccard",
            purchaseData,
        ).then(function(res) {
            return res;
        }).fail(()=>console.log('PURCHASECCARD FAIL.'));
    }

    tokensQuery(member, amount) {
        const url = `https://www.playbook.com/picks-api1/tokens-query/${member.member_id}/${amount}`;
        console.log("PicksAPI ", url);
        return $.getJSON(url).then(function(result) {
            return result;
        });
    }



}
export default (new PicksAPI);