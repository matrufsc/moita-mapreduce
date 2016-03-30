// configuration
var database = "moita"; // database name
var output = "totalClassesByCampus"; // output collection name (for shell usage)
var semester = "20161"; // desired semester

var names = {
    'ARA': 'Araranguá',
    'BLN': 'Blumenau',
    'CBS': 'Curitibanos',
    'EaD': 'Ensino à Distância',
    'FLO': 'Florianópolis',
    'JOI': 'Joinville',
};

// code
db = db.getSiblingDB(database);

var map = function() {
  emit(this.campus, this.classes.length);
};

var reduce = function(key, values) {
  return Array.sum(values);
};

var options = { query: { semester: semester }, out: output };

db.moita.mapReduce(map, reduce, options);
db[output].find().sort({ value: -1 }).forEach(result => {
  print(`[${result._id}] ${names[result._id]}: ${result.value}`);
});
