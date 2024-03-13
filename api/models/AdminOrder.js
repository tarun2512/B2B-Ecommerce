const mongoose = require("mongoose");

const AdminOrderSchema = new mongoose.Schema(
  {
    pname: {type: String},
    pcolor: {type: String},
    psize: {type: String},
    productId: {type: String},
    adminid: {type: String},
    userId: {type: String},
    quantity: {type: Number},
    address: {type: Object},
    orderid: {type: String},
    status:{type: String,default:"pending"}
  },{ timestamps: true }
);

module.exports = mongoose.model("AdminOrder", AdminOrderSchema);
