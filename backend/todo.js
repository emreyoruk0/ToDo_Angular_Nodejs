var mongoose = require('mongoose');
var schema = mongoose.Schema;

// MongoDb'de hangi şekildeyse burada da o şekilde şemasını oluşturuyoruz
var todoSchema = new schema({
    work: String,
    isCompleted: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo; // başka dosyalardan Todo'ya erişebilmemiz için export ettik.