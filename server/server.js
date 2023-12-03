const express = require('express');
const { createClient } = require('@libsql/client');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
}); 

const publickey = "-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwnNhpl/IoxX+Z98easVt
LNgGvhfae5aAcbCJvOxipEktmp8XSyqLKtLp2N4pr+P13AhIjwiR2jNd4Cl2mQsW
Zp1SXx08fsTzKZz1qsbETe3rxlx5/DV0qMe+B1W1ocHa7XjMx4sa8z0RebVTU39U
zAJ238HF0hKAYLH8a/zSQGU6FSdM2ojh5ujp3XXvixklhkgo7FSLJyBCdsx0pM0/
UIWwo2s7qY4Jgq2oyLpnZuJvzGz1XVwjcKjVeTawrgSN3MQ7XJgxVvj6UtlxNlXY
Nh4t7Ien+2CJJO0GaDm0L54N7GCCgjjzBoPrwJbMKk3xYlRRo9mzoCtDSwjHGQO0
1wIDAQAB
-----END PUBLIC KEY-----"

app.use(express.json()); 

app.post('/add', async (req, res) => {
  try {
    const { streakDays, streakValue } = req.body;  
    if (!streakDays || !streakValue) {
      return res.status(400).json({ error: 'Both streakDays and streakValue are required' });
    } 
    const query = 'INSERT INTO streaks (streakDays, streakValue) VALUES (?, ?)';
    const rs = await client.execute(query, [streakDays, streakValue]);
    res.json({ success: true, message: 'Streak inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.get('/example_users', async (req, res) => {
//   try {
//     const rs = await client.execute('SELECT * FROM example_users');
//     res.json(rs.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }); 

// app.post('/example_users', async (req, res) => {
//   try {
//     const { uid, email } = req.body;
//     await client.execute('INSERT INTO example_users (uid, email) VALUES (?, ?)', [uid, email]);
//     res.json({ message: 'User added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// async function fetchDataFromDatabase() {
//   try {
//     const rs = await client.execute("select * from example_users");
//     // console.log("Columns:", rs.columns);
//     // console.log("First row:", rs.rows[0]);
//     // console.log("Second row:", rs.rows[1]);
//     // Process the results or perform additional actions
//   } catch (e) {
//     console.error("Error fetching data:", e);
//   }
// }

// Call the async function
// fetchDataFromDatabase();

