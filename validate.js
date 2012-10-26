var fs = require('fs');

var JSV = require('JSV').JSV;

var allSchema = JSON.parse(fs.readFileSync('tincan.schema.json', 'utf8'));

var json = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

var env = JSV.createEnvironment("json-schema-draft-03");

var schema = env.createSchema(allSchema, null, 'tcapi:special');

var schemaschema = env.findSchema("http://json-schema.org/draft-03/schema");
var schemareport = schemaschema.validate(schema);

if(schemareport.errors.length > 0) {
    console.log("Problems with schema!");
    console.log(schemareport.errors);
}


//validate a single statement or list of statements
var report = env.validate(json, {"$ref": "tcapi:special#statementpost"});

//TODO: validate length of mbox_sha1sum
//TODO: language map keys -- really funky rules!
//TODO: objectType hack for statement/substatement improvement?
//TODO: duration validation
//TODO: timestamp/stored validation
//TODO: find out if there is a better way to handle the no additional agent properties thing
//TODO: find out why minItems and maxItems aren't validating



console.log("Done validating!");
if (report.errors.length > 0) {
    console.log("Errors!");
    console.log(report.errors);
} else {
    console.log("No errors!");
}