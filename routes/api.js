const router = require('express').Router();
const db = require('../models')

router.get('/api/workouts', (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        "totalDuration": { $sum: "$exercises.duration" },
        "totalWeight": { $sum: "$exercises.weight" }
      }
    }
  ])
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
});

router.get('/api/workouts/range', (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        "totalDuration": { $sum: "$exercises.duration" },
        "totalWeight": { $sum: "$exercises.weight" }
      }
    }
  ])
    .sort({ "_id": -1 })
    .limit(7)
    .sort({ "_id": 1 })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
});

router.post('/api/workouts', ({ body }, res) => {
  console.log(body);
  db.Workout.create(body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
});

router.put('/api/workouts/:id', (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;