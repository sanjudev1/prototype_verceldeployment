import express from 'express';
import cors from 'cors';

const app = express();
const port = 3010;

app.use(cors());
app.use((req, res, next) => {
    const corsWhitelist = [
        'https://youtube-app-sanju-vert.vercel.app',
        'https://prototype-verceldeployment-client.vercel.app',
    ];
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    }

    next();
});
// Static data to simulate database content
const users = [
  { name: 'John Doe', age: 30 },
  { name: 'Jane Doe', age: 25 },
  { name: 'Bob Builder', age: 35 },
];

// Endpoint to simulate creating sample data (normally this would insert into a database)
app.post('/create-sample-data', (req, res) => {
  // For static data, we assume the data is already "created"
  res.status(200).send('Sample data "created" (static)');
});

// Endpoint to get users over a certain age
app.get('/get', (req, res) => {
  // Simulate a database query by filtering the static data
  const data = users.filter(user => user.age > 20);
  res.status(200).json(data);
});

app.get('/search',async(req,res)=>{
  const search = req.query.q
  const data = await fetch('https://suggestqueries.google.com/complete/search?client=firefox&q='+search)
  const response = await data.json()
  res.status(200).json(response);
}


// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
