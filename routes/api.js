const express = require('express')
const router = express.Router();
const { Workout } = require('../models/model.js')
const mongoose = require("mongoose");
// console.log('Wokrrer------', Workout)


//get last work out - semi-OK
router.get('/workouts',  async (req, res) => {
  try {
    var data = await Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: '$exercises.duration'}
        }
      }
    ])
    console.log('data', data)
    res.json(data)
  }
  catch (err) {
    res.json(err)
  }
})

router.post('/workouts', async (req, res) => {

})


//ann and complete btn
router.put('/workouts/:id', (req, res) => {
  console.log('inside put /workouts/:id')
  var id = req.params.id
  var body = req.body
  console.log('iddddd', id) //something wrong with the id
  console.log('iddddd', body)
  // Workout.create(
  //   {id: id},
  //   {
  //     $push: { exercises: body}
  //   }
  // )
  // .then(data => {
  //   console.log('data from put route', data)
  //   res.json(data)
  // })
  // .catch(err => {
  //   // console.log(err)
  //   res.json(err)
  // })
})


//range - OK
router.get('/workouts/range', (req, res) => {
  console.log('inside get /workouts/range')
  Workout.aggregate([
    {
      $addFields: { totalDuration: { $sum: '$exercises.duration'}}
    },
    {
      $sort: { day: 1}
    },
    {
      $limit: 7
    }
  ])
  //.sort({ field: 'asc', test: -1 })

  .then(data => {
    console.log('dataaa', data)
    var temp = 0;

    for(var i = 0; i < data.length; i++) {
      console.log(data[i].exercises[0].name)
      temp = data[i].exercises[0].duration
      data[i].totalDuration = temp
    }
    data = data.slice(-7)
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

module.exports = router