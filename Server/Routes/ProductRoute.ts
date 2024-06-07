import { addProduct } from "../Controller/ProductController";

const express = require('express');
const productRouter = express.Router();

productRouter.post('/add-product', addProduct);

export default productRouter;