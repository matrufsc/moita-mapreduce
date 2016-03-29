// configuration
var database = "moita"; // database name
var output = "totalSubjectsByCampus"; // output collection name (for shell usage)
var semester = "20161"; // desired semester

// code
db = db.getSiblingDB(database);

var map = function() {
  emit(this.campus, 1);
};

var reduce = function(key, values) {
  return Array.sum(values);
};

var options = { query: { semester: semester }, out: output };

db.moita.mapReduce(map, reduce, options);
db[output].find().forEach(printjson);
