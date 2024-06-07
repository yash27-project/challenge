import { Status, StatusCode, StatusMessage } from "../Constant/HttpConstant";
import productModal from "../Modal/ProductModal";


export const addProduct =async (req: any, res: any) => {
    const {name, description} = req.body;
    console.log("name", name, "desc", description)

    await productModal.create({
        name,
        description
    }).then((product)=>{
        if(product){
            return res.status(StatusCode?.HTTP_OK).json({
                status: Status?.STATUS_TRUE,
                Messages: StatusMessage?.HTTP_OK,
                data: product
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