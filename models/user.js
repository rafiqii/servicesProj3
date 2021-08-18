"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var path_1 = __importDefault(require("path"));
var env = dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../env/.env") });
var userSchema = new mongoose_1.default.Schema({
    userName: String,
    passWord: String,
    location: String,
    role: Number,
    order: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Order" }
});
userSchema.methods.generateToken = function () {
    var token = jsonwebtoken_1.default.sign({ _id: this._id, role: this.role }, process.env.signature);
    return token;
};
exports.User = mongoose_1.default.model('User', userSchema);
