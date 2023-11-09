const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
