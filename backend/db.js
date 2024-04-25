// mongoose  -> MongoDb ile bağlantı kurmamızı ve oraya işlemler yapabilmemizi sağlar
// express   -> API isteklerini yazabilmemizi sağlar
// cors      -> cors politikalarını ayarlamamızı sağlar. Bu sayede frontend'den istek attığımızda hataya düşmez
// nodemon   -> nodejs'i ayağa kaldırır..

const uri = "mongodb+srv://emreyoruk:VD9qAxtJKPCrkPTq@eternalib.06ijzom.mongodb.net/?retryWrites=true&w=majority&appName=eternaLib";


const mongoose = require('mongoose');
var Todo = require('./todo');

mongoose.set("strictQuery", false);

mongoose.connect(uri)
    .then(() => console.log("MongoDB'ye bağlantı başarılı")) // bağlantı başarılıysa .then() kısmı çalıştırır
    .catch(err => console.log(err)); // hata varsa .catch() kısmı çalışır



const express = require('express');
const app = express(); 
app.use(express.json()); // Gelen verileri json formatında okumak için

const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"] 
}));


//**** İstekleri buraya yani cors ve listen arasına yazmalıyız*** */

// Mevcut tüm verileri getirir
app.get("/api/getall", (req, res) => {
    Todo.find({}) // {} dediğimiz için tüm verileri getirir
        .then(data => {
            res.send(data); // Verileri geri gönder
        })
        .catch(err => {
            console.error(err); // Hata durumunda hatayı konsola yazdır
        });
});

// Veri eklemeye yarar
app.post("/api/add", (req, res) =>{
    const {work} = req.body; // sadece work kısmını alır

    const todo = new Todo({
        work: work,
        isCompleted: false,
    });

    todo.save()
    .then(()=>{
        res.send({message: "Todo kaydı başarılı!"});
    })
    .catch((err)=>{
        throw err;
    });
});

// Veri silmeye yarar
app.post("/api/delete", (req, res)=>{
    const todo = new Todo(req.body);

    todo.deleteOne()
    .then(()=>{
        res.send({message: "Todo silme başarılı!"});
    })
    .catch((err)=>{
        throw err;
    });
});

// Veri güncellemeye yarar
app.post("/api/update", (req, res)=>{
    const newTodo = new Todo(req.body);

    Todo.findByIdAndUpdate(newTodo._id, newTodo)
    .then(()=>{
        res.send({message: "Todo güncelleme başarılı!"});
    })
    .catch((err)=>{
        throw err;
    });
});
//************************************************************* */

const port = 5000;
app.listen(port, ()=>{
    console.log("Site http://localhost:" + port + " üzerinden ayağa kaldırıldı.");
});
