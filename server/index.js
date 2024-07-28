import express from 'express';
import cors from 'cors';
// Ensure you have this installed

const app = express();
const port = 3010;

const corsWhitelist = [
    'https://youtube-app-sanju-vert.vercel.app',
    'https://prototype-verceldeployment-client.vercel.app',
    'https://prototype-verceldeployment-server.vercel.app',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (corsWhitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));
app.use(express.json());

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

// Endpoint to search using external API
app.get('/search', async (req, res) => {
  try {
    const search = req.query.q;
    // if (!search) {
    //   return res.status(400).json({ error: 'Query parameter "q" is required' });
    // }
    const apiResponse = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${search}`);
    if (!apiResponse.ok) {
      throw new Error(`HTTP error! status: ${apiResponse.status}`);
    }
    const response = await apiResponse.json();
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
