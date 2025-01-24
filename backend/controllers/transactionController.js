const { deleteModel } = require('mongoose');
const transactionModel= require('../models/transactionModel');
const moment = require('moment');

const getAllTransactions = async (req, res) => {
    try {
        // Use req.query to access query parameters for GET requests
        const { frequency, selectedDate, type, userid } = req.query;

        // Validate userid
        if (!userid) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Validate selectedDate for custom frequency
        if (frequency === "custom" && (!Array.isArray(selectedDate) || selectedDate.length !== 2)) {
            return res.status(400).json({ message: "Invalid date range provided" });
        }

        // Construct query based on filter criteria
        const query = {
            userid,
            ...(frequency !== "custom"
                ? {
                      date: {
                          $gt: moment().subtract(Number(frequency), "d").toDate(),
                      },
                  }
                : {
                      date: {
                          $gte: moment(selectedDate[0]).startOf("day").toDate(),
                          $lte: moment(selectedDate[1]).endOf("day").toDate(),
                      },
                  }),
            ...(type !== "all" && { type }),
        };

        // Fetch transactions from the database
        const transactions = await transactionModel.find(query);

        // Send the fetched transactions in the response
        res.status(200).json(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
        res.status(200).send('Transaction Deleted');
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const editTransaction=async(req, res) =>{
    try{
        await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload);
        res.status(200).send('Edit successfully');
    } catch (error){
        console.log(error);
        res.status(500).json(error);
    }
};


const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).send('Transaction added successfully');
    }
    catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

module.exports = { getAllTransactions, addTransaction, editTransaction, deleteTransaction };