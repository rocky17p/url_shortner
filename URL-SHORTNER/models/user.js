const mongoose = require("mongoose");
const userSchemea = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
        type:String,
        required:true, 
    }
  },
  { timestamps: true }
);
const User=mongoose.model('user',userSchemea);
module.exports=User;
