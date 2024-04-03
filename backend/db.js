// mongoose  -> MongoDb ile bağlantı kurmamızı ve oraya işlemler yapabilmemizi sağlar
// express   -> API isteklerini yazabilmemizi sağlar
// cors      -> cors politikalarını ayarlamamızı sağlar. Bu sayede frontend'den istek attığımızda hataya düşmez
// nodemon   -> nodejs'i ayağa kaldırır

const uri = "mongodb+srv://emreyoruk:VD9qAxtJKPCrkPTq@eternalib.06ijzom.mongodb.net/?retryWrites=true&w=majority&appName=eternaLib";

const mongoose = require('mongoose');

mongoose.set("strictQuery", false);


mongoose.connect(uri)
    .then(() => console.log("MongoDB'ye bağlantı başarılı"))
    .catch(err => console.log(err));



const express = require('express');
const app = express(); 

const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"] 
}));

const port = 5000;

app.get("/test",(req,res)=> {
    res.send("Api çalışıyor..."); //şu anda herşey çalışıyor gibi sen table filan ekleyince hata alıp çözemezsen yine yazarsın ok?
});

app.listen(port, ()=>{
    console.log("Site http://localhost:" + port + " üzerinden ayağa kaldırıldı.");
});
