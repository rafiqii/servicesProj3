"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var teamSchema = new mongoose_1.default.Schema({
    technician1: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    technician2: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    ordersWorkedOn: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Order" }],
});
exports.Team = mongoose_1.default.model("Team", teamSchema);
