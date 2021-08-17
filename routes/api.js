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
    res.json(data)
  }
  catch (err) {
    res.json(err)
  }
})

//post
router.post('/workouts', async (req, res) => {
  var body = req.body;
  try{
    var data = await Workout.create(body)
    res.json(data)
  }
  catch (err) {
    res.json(err)
  }

})


//ann and complete btn
// router.put('/workouts/:id', (req, res) => {
//   console.log('inside put /workouts/:id')
//   var id = req.params.id
//   var body = req.body
//   console.log('iddddd', id) //something wrong with the id
//   console.log('iddddd', body)
//   // Workout.create(
//   //   {id: id},
//   //   {
//   //     $push: { exercises: body}
//   //   }
//   // )
//   // .then(data => {
//   //   console.log('data from put route', data)
//   //   res.json(data)
//   // })
//   // .catch(err => {
//   //   // console.log(err)
//   //   res.json(err)
//   // })
// })

router.put("/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true }
  )
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.json(err);
      });
});


//range - OK
router.get('/workouts/range', (req, res) => {
  console.log('inside get /workouts/range')
  Workout.aggregate([
    {
      $addFields: { totalDuration: { $sum: '$exercises.duration'}}
    },
    {
      $sort: { day: -1}
    },
    {
      $limit: 7
    }
  ])
  .then(data => {
    console.log('data-------range', data)
    data = data.reverse()
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

module.exports = router