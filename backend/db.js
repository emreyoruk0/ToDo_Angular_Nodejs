// mongoose  -> MongoDb ile bağlantı kurmamızı ve oraya işlemler yapabilmemizi sağlar
// express   -> API isteklerini yazabilmemizi sağlar
// cors      -> cors politikalarını ayarlamamızı sağlar. Bu sayede frontend'den istek attığımızda hataya düşmez
// nodemon   -> nodejs'i ayağa kaldırır..

const uri = "mongodb+srv://emreyoruk:VD9qAxtJKPCrkPTq@eternalib.06ijzom.mongodb.net/?retryWrites=true&w=majority&appName=eternaLib";

const mongoose = require('mongoose');
const Todo = require('./todo');

mongoose.set("strictQuery", false);

mongoose.connect(uri)
    .then(() => console.log("MongoDB'ye bağlantı başarılı")) // bağlantı başarılıysa .then() kısmı çalışır
    .catch(err => console.log(err)); // başarısızsa/hata varsa .catch() kısmı çalışır

const express = require('express');
const app = express(); 
app.use(express.json()); // Gelen verileri json formatında okumak için

const cors = require('cors');
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"] 
}));


//**** İstekleri buraya yani cors ve listen arasına yazmalıyız*** */

// Mevcut tüm verileri getirir -> http://localhost:5000/api/getall
app.get("/api/getall", (req, res) => {
    Todo.find({}) // {} dediğimiz için tüm verileri getirir
        .then(data => res.send(data)) // Verileri frontende gönderir
        .catch(err => console.error(err)); // Hata durumunda hatayı konsola yazdır
});


// Veri eklemeye yarar -> http://localhost:5000/api/add
app.post("/api/add", (req, res) =>{
    console.log(req.body); // -> { work: 'eklenen veri', isCompleted: true}
    const {work, isCompleted} = req.body; // req.body'den objenin work, isCompleted kısımlarını alır
    // req.body -> frontend'den gelen verileri içerir
    

    const todo = new Todo({
        work: work, // oluşturulan todo nesnesinin work kısmına frontend'den gelen veriyi atar
        isCompleted: isCompleted // oluşturulan todo nesnesinin isCompleted kısmına frontend'den gelen veriyi atar
    });

    // oluşturulan todo nesnesini kaydeder
    todo.save()
        .then(() => res.send({message: "Todo kaydı başarılı!"}))
        .catch(err => console.log(err));
});


// Veri silmeye yarar -> http://localhost:5000/api/delete
app.post("/api/delete", (req, res)=>{
    const todo = new Todo(req.body); // frontend'den gelen req.body'den silinecek verinin tamamını obje şeklinde alır

    // alınan veriyi siler
    todo.deleteOne()
        .then(() => res.send({message: "Todo silme başarılı!"}))
        .catch(err => console.log(err));
});


// Veri güncellemeye yarar -> http://localhost:5000/api/update
app.post("/api/update", (req, res)=>{
    const newTodo = new Todo(req.body); // frontend'den gelen req.body'den güncellenecek verinin tamamını obje şeklinde alır

    Todo.findByIdAndUpdate(newTodo._id, newTodo)
        .then(() => res.send({message: "Todo güncelleme başarılı!"}))
        .catch(err => console.log(err));
});
//************************************************************* */

const port = 5000;
app.listen(port, ()=>{
    console.log("Site http://localhost:" + port + " üzerinden ayağa kaldırıldı.");
});
