const express=require("express");
const path=require("path");
const connectMongoDB = require("./connection");
const cookieParser=require("cookie-parser");

const urlRoute=require("./routes/url.route");
const staticRoute=require("./routes/static.route");
const userRoute=require("./routes/user.route");
const {checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app=express();
const PORT=8001;

connectMongoDB("mongodb+srv://kumarkundan8226:MongoDB153@cluster0.7zonfli.mongodb.net/short-Url")
.then(()=>console.log("mongoDB connected!!"))
.catch((err)=>console.log("MongoDB error",err))

//for templating engine
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser()); //for parsing cookie
app.use(checkForAuthentication);  //always checked

app.use("/url",restrictTo(["NORMAL","ADMIN"]) ,urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

app.listen(PORT,()=>console.log(`server is listening at PORT: ${PORT}`));