// configuration
var database = "moita"; // database name
var output = "timeslotsByDay"; // output collection name (for shell usage)
var semester = "20161"; // desired semester

// code
db = db.getSiblingDB(database);

var map = function() {
  for (var _class of this.classes) {
    for (var time of _class.timetable) {
      for (var slot of time.time) {
        if (slot == '1100' || slot =='1330') {
          emit(time.day, _class.occupied + _class.special);
        }
      }
    }
  }
};

var reduce = function(key, values) {
  return Array.sum(values);
};

var options = { query: { semester: semester }, out: output };

db.moita.mapReduce(map, reduce, options);
db[output].find().sort({ value: -1 }).forEach(printjson);
