'use strict';
// catRoute
const express = require('express');
const router =express.Router();
const catController = require('../controllers/catController');
const multer = require('multer');
const upload = multer({dest:'uploads/'});

router.get('/', catController.cat_list_get);
router.get('/:id', catController.cat_get);

router.get('/', (req, res) => {
  res.send('With this endpoint you can get cats.');
});
router.post('/', (req, res) => {
  res.send('With this endpoint you can add cats');
});
router.put('/', (req, res) =>  {
  res.send('With this endpoint you can edit cats.');
});
router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete cats.');
});
router.get('/:id', function (req, res) {
  const id = req.params.id;
  res.send('You reqested a cat whose id is ' + id)
});
router.post('/', upload.single('cat'), (req,res,next)=>{
  console.log('cat post file',req.file);
  res.send('With this endpoint you can add cats');
});
/*app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
});

var cpUpload = upload.fields([{ name: 'cat',maxCount: 1},{name: 'gallery, maxCount: 8}]);
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
});

 */




module.exports = router;