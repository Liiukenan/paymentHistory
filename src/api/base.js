import md5 from "js-md5";
import {getQueryVariable} from "./util"
let u = navigator.userAgent;
const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
export default {
  filterDays(days) {
    let month = "";
    let n = days % 30;
    if (n == 0) {
      month = days / 30;
      return [month,1];
    }
    return [days,0];
  },
  getData(date) {
    let token = "";
    let data = {
      date:date,
      jid:getQueryVariable("jid"),
    };
    if (!isIOS) {
      try {
        token = jsInteractive.getToken();
        data.hx5=md5(token + getQueryVariable("jid") + date);
        return JSON.stringify(data);
      } catch (e) {
        e;
        token = "QOVAZPv9CHcxyh02XjSaY8d53tgeD6";
        data.hx5=md5(token + getQueryVariable("jid") + date);
        // data.hx5="cc241f4074193cd55c19fcfc083d9980";
        return JSON.stringify(data);
       
      }
    }

  },
  getToken() {
    let token = "";
    if (!isIOS) {
      try {
        token = jsInteractive.getToken();
        return token;
      } catch (e) {
        e;
      }
    }
  },
  close() {
    if (!isIOS) {
      try {
        jsInteractive.closePager();
      } catch (e) {
        e;
      }
    }
  },
  getHelp() {
    if (!isIOS) {
      try {
        jsInteractive.jumpToAIHelp();
      } catch (e) {
        e;
      }
    }
  }
};
