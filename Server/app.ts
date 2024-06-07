import { MONGODB_URL, PORT } from "./Config/config";
import productRouter from "./Routes/ProductRoute";
import router from "./Routes/UserRoute";

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
require('./db/config')
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));



app.listen(PORT, ()=>{
    console.log("Server is running on 4000");
    
})
// mongoose.connect("mongodb://localhost:27017/16april", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).then(() => {
//     app.listen(PORT, () =>
//         console.log(`Database Connected and Listening at Port 4001`)
//     )
//   }).catch((error: any) => {
//     console.log("Database error :", error?.message);
//   })
  
  app.use('/api', router);
  // app.use('/check', productRouter)