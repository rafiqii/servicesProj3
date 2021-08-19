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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var express_1 = __importDefault(require("express"));
var role_1 = require("../enum/role");
var user_1 = require("../models/user");
var router = express_1.default.Router();
router.post("/createCustomerAccount", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var duplicateUserName, user, _a, _b, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, user_1.User.findOne({ userName: req.body.userName })];
            case 1:
                duplicateUserName = _g.sent();
                console.log(duplicateUserName);
                if (duplicateUserName) {
                    res.status(400).send("userName is already taken");
                    throw new Error("User is already taken");
                }
                _b = (_a = user_1.User).create;
                _f = { userName: req.body.userName };
                _d = (_c = bcrypt_1.default).hash;
                _e = [req.body.passWord];
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2: return [4 /*yield*/, _d.apply(_c, _e.concat([_g.sent()]))];
            case 3: return [4 /*yield*/, _b.apply(_a, [(_f.passWord = _g.sent(), _f.role = role_1.roles.customer, _f)])];
            case 4:
                user = _g.sent();
                return [4 /*yield*/, user.save()];
            case 5:
                _g.sent();
                res.send("user saved");
                return [2 /*return*/, ({ _id: user._id, userName: user.userName })];
        }
    });
}); });
router.post("/createTechnicianAccount", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var duplicateUserName, user, _a, _b, _c, _d, _e;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, user_1.User.findOne({ userName: req.body.userName })];
            case 1:
                duplicateUserName = _g.sent();
                if (duplicateUserName) {
                    res.status(400).send("userName is already taken");
                    throw new Error("User is already taken");
                }
                _b = (_a = user_1.User).create;
                _f = { userName: req.body.userName };
                _d = (_c = bcrypt_1.default).hash;
                _e = [req.body.passWord];
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2: return [4 /*yield*/, _d.apply(_c, _e.concat([_g.sent()]))];
            case 3: return [4 /*yield*/, _b.apply(_a, [(_f.passWord = _g.sent(), _f.role = role_1.roles.technician, _f)])];
            case 4:
                user = _g.sent();
                return [4 /*yield*/, user.save()];
            case 5:
                _g.sent();
                res.send("user saved");
                return [2 /*return*/, ({ _id: user._id, userName: user.userName })];
        }
    });
}); });
exports.default = router;
