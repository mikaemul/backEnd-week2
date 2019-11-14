'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const catController = require('../controllers/catController');
const { body,sanitizeBody} = require('express-validator');


router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), (req,res,next)=>{
  console.log('cat post file', req.file);
  //tiedoston nimi bodyyn jos haluaa
  //req.body.filename = req.file.filename;
  if(req.file === undefined){
    res.json({
      error:'NO file',
    });
  }else if(!req.file.mimetype.includes('image')){
    res.json({
      error:'Not image',
    });
  }else {
    next();
  }
});
router.post('/',[
      body('name','cannot be empty').isLength({min:1}),
      body('age','must be number').isNumeric().isLength({min:1}),
      body('weight','must be number').isNumeric().isLength({min:1}),
      body('owner','must be number').isNumeric().isLength({min:1}),
      sanitizeBody('name').escape()

    ]
    ,
    catController.cat_create_post);
router.put('/',[
  body('name','some error').isLength({min:1}),
  body('age','must be number').isNumeric().isLength({min:1}),
  body('weight','must be number').isNumeric().isLength({min:1}),
  body('owner','must be number').isNumeric().isLength({min:1}),
  sanitizeBody('name').escape()

],catController.cat_update_put);

router.delete('/:id',catController.cat_delete);


/*router.put('/', upload.single('cat'),(req, res,next) => {
  console.log('cat update file', req.file);
  req.body.filename = req.file.filename;
  next();
});


router.delete('/', upload.single('cat'),(req, res,next) => {
  console.log('cat delete file',req.file);
  next();
});

 */


module.exports = router;
