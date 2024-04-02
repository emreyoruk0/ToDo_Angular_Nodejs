// mongoose  -> MongoDb ile bağlantı kurmamızı ve oraya işlemler yapabilmemizi sağlar
// express   -> API isteklerini yazabilmemizi sağlar
// cors      -> cors politikalarını ayarlamamızı sağlar. Bu sayede frontend'den istek attığımızda hataya düşmez
// nodemon   -> nodejs'i ayağa kaldırır

const uri = "mongodb+srv://emreyoruk:VD9qAxtJKPCrkPTq@eternalib.06ijzom.mongodb.net/?retryWrites=true&w=majority&appName=eternaLib";

var mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(uri, (err)=>{
    if(!err){
        console.log("Bağlantı başarılı");
    };
});

const express = require('express');
const app = express(); 

const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"] // tüm istekleri kabul etsin diye
}));

const port = 5000;
app.listen(port, ()=>{
    console.log("Site http://localhost:" + port + " adresinde çalışıyor");
})
