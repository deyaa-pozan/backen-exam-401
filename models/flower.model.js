const mongoose =require('mongoose')

const flowerSchema = mongoose.Schema({

email:String,
instructions: String,
photo: String,
name: String,
slug:String

})

module.exports = mongoose.model('flower',flowerSchema)
