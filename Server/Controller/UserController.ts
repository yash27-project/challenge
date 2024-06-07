import { Status, StatusCode, StatusMessage } from "../Constant/HttpConstant"
import { Messages } from "../Constant/MessageConstant"
import { validationResult } from "express-validator";
import {UserModal} from '../Modal/UserModal';
import { MessageContant } from "../Constant/Constant";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';


export const SignUp =async (req: any, res: any) => {
    const {name, phone_number, email, password}: any = req?.body
    console.log("request", req.body);
    console.log("files", req);
    
    
    // return ''
    if(name == '' && name.trim() == ''){
        return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
            status: Status?.STATUS_FALSE,
            message: Messages?.NAME_CANT_BLANK
        })
    }

    if(!phone_number || phone_number?.trim() == ''){
        return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
            status: Status?.STATUS_FALSE,
            Messages: Messages?.PHONE_CANT_BLANK
        })
    }

    const error: any = validationResult(req);
    console.log("myerrrrrrrr-----------------", error);
    

    if(!error.isEmpty()){
        return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
            status: Status?.STATUS_FALSE,
            Messages: StatusMessage?.HTTP_VALIDATION,
            errors: error.mapped()
        })
    }

    const emailFound = await UserModal.findOne({email: email}).exec();
    if(emailFound){
        return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
            status: Status?.STATUS_FALSE,
            Messages: MessageContant?.EMAIL_ALREADY_EXITS
        })
    } else {
        try {
        const hashPassword: any = await bcrypt.hash(password, 8)
        

        await UserModal.create({
            name,
            password: hashPassword,
            email,
            phone_number,
            profile_image: req.file?.path
        }).then((resp: any)=>{
            if(resp){
                var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'manish09.dev@gmail.com',
                      pass: 'alxjsplgsyzrijve'
                    }
                });

                var mailOptions = {
                    from: 'manish09.dev@gmail.com',
                    to: 'devpaiowner@gmail.com',
                    subject: 'Sending Email using Node.js',
                    html: `<html>
                    <head>
                    <style>
                    body {background-color: powderblue;}
                    h1   {color: blue;}
                    p    {color: red;}
                    </style>
                    </head>
                    <body>
                    
                    <h1>Your opt is here: ${otp} </h1>
                    <p>This is a paragraph.</p>
                    
                    </body>
                    </html>`
                };
                  
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                return res.status(StatusCode?.HTTP_OK).json({
                    status: Status?.STATUS_TRUE,
                    Messages: StatusMessage?.HTTP_OK,
                    data: resp
                })
            } else {
                return res.status(StatusCode?.HTTP_BAD_REQUEST).json({
                    status: Status?.STATUS_FALSE,
                    message: StatusMessage?.HTTP_BAD_REQUEST,
                    errors: "error.message"
                })
            }
        }).catch((error: any) => {
            return res.status(StatusCode?.HTTP_INTERNAL_SERVER_ERROR).json({
                status: Status?.STATUS_FALSE,
                message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
                errors: error.message
            })
        })
    }
        catch(error: any){
            return res.status(StatusCode?.HTTP_INTERNAL_SERVER_ERROR).json({
                status: Status?.STATUS_FALSE,
                message: StatusMessage?.HTTP_INTERNAL_SERVER_ERROR,
                errors: error.message
            })
        }
    }
    


}