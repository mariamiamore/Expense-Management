const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userid:{
        type:String,
    },
    amount:{
        type:Number,
    },
    type:{
        type:String,
    },
    category:{
        type:String,
       
    },
    description:{
        type:String,
    },
    date: {
        type: Date,
    },
},
    {timestamps:true}
);

const transactionModel= mongoose.model('transactions', transactionSchema);
module.exports = transactionModel;