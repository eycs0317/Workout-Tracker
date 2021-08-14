const express = require('express')
const router = express.Router();
const { Workout } = require('../models/model.js')
const mongoose = require("mongoose");
console.log('Wokrrer------', Workout)





// router.get('/workout', (req, res) => {
//   res.send('hello')
// })

//get last work out
router.get('/workouts', (req, res) => {
  Workout.find({})
  .then(data => {
    // console.log(data)
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

router.post('/workouts', (req, res) => {
  var body = req.body
  console.log('booodddyyy', body)

})

router.get('/workouts/range', (req, res) => {
  Workout.find({})
  .then(data => {
    // console.log(data)
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

router.put('/workouts/:id', (req, res) => {
  // var id = req.params.id
  // var body = req.body
  // console.log('iddddd', id) //something wrong with the id
  // console.log('iddddd', body)
  // Workout.create({exercises: body})
  // .then(data => {
  //   // console.log(data)
  //   res.json(data)
  // })
  // .catch(err => {
  //   // console.log(err)
  //   res.json(err)
  // })
})

module.exports = router