'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const userController = require('../controllers/userController');
const { body,sanitizeBody  } = require('express-validator');

router.get('/',userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/',upload.single('user'), (req,res,next)=>{
  console.log('user post file', req.file);
  //tiedoston nimi bodyyn jos haluaa
  //req.body.filename = req.file.filename;
  next();
});
router.post('/',[
      // username must be an email
      body('name','min 3 characters').isLength({min:3}),
      // email must be valid email address
      body('email','email').isEmail(),
      // password must be at least 3 chars long
      body('passwd','password').matches('(?=.*[A-Z]).{8,}'),
      sanitizeBody('name').escape()
    ]
    ,
    userController.user_create_post);

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit users.');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete users.');
});

module.exports = router;
