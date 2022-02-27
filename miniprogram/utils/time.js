function p(s) {
  return s<10?'0'+s:s;
}
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return year + "-" + p(month) + "-" + p(day) + " " + p(hour) + ":" + p(minute) + ":" + p(second);
  }
  
  module.exports = {
    formatTime: formatTime
  }