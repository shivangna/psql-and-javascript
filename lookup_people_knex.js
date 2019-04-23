
const settings = require("./settings"); // settings.json

const knex = require("knex") ({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
})

const nameToSearch = process.argv[2];
 //console.log(nameToSearch)



knex
  .from('famous_people')
  .select('*')
  .where('first_name', 'Paul')
  .asCallback((err,res) => {
    if (err) {
      console.log("error:", err)
    } else {
      listFamousPerson(res)
      knex.destroy();
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