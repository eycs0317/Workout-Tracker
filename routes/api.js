const express = require('express')
const router = express.Router();
const { Workout } = require('../models/model.js')
const mongoose = require("mongoose");
console.log('Wokrrer------', Workout)


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
  console.log('inside post /workouts')
  console.log('body----', body)
  Workout.create(body)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })

})


//ann and complete btn
router.put('/workouts/:id', (req, res) => {
  console.log('inside put /workouts/:id')
  var id = req.params.id
  var body = req.body
  console.log('iddddd', id) //something wrong with the id
  console.log('iddddd', body)
  Workout.create({exercises: body})
  .then(data => {
    // console.log(data)
    res.json(data)
  })
  .catch(err => {
    // console.log(err)
    res.json(err)
  })
})


//range
router.get('/workouts/range', (req, res) => {
  console.log('inside get /workouts/range')
  Workout.find({})
  .then(data => {
    // console.log('in range--------', data)

    var last7 = data.splice(data.length - data.length - 7)
    console.log('last7777', last7)
    res.json(last7)
  })
  .catch(err => {
    res.json(err)
  })
})

module.exports = router