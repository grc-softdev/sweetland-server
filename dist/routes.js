"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const ListByCategoryController_1 = require("./controllers/products/ListByCategoryController");
const CreateProductController_1 = require("./controllers/products/CreateProductController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrderController_1 = require("./controllers/order/ListOrderController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
// Helper para preservar o contexto `this`
const use = (controller) => controller.handle.bind(controller);
// Rotas User
router.post('/users', use(new CreateUserController_1.CreateUserController()));
router.post('/session', use(new AuthUserController_1.AuthUserController()));
// @ts-expect-error
router.get('/me', isAuthenticated_1.isAuthenticated, use(new DetailUserController_1.DetailUserController()));
// Rotas Category
// @ts-expect-error
router.post('/category', isAuthenticated_1.isAuthenticated, use(new CreateCategoryController_1.CreateCategoryController()));
// @ts-expect-error
router.get('/category', isAuthenticated_1.isAuthenticated, use(new ListCategoryController_1.ListCategoryController()));
// Rotas Product
// @ts-expect-error
router.post('/product', isAuthenticated_1.isAuthenticated, use(new CreateProductController_1.CreateProductController()));
// @ts-expect-error
router.get('/category/product', isAuthenticated_1.isAuthenticated, use(new ListByCategoryController_1.ListByCategoryController()));
// Rotas Order
// @ts-expect-error
router.post('/order', isAuthenticated_1.isAuthenticated, use(new CreateOrderController_1.CreateOrderController()));
// @ts-expect-error
router.delete('/order', isAuthenticated_1.isAuthenticated, use(new RemoveOrderController_1.RemoveOrderController()));
// @ts-expect-error
router.post('/order/add', isAuthenticated_1.isAuthenticated, use(new AddItemController_1.AddItemController()));
// @ts-expect-error
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, use(new RemoveItemController_1.RemoveItemController()));
// @ts-expect-error
router.put('/order/send', isAuthenticated_1.isAuthenticated, use(new SendOrderController_1.SendOrderController()));
// @ts-expect-error
router.get('/orders', isAuthenticated_1.isAuthenticated, use(new ListOrderController_1.ListOrderController()));
// @ts-expect-error
router.get('/orders/detail', isAuthenticated_1.isAuthenticated, use(new DetailOrderController_1.DetailOrderController()));
// @ts-expect-error
router.put('/order/finish', isAuthenticated_1.isAuthenticated, use(new FinishOrderController_1.FinishOrderController()));
