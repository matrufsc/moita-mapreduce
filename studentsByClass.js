// configuration
var database = "moita"; // database name
var output = "studentsByClass"; // output collection name (for shell usage)
var semester = "20161"; // desired semester

// code
db = db.getSiblingDB(database);

var map = function() {
  for (var i in this.classes) {
    var class_ = this.classes[i];
    if (class_._id.substr(2, 3) == "208") {
      emit(`${this._id}`, class_.occupied + class_.special);
    }
  }
};

var reduce = function(key, values) {
  return Array.sum(values);
};

var options = {
  query: {
    campus: "FLO",
    semester: semester,
    _id: { $regex: /^(INE|MTM5161|MTM7174|MTM5512|MTM5245|EEL5105)/ }
  },
  out: output
};

db.moita.mapReduce(map, reduce, options);
db.getCollection(output).find().sort({ value: -1 }).forEach(result => {
  print(`${result._id}: ${result.value}`);
});
