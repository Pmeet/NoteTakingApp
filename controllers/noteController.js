const express = require('express')
const mongoose = require('mongoose')
const Note = mongoose.model('note')

var d = new Date();

var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();

day = (day < 10) ? "0" + day : day;
month = (month < 10) ? "0" + month : month;

var router = express.Router()

router.get('/',(req,res) => {
    res.render("note/addOrEdit",{
        viewTitle: "New Note"
    })
})

router.post('/',(req,res) => {
    if(req.body._id == '') 
        insertNote(req,res) 
    else
        updateNote(req,res)
    

})


function updateNote(req,res){

    Note.findOneAndUpdate({ _id: req.body._id },req.body,{new: true},(err,doc) => {
        if(!err){
            res.redirect('note/list')
        }
        else{
            console.log('Error during editing: '+err)
        }
    })

}


function insertNote(req,res){
    var note = new Note()
    note.noteTitle = req.body.NoteTitle
    note.noteDescription = req.body.NoteDes
    note.noteDate =day + "-" + month + "-" + year;
    note.save((err,doc) => {
        if(!err){
            res.redirect('note/list')
        }
        else{
            console.log("Error during note insertion : " + err)
        }
    })
}

router.get('/list', (req,res) => {
    Note.find((err,docs) => {
        if(!err){
            res.render('note/list',{
                list : docs
            })
        }
        else{
            console.log('Error in retrieving notes: '+err)
        }
    }) 
})


router.get('/:id', (req,res) => {
    Note.findById(req.params.id, (err,doc) => {
        if(!err){
            res.render('note/addOrEdit',{
                viewTitle: 'Edit Note',
                note: doc
            })
        }
        else{

        }
    })
})



router.get('/delete/:id', (req,res) => {
    Note.findByIdAndDelete(req.params.id, (err,doc) => {
        if(!err){
            res.redirect('/note/list')
        }
        else{
            console.log('Error in note deletion: '+err)
        }
    })
})


module.exports = router