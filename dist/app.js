"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./routes"));
const PORT = 3000;
(0, routes_1.default)(app);
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log("Server listening on port 3000");
});
