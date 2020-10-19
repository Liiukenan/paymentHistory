function UTCDateToLocalDate(dateStr) {
    var date1 = new Date();
    var offsetMinute = date1.getTimezoneOffset();
    var offsetHours = offsetMinute / 60;
    var date2 = new Date(dateStr);
    date2.setHours(date2.getHours() - offsetHours);
    return date2;
}
