const express = require('express');
const router = express.Router();
const getUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


router.get('/getallnotes', getUser , async (req, res) => {  
        
        try {
            const notes = await Notes.find({ user:req.user.id });                    
            res.json(notes);
        } catch (error) {
            console.error(error);
            res.status(400).send("Internal Server Error");
        }

    });

router.post('/addnotes',
    [// sending validation in array to apply on request body
        body("title","Enter a valid title").isLength({ min: 3 }),
        body("desc","Enter atleast minimum 5 chracter").isLength({ min: 5 }),
    ]
    , getUser, async (req, res) => {  
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        try {

            const notes= new Notes({
                    title:req.body.title,
                    tag:req.body.tag,
                    desc:req.body.desc,
                    user:req.user.id
            });
           const savenotes= await notes.save();
            

            res.json({ savenotes });
        } catch (error) {
            console.error(error);
            res.status(400).send("Internal Server Error");
        }

    });

router.put('/updatenote/:id',
    [// sending validation in array to apply on request body
        body("title", "Enter a valid title").isLength({ min: 3 }),
        body("desc", "Enter atleast minimum 5 chracter").isLength({ min: 5 }),
    ]
    , getUser, async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        try {
            const { title,tag,desc }=req.body;
            const newNotes =  {
                title,
                tag,
                desc
            };
            let note= await Notes.findById(req.params.id);
            if(!note)
            {
                return res.status(404).send("Not found");
            }
            if(note.user.toString()!=req.user.id)
            {
                return res.status(401).send("Not Allowed");
            }
            note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})


            res.json({ note });
        } catch (error) {
            console.error(error);
            res.status(400).send("Internal Server Error");
        }

    });

router.delete('/deletenote/:id', getUser, async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        try {
            let note= await Notes.findById(req.params.id);
            if(!note)
            {
                return res.status(404).send("Not found");
            }
            if(note.user.toString()!=req.user.id)
            {
                return res.status(401).send("Not Allowed");
            }
            note= await Notes.findByIdAndDelete(req.params.id)


            res.json({ "Success":"Note Has been deleted",note:note });
        } catch (error) {
            console.error(error);
            res.status(400).send("Internal Server Error");
        }

    });


module.exports=router