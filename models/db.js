const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/NoteDB',{ useNewUrlParser: true },(err) => {
    if ( !err ) {
        console.log('Connection successful!')
    }
    else{
        console.log('Error in DB connection: '+err)
    }
})

require('./note.model')