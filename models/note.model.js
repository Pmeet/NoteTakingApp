const mongoose = require('mongoose')

var NoteSchema  = new mongoose.Schema({
    
    noteTitle: {
        type : String
    },

    noteDescription: {
        type : String 
    },

    noteDate: {
        type : String
    },

})

mongoose.model('note',NoteSchema)