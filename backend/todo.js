const mongoose = require('mongoose');

// MongoDb'de veriyi hangi yapıda tutmak istiyorsak o şekilde şemasını oluşturuyoruz, _id kendiliğinden oluşur.
const todoSchema = new mongoose.Schema({
    work: String,
    isCompleted: Boolean
});

const Todo = mongoose.model('Todo', todoSchema); // Todo adında bir model oluşturduk ve todoSchema yapısını kullandık.

module.exports = Todo; // başka dosyalardan Todo'ya erişebilmemiz için export ettik.