"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var mongoose_1 = __importDefault(require("mongoose"));
var login_1 = __importDefault(require("./login/login"));
var order_1 = __importDefault(require("./routes/order"));
var team_1 = __importDefault(require("./routes/team"));
var user_1 = __importDefault(require("./routes/user"));
var app = express_1.default();
//extra settings
app.use(express_1.default.urlencoded({ extended: true }));
//connecting to the database  
var env = dotenv_1.default.config({ path: path_1.default.normalize(path_1.default.resolve(__dirname, "../environment/.env")) });
if (!process.env.dbconnection) {
    console.log("there is no database: " + process.env.dbconnection);
    process.exit(0);
}
else {
    console.log("connected to db");
}
mongoose_1.default.connect(process.env.dbconnection, { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(3000);
app.use("/login", login_1.default);
app.use("/order", order_1.default);
app.use("/team", team_1.default);
app.use("/user", user_1.default);
