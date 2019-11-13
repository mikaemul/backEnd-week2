'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const userController = require('../controllers/userController');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/', upload.single('user'), (req,res,next)=>{
  console.log('user post file', req.file);
  //tiedoston nimi bodyyn jos haluaa
  req.body.filename = req.file.filename;
  next();
});
router.post('/', userController.user_create_post);

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit users.');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete users.');
});

module.exports = router;
