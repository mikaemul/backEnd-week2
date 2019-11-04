'use strict';
// catRoute
const express = require('express');
const router =express.Router();
const catController = require('../controllers/catController');

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

module.exports = router