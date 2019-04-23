


const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect()

const nameToSearch = process.argv[2];
// console.log(nameToSearch)


function getFamousPersonInfo (nameToSearch, cb) {
  client.query(
    'SELECT * from famous_people WHERE first_name = $1::text', [nameToSearch],
    (err, res) => {
      cb(err, res.rows)
    })
}

getFamousPersonInfo(nameToSearch,(err,res) => {
  if (err) {
    console.log(err)
  } else {
    listFamousPerson(res);
    client.end();
  }

})



function listFamousPerson(result) {
  console.log('Found ', result.length, 'person(s) by the name ', nameToSearch)
  result.forEach(function(object) {
    let position = result.indexOf(object) + 1;
    let personFirstName = object['first_name'];
    let personLastName = object['last_name'];
    let birthDate = object['birthdate'];
    console.log("- ", position, ":", personFirstName, " ", personLastName, ", ",
      "born ", birthDate)
  })
}