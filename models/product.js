var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/shopping-cart');

var Schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
});
