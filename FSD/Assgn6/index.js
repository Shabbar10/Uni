const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3002;

let people = [];  // Array to store people checked in

app.use(cors());
app.use(bodyParser.json());

// Endpoint to get the list of people
app.get('/people', (req, res) => {
  res.json(people);
});

// Endpoint to check in a person
app.post('/people', (req, res) => {
  const name = req.body.name;
  const timestamp = Date.now();  // Unique timestamp

  const newPerson = { id: timestamp, name: name };  // Use timestamp as unique id
  people.push(newPerson);  // Add to the people array

  res.status(201).json(newPerson);
});

// Endpoint to update a person's name
app.put('/people/:id', (req, res) => {
  const personId = parseInt(req.params.id);
  const updatedName = req.body.name;

  const personIndex = people.findIndex(person => person.id === personId);
  if (personIndex !== -1) {
    people[personIndex].name = updatedName;
    res.json(people[personIndex]);
  } else {
    res.status(404).send('Person not found');
  }
});

// Endpoint to check out (remove) a person
app.delete('/people/:id', (req, res) => {
  const personId = parseInt(req.params.id);
  const personIndex = people.findIndex(person => person.id === personId);

  if (personIndex !== -1) {
    people.splice(personIndex, 1);
    res.status(204).send();  // No content to send back
  } else {
    res.status(404).send('Person not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
