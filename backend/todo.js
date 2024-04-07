var mongoose = require('mongoose');
var schema = mongoose.Schema;

// MongoDb'de veriyi hangi yapıda tutmak istiyorsak o şekilde şemasını oluşturuyoruz, _id kendiliğinden oluşur.
var todoSchema = new schema({
    work: String,
    isCompleted: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo; // başka dosyalardan Todo'ya erişebilmemiz için export ettik.