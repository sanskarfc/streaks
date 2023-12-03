const express = require('express');
const { createClient } = require('@libsql/client');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
}); 

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwnNhpl/IoxX+Z98easVt
LNgGvhfae5aAcbCJvOxipEktmp8XSyqLKtLp2N4pr+P13AhIjwiR2jNd4Cl2mQsW
Zp1SXx08fsTzKZz1qsbETe3rxlx5/DV0qMe+B1W1ocHa7XjMx4sa8z0RebVTU39U
zAJ238HF0hKAYLH8a/zSQGU6FSdM2ojh5ujp3XXvixklhkgo7FSLJyBCdsx0pM0/
UIWwo2s7qY4Jgq2oyLpnZuJvzGz1XVwjcKjVeTawrgSN3MQ7XJgxVvj6UtlxNlXY
Nh4t7Ien+2CJJO0GaDm0L54N7GCCgjjzBoPrwJbMKk3xYlRRo9mzoCtDSwjHGQO0
1wIDAQAB
-----END PUBLIC KEY-----`;

app.use(express.json()); 
app.use(cors());

app.post('/add', async (req, res) => {
  try {
    const { streakName, streakDays } = req.body;
    console.log("added streak --> ", req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    const userId = decoded.sub;
    if (!streakName || !streakDays) {
      return res.status(400).json({ error: 'Both streakName and streakDays are required' });
    }
    const streakId = uuidv4();
    const query = `INSERT INTO streaks (streak_id, streak_name, streak_day, user_id) VALUES ('${streakId}', '${streakName}', '${streakDays}', '${userId}')`;
    const rs = await client.execute(query);
    res.json({ success: true, message: 'Streak inserted successfully' }); 
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

app.get('/streaks', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    const userId = decoded.sub;
    console.log("userId --> ", userId);
    console.log("sending streak data back to frontend :]");
    const query = `SELECT streak_id, streak_name, streak_day, user_id FROM streaks WHERE user_id = '${userId}'`;
    const rs = await client.execute(query);
    const streaksData = rs.rows;
    res.json(streaksData);
  } catch (error) {
    console.error('Error fetching streaks data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/streaks/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = `SELECT streak_id, streak_name, streak_day, user_id FROM streaks WHERE user_id = '${userId}'`;
    const rs = await client.execute(query);
    const userStreaksData = rs.rows;

    res.json(userStreaksData);
  } catch (error) {
    console.error('Error fetching user streaks data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/streaks', async (req, res) => {
  try {
    const { userId, streaks } = req.body;
    if (!userId || !streaks || !Array.isArray(streaks)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const updateQueries = streaks.map(({ streak_id, streak_day }) => {
      return `UPDATE streaks SET streak_day = ${streak_day} WHERE streak_id = '${streak_id}' AND user_id = '${userId}'`;
    });
    await Promise.all(updateQueries.map((query) => client.execute(query)));
    res.json({ success: true, message: 'Streaks updated successfully' });
  } catch (error) {
    console.error('Error updating streaks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
