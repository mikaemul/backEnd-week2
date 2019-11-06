'use strict';
// catRoute
const express = require('express');
const router =express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.user_list_get);
router.get('/:id', userController.user_get);

router.post('/', (req,res) => {
  console.log('user post body', req.body);
  res.json(req.body);
});

module.exports = router;