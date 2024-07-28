import express from 'express';
const app = express();
const port = 3010;
import sql from './db.js';
import cors from 'cors';
app.use(cors());
async function createSampleData() {
  const users = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Doe', age: 25 },
    { name: 'Bob Builder', age: 35 },
  ];

  for (let user of users) {
    await sql`
        INSERT INTO users (name, age)
        VALUES (${user.name}, ${user.age})
      `;
  }
}
//post request to create sample data
app.post('/create-sample-data', async (req, res) => {
  await createSampleData();
  res.send('Sample data created');
});
app.get('/get', async (req, res) => {
  async function getUsersOver(age) {
    const users = await sql`
          select name, age
          from users
          where age > ${age}
        `;
    return users;
  }
  const data = await getUsersOver(20);
  console.log(data);
  res.send(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
