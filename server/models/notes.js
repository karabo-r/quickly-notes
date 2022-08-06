const mongoose = require('mongoose')

// model for notes
const noteSchema = new mongoose.Schema({
	heading: String,
	content: String,
});

module.exports =  mongoose.model("Notes", noteSchema);