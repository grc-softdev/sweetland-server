"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: [
        "https://sweetland.vercel.app",
        "https://sweetland-grcn-projects.vercel.app",
        "http://localhost:3000",
        "http://localhost:8081",
    ],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.options('*', (0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 }
}));
app.use(routes_1.router);
//access image url ex: localhost:3333/files.image-name.png
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
// @ts-expect-error
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});
app.listen(process.env.PORT, () => console.log('online!'));
//app.listen(3333, '0.0.0.0', () => {
//console.log('Server is running on http://0.0.0.0:3333');
//});
