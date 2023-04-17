import express from "express"
import firebase from "firebase";
import  authRoute from "./controllers/authUsers.js";
import  blogRoute from "./controllers/blogUsers.js";
import  dataRoute from "./controllers/dataUsers.js";



const firebaseConfig = {
    apiKey: "AIzaSyCnuHrLQQ_r7qUgI7dWey7JAvZo5LmL_fQ",
    authDomain: "better-bc035.firebaseapp.com",
    projectId: "better-bc035",
    storageBucket: "better-bc035.appspot.com",
    messagingSenderId: "12593776455",
    appId: "1:12593776455:web:a99f199863b8b17122ae62",
    measurementId: "G-Z6FWB2R887"
  };

firebase.initializeApp(firebaseConfig);

const app = express();
app.use(express.json());



app.get("/", function(req,res){
    res.send("hey");
});

app.use("/",authRoute);
app.use("/",blogRoute);
app.use("/",dataRoute);



app.listen(3000, () => {
  console.log('Server started on port 3000');
});
