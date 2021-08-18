"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.givenTimeInMinutes = exports.getMinutes = exports.getHours = exports.getDate = exports.addDays = void 0;
function addDays(days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}
exports.addDays = addDays;
function getDate(date) {
    var stringfiedDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay;
    return stringfiedDate;
}
exports.getDate = getDate;
function getHours(time) {
    return parseInt(time.substring(0, time.indexOf(":")));
}
exports.getHours = getHours;
function getMinutes(time) {
    return parseInt(time.substring(time.indexOf(":") + 1, time.length));
}
exports.getMinutes = getMinutes;
function givenTimeInMinutes(time) {
    var hours = getHours(time);
    var minutes = getMinutes(time);
    return minutes + 60 * hours;
}
exports.givenTimeInMinutes = givenTimeInMinutes;
