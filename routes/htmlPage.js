const router = require('express').Router();
const path = require('path')
const { Workout } = require('../models/model.js')

// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'))
// })

router.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'))
})

router.get('/exercise/:id', (req, res) => {
  console.log('heheheherer-------------------------------------')
  var id = req.params.id
  Workout.findById(id)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

router.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'))
})

module.exports = router