import express from "express";
import session from 'express-session';
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB";
import componentsService from "./services/componentsService"
import cors from "cors";

require("dotenv").config();

let app = express();

// config app

// const corsOptions = {
//   origin: '*',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// }

// app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(cors({
  origin: true,
  // methods: ['GET', 'POST'],
  // credentials: true,
}));
// app.use(cors({ origin: true }));
// app.use(cors({
//   origin: 'http://localhost:3000/api/login1'
// }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup session for app
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  // secret: 'keyboard cat',
  secret: 'MySecret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    // secure: true,
    // httpOnly: true,
    // maxAge: process.env.APP_SESSION_MAX_TIME_SECOND_WAIT * 10000
  }
}))

// test use session
// app.get('/session2', function (req, res, next) {
//   res.setHeader('Content-Type', 'text/html')
//   if (req.session.userId) {
//     req.session.userId++
//   } else {
//     req.session.userId = 1
//   }
//   console.log(req.session.userId);
//   res.end('<p>' + req.session.userId + '</p>');
//   // if (req.session.views) {
//   //   req.session.views++
//   //   res.setHeader('Content-Type', 'text/html')
//   //   res.write('<p>views: ' + req.session.views + '</p>')
//   //   res.write('<p>expires in: ' + (req.session.cookie.maxAge) + 's</p>')
//   //   res.end()
//   // } else {
//   //   req.session.views = 1
//   //   res.end('welcome to the session demo. refresh!')
//   // }
// })



// import bcrypt from "bcryptjs";

// const salt = bcrypt.genSaltSync(10);
// async function hashPassword(password) {
//   let result = await bcrypt.hashSync(password, salt);
//   console.log(result);
//   return result;
// }

// let aryPasswordDefault = [
//   hashPassword("dung"),
//   hashPassword("kha"),
//   hashPassword("quang"),
//   hashPassword("dungAgent"),
//   hashPassword("quangAgent"),
//   hashPassword("khaAgent"),
//   hashPassword("dungFactory"),
//   hashPassword("quangFactory"),
//   hashPassword("khaFactory"),
//   hashPassword("dungInsurance"),
//   hashPassword("quangInsurance"),
//   hashPassword("khaInsurance"),
// ];

// import cryptoJS from "./utils/cryptoJS"
// let aryPasswordDefault = [
//   cryptoJS.encrypt("dung"), //dung
//   cryptoJS.encrypt("kha"), //kha
//   cryptoJS.encrypt("quang"), //quang
//   cryptoJS.encrypt("dungAgent"), //dungAgent
//   cryptoJS.encrypt("quangAgent"), //quangAgent
//   cryptoJS.encrypt("khaAgent"), //khaAgent
//   cryptoJS.encrypt("dungFactory"), //dungFactory
//   cryptoJS.encrypt("quangFactory"), //quangFactory
//   cryptoJS.encrypt("khaFactory"), //khaFactory
//   cryptoJS.encrypt("dungInsuranceory"), //dungInsuranceory
//   cryptoJS.encrypt("quangInsurance"), //quangInsurance
//   cryptoJS.encrypt("khaInsurance"), //khaInsurance
// ];
// let aryPasswordDefault = [
//   cryptoJS.decrypt("U2FsdGVkX18kaQ46euuAHhiFUxqKZMkTDO858xwhP/E="), //dung
//   cryptoJS.decrypt("U2FsdGVkX1/OKb6IyAr6wKxYPuVFOn8FXM/ju5KyLMA="), //kha
//   cryptoJS.decrypt("U2FsdGVkX18RjqRQJOPCMqtL+/34OloRlm6v5otfGsY="), //quang
//   cryptoJS.decrypt("U2FsdGVkX1+xobWfp6XlvBBdgkP41hvdCYug37APar4="), //dungAgent
//   cryptoJS.decrypt("U2FsdGVkX18ZIQ87kzPqeLoruYZpHer2tpfvVQkv7SA="), //quangAgent
//   cryptoJS.decrypt("U2FsdGVkX1/jLUDh/gHu+odvmTZlMvYwtHVJCtcapOE="), //khaAgent
//   cryptoJS.decrypt("U2FsdGVkX1+H6bFYMyVRyXQgMluCRSxCevIM6I0bpTA="), //dungFactory
//   cryptoJS.decrypt("U2FsdGVkX1/n6ZysmQjNE3jCmORWHc71hIlm0iz34FA="), //quangFactory
//   cryptoJS.decrypt("U2FsdGVkX18bCS4Kdqvt3s3k9a8n26sd5Yc4sLNVmoA="), //khaFactory
//   cryptoJS.decrypt("U2FsdGVkX19saRLYtScp+E5yuW/Pe9QW4khwZY+Sx4XB5Q3WVtrkDI9GvG0kODiH  "), //dungInsuranceory
//   cryptoJS.decrypt("U2FsdGVkX1+FHc/8MTRXuMOrDp7s7U3HfK4I1zbsURo="), //quangInsurance
//   cryptoJS.decrypt("U2FsdGVkX19d3VZxN9kH4GR8r3q5AxRdLARPop3CGlo="), //khaInsurance
// ];

// aryPasswordDefault.map((item) => {
//   console.log(item);
// })

viewEngine(app);
initWebRoutes(app);
connectDB();

const PORT = process.env.PORT || 3864;
// PORT === undefined => port = 3864

app.listen(PORT, () => {
  console.log("Backend Nodejs is running on the port: " + PORT);
});
