import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { ListByCategoryController } from './controllers/products/ListByCategoryController';
import { CreateProductController } from './controllers/products/CreateProductController';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

import uploadConfig from './config/multer';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"));

// Helper para preservar o contexto `this`
const use = (controller: any) => controller.handle.bind(controller);

// Rotas User
router.post('/users', use(new CreateUserController()));
router.post('/session', use(new AuthUserController()));
// @ts-expect-error
router.get('/me', isAuthenticated, use(new DetailUserController()));

// Rotas Category
// @ts-expect-error
router.post('/category', isAuthenticated, use(new CreateCategoryController()));
// @ts-expect-error
router.get('/category', isAuthenticated, use(new ListCategoryController()));

// Rotas Product
// @ts-expect-error
router.post('/product', isAuthenticated, use(new CreateProductController()));
// @ts-expect-error
router.get('/category/product', isAuthenticated, use(new ListByCategoryController()));

// Rotas Order
// @ts-expect-error
router.post('/order', isAuthenticated, use(new CreateOrderController()));
// @ts-expect-error
router.delete('/order', isAuthenticated, use(new RemoveOrderController()));
// @ts-expect-error
router.post('/order/add', isAuthenticated, use(new AddItemController()));
// @ts-expect-error
router.delete('/order/remove', isAuthenticated, use(new RemoveItemController()));
// @ts-expect-error
router.put('/order/send', isAuthenticated, use(new SendOrderController()));
// @ts-expect-error
router.get('/orders', isAuthenticated, use(new ListOrderController()));
// @ts-expect-error
router.get('/orders/detail', isAuthenticated, use(new DetailOrderController()));
// @ts-expect-error
router.put('/order/finish', isAuthenticated, use(new FinishOrderController()));

export { router };