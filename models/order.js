"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var orderSchema = new mongoose_1.default.Schema({
    time: String,
    date: String,
    team: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Team" },
    orderdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    visitLength: Number,
    status: String
});
exports.Order = mongoose_1.default.model("Order", orderSchema);
