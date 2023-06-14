if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4002;
const router = require('./router');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, (_) => {
  console.log('server listening to the port', PORT);
});
