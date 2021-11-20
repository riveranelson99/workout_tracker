const router = require('express').Router();
const db = require('../models')

// first api route  to load the latest workout that took place according to the database
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

// second api route to track a weeklong range of workouts that took place according to the database
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

// third api route to create a new workout from our user
router.post('/api/workouts', ({ body }, res) => {
  db.Workout.create(body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    })
});

// final api route to update any newly created workout to add additional workouts to it, or "continue" the workout as termed by the public folder
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