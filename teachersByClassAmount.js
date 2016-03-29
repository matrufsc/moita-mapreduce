// configuration
var database = "moita"; // database name
var output = "teachersByClassAmount"; // output collection name (for shell usage)
var semester = "20161"; // desired semester

// code
db = db.getSiblingDB(database);

var map = function() {
  for (var i in this.classes) {
    var class_ = this.classes[i];
    for (var j in class_.teachers) {
      var teacher = class_.teachers[j];
      emit(teacher, 1);
    }
  }
};

var reduce = function(key, values) {
  return Array.sum(values);
};

var options = { query: { semester: semester }, out: output };

db.moita.mapReduce(map, reduce, options);
db[output].find().sort({ value: -1 }).limit(20).forEach(printjson);
