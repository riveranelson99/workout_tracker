// export our singular model from an index folder so as to have access to both the db and the model individually rather than just the model itself (That caused problems)
module.exports = {
  Workout: require("./Workout"),
};