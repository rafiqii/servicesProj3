"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAvalibileTeams = exports.checkAvalibility = void 0;
var order_1 = require("../models/order");
var team_1 = require("../models/team");
var dates_1 = require("./dates");
function checkAvalibility(dates, checkingDuration, myStartTime, technicianTeam) {
    return __awaiter(this, void 0, void 0, function () {
        var ordersOfSameTeamAndDate, checkingStartTime, checkingEndTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_1.Order.find({ date: dates, team: technicianTeam })];
                case 1:
                    ordersOfSameTeamAndDate = _a.sent();
                    checkingStartTime = dates_1.givenTimeInMinutes(myStartTime);
                    checkingEndTime = checkingStartTime + checkingDuration;
                    checkingStartTime -= 15;
                    ordersOfSameTeamAndDate.forEach(function (element) {
                        var scheduledStartTime = dates_1.givenTimeInMinutes(element.time);
                        var scheduledEndTime = scheduledStartTime + element.visitLength;
                        scheduledStartTime -= 15;
                        if (checkingStartTime > scheduledStartTime && checkingStartTime < scheduledEndTime) // this solves case 2
                            return false;
                        if (checkingEndTime > scheduledStartTime && checkingEndTime < scheduledEndTime) // this solves case 1
                            return false;
                        if (checkingStartTime < scheduledStartTime && checkingEndTime > scheduledEndTime) //this solves case 3
                            return false;
                    });
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.checkAvalibility = checkAvalibility;
function checkAvalibileTeams(dates, checkingDuration, myStartTime) {
    return __awaiter(this, void 0, void 0, function () {
        var ordersOfSameTeamAndDate, teams, checkingStartTime, checkingEndTime, filtredArray;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_1.Order.find({ date: dates })];
                case 1:
                    ordersOfSameTeamAndDate = _a.sent();
                    return [4 /*yield*/, team_1.Team.find()];
                case 2:
                    teams = _a.sent();
                    checkingStartTime = dates_1.givenTimeInMinutes(myStartTime);
                    checkingEndTime = checkingStartTime + checkingDuration;
                    checkingStartTime -= 15;
                    filtredArray = ordersOfSameTeamAndDate.filter(function (element) {
                        var scheduledStartTime = dates_1.givenTimeInMinutes(element.time);
                        var scheduledEndTime = scheduledStartTime + element.visitLength;
                        scheduledStartTime -= 15;
                        return ((checkingStartTime > scheduledStartTime && checkingStartTime < scheduledEndTime) ||
                            (checkingEndTime > scheduledStartTime && checkingEndTime < scheduledEndTime) ||
                            (checkingStartTime < scheduledStartTime && checkingEndTime > scheduledEndTime));
                    }).map(function (ele) { return ele._id; })
                        .forEach(function (element) {
                        teams = teams.filter(function (object) { object.id == element; });
                    });
                    return [2 /*return*/, teams];
            }
        });
    });
}
exports.checkAvalibileTeams = checkAvalibileTeams;
