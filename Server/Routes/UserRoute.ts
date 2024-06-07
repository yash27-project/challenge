const express = require('express');
const router = express.Router();
import multer from 'multer'
import { SignUp } from '../Controller/UserController';
import { addProduct } from '../Controller/ProductController';
const AuthValidator = require("../validator/authValidator")

var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './uploads')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname + String(new Date()))
    }
})
var upload = multer({ storage: storage })
console.log('upload', upload);


router.post('/sign-up', upload.single('profile-file'), SignUp);
router.post('/add-product', addProduct);

export default router;