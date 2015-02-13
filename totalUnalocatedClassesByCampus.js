// configuration
var database = "moita"; // database name
var output = "totalUnalocatedClassesByCampus"; // output collection name (for shell usage)
var semester = "20151"; // desired semester

// code
db = db.getSiblingDB(database);

var map = function() {
  for (var i in this.subjects) {
    var subject = this.subjects[i];
    for (var j in subject.classes) {
      var _class = subject.classes[j]; // class is a resever word. WHY?????
      for (var k in _class.timetable) {
        var time = _class.timetable[k];

        if (time.room == "AUX-ALOCAR") {
          emit(this.campus, 1);
          break;
        }
      }
    }
  }
};

var reduce = function(key, values) {
  return Array.sum(values);
};

var options = { query: { semester: semester }, out: output };

db.semesters.mapReduce(map, reduce, options);
db[output].find().forEach(printjson);
