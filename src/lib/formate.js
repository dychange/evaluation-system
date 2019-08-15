function formatDate(time) {
    var date = new Date(time);
    var year = date.getFullYear(),
      month = date.getMonth() + 1, //月份是从0开始的
      day = date.getDate(),
      hour = check(date.getHours()),
      min = check(date.getMinutes()),
      sec = check(date.getSeconds());
    var newTime = year + '-' +
      month + '-' +
      day + ' ' +
      hour + ':' +
      min + ':' +
      sec;
    return newTime;
  }
  
  function check(str) {
    str = str.toString();
    if (str.length < 2) {
      str = '0' + str;
    }
    return str;
  }
  
  function formatTime(time) {
    var date = new Date(time);
    let hour = check(date.getHours())
    let min = check(date.getMinutes())
    let sec = check(date.getSeconds())
    let newTime = hour + ':' +
                  min + ':' +
                  sec;
    return newTime
  }


  export {
    formatDate,
    formatTime
  }