import express from 'express';
import sql from './db.js';
import cors from 'cors';

const app = express();
const port = 3010;

app.use(cors());

const users = [
  { name: 'John Doe', age: 30 },
  { name: 'Jane Doe', age: 25 },
  { name: 'Bob Builder', age: 35 },
];

async function createSampleData() {
  try {
    for (let user of users) {
      await sql`
        INSERT INTO users (name, age)
        VALUES (${user.name}, ${user.age})
      `;
    }
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
}

app.post('/create-sample-data', async (req, res) => {
  try {
    await createSampleData();
    res.status(200).send('Sample data created');
  } catch (error) {
    res.status(500).send('Error creating sample data');
  }
});

app.get('/get', async (req, res) => {
  try {
    const data = await sql`
      SELECT name, age
      FROM users
      WHERE age > ${20}
    `;
    res.status(200).send(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
