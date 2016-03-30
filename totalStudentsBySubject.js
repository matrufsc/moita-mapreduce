// configuration
var database = "moita"; // database name
var output = "totalStudentsBySubject"; // output collection name (for shell usage)
var semester = "20161"; // desired semester

// code
db = db.getSiblingDB(database);

var map = function() {
  for (var i in this.classes) {
    var class_ = this.classes[i];
    emit(this._id, class_.occupied + class_.special);
  }
};

var reduce = function(key, values) {
  return Array.sum(values);
};

var options = { query: { semester: semester }, out: output };

db.moita.mapReduce(map, reduce, options);
db[output].find().sort({ value: -1 }).limit(20).forEach(result => {
  var name = db.moita.findOne({ _id: result._id }, { name: true }).name;
  print(`[${result._id}] ${name}: ${result.value}`);
});
