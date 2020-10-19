export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }
export function getTime(area){
  let n;
  switch (area) {
    case 'en':
      n= -5;
      break;
    case 'ar':
      n= 3;
      break;
    case 'tr':
      n= 2;
      break;
    case 'es':
      n= 1;
      break;
    case 'in':
      n= 7;
      break;
    case 'hi':
      n= 5;
      break;
    case 'de':
      n= 1;
      break;
    case 'fr':
      n= 1;
      break;
    case 'ja':
      n= 9;
      break;
    case 'zh':
      n= 8;
      break;
    case 'ko':
      n= 9;
      break;
    default:
      n= -5
      break;
  }
  return n;
}


 // utc转本地时间
export function convertUTCDateToLocalDate(date) {
      // 处理成为时间戳
      timestamp = new Date(Date.parse(date));
      timestamp = timestamp.getTime();
      timestamp = timestamp/1000;

      // 增加8个小时，北京时间比utc时间多八个时区
      let timestamp = timestamp + getTime(window.lang) * 60 * 60;
      // 时间戳转为时间
      let t = new Date(parseInt(timestamp) * 1000);
      let t_year = t.getFullYear()
      let t_month = (t.getMonth()+1 > 9)?t.getMonth():('0' + t.getMonth())
      let t_date = (t.getDate() > 9)?t.getDate():('0' + t.getDate())
      let t_hour = (t.getHours() > 9)?t.getHours():('0' + t.getHours())
      let t_minute = (t.getMinutes() > 9)?t.getMinutes():('0' + t.getMinutes())
      let t_second = (t.getSeconds() > 9)?t.getSeconds():('0' + t.getSeconds())
      return t_year + '/' + (t_month+1) + '/' + t_date + ' ' + t_hour + ':' + t_minute + ':' + t_second
  }