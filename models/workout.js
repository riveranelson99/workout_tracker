const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// set up a new workout schema as called for in the public folder
const WorkoutSchema = new Schema({
  // use day so as to track the specific date the workout took place
  day: {
    type: Date,
    default: Date.now
  },

  // use exercises as an array of properties so as to track the type, name, duration, etc. of the workout and have those properties accessible for the tracker app
  // had to specify each property as the create process would not act as desired if left with only each properties type (most likely due to lack of default)
  exercises: [
    {
      type: {
        type: String,
        trim: true,
      },
      name: {
        type: String,
        trim: true,
      },
      duration: {
        type: Number,
        default: 0,
      },
      weight: {
        type: Number,
        default: 0,
      },
      reps: {
        type: Number,
        default: 0,
      },
      sets: {
        type: Number,
        default: 0,
      },
      distance: {
        type: Number,
        default: 0,
      }
    },
  ],
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;