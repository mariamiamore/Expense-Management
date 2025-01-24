const express = require("express");
const { addTransaction, getAllTransactions, editTransaction, deleteTransaction} = require("../controllers/transactionController");

//router object
const router = express.Router();

//routes
//add transaction
router.post('/addTransaction', addTransaction);
//edit
router.post('/editTransaction', editTransaction);
//delete
router.post('/removeTransaction', deleteTransaction);

// Change this line to use GET instead of POST
router.get('/getTransaction', getAllTransactions);

module.exports = router;