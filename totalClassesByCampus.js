// configuration
var database = "moita"; // database name
var output = "totalClassesByCampus"; // output collection name (for shell usage)
var semester = "20151"; // desired semester

// code
db = db.getSiblingDB(database);

var map = function() {
  for (var subject in this.subjects) {
    emit(this.campus, this.subjects[subject].classes.length);
  }
};

var reduce = function(key, values) {
  return Array.sum(values);
};

var options = { query: { semester: semester }, out: output };

db.semesters.mapReduce(map, reduce, options);
db[output].find().forEach(printjson);
