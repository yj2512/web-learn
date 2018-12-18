export default {
  /**
   * 
   * 将时间戳转换成日期格式：
   * @param {String} timestamp 时间戳字符串,
   * 时间戳为10位需*1000，时间戳为13位的话不需乘1000
   * @returns {String}
   */
  timestampToTime(timestamp) {
    let date = new Date(parseInt(timestamp));
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    // let m = date.getMinutes() + ':';
    let m = date.getMinutes();
    if (m < 10) {
      m = '0' + m + ':';
    }else{
      m = m + ':';
    }
    let s = date.getSeconds();
    if (s < 10) {
      s = '0'+s;
    }
    return Y + M + D + h + m + s;
  },
  /**
   * 
   * 将日期格式转换成时间戳：：
   * @param {String} timeString 时间字符串'2014-04-23 18:55:49'
   * @returns {String}
   */
  timeTotimestamp(timeString){
    let _date = new Date(timeString);
    return _date.getTime();
  },
  /**
   * 
   * 获取当前时间，格式YYYY-MM-DD
   */
  getCurrentDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  /**
   * 
   * 获取当前时间，格式HH:MM:SS
   */
  getCurrentTime() {
    let now = new Date();
    let hour = now.getHours();//得到小时
    let minu = now.getMinutes();//得到分钟
    let sec = now.getSeconds();//得到秒
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    let time = hour + ":" + minu + ":" + sec;
    return time;
  },
  /**
   * 
   * 获取N天前/后时间，格式HH:MM:SS
   * * @param {Number} n N天前/后 例如 1 -2
   */
  getOtherTime(n){
    let nowTime = (new Date()).getTime();
    let otherTime = nowTime + n * 24 * 3600 * 1000;
    otherTime = this.timestampToTime(otherTime);
    return otherTime;
  }
};
