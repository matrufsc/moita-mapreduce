// configuration
var database = "moita"; // database name
var output = "totalUnallocatedClassesByCampus"; // output collection name (for shell usage)
var semester = "20161"; // desired semester

// code
db = db.getSiblingDB(database);

var map = function() {
  for (var j in this.classes) {
    var _class = this.classes[j]; // class is a reserved word. WHY?????
    for (var k in _class.timetable) {
      var time = _class.timetable[k];

      if (time.room == "AUX-ALOCAR") {
        emit(this.campus, 1);
        break;
      }
    }
  }
};

var reduce = function(key, values) {
  return Array.sum(values);
};

var options = { query: { semester: semester }, out: output };

db.moita.mapReduce(map, reduce, options);
db[output].find().forEach(printjson);
