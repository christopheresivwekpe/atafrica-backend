const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

/*** 
 * HEROKU URL: https://atafrica-backend.herokuapp.com/api/portfolio/ 
 * GITHUB URL: https://github.com/christopheresivwekpe/atafrica_backend
 ***/

/**ROUTERS */
const portfolioRouter = require('./routers/portfolioRouter.js');

dotenv.config();

const app = express(); 

/** ORIGINS THAT HAS ACCESS TO THE SERVER */
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://atafrica-robo-advisor.herokuapp.com',
    'https://atafrica-robo-advisor.vercel.app'
  ],
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost/atafrica';

/**CONNECT TO MONGOBD */
mongoose.connect( mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("Connected to DB"); 
});

/**ROUTES MIDDLEWARES */
app.use('/api/portfolio', portfolioRouter);

/**ERROR HANDLING */
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

/**LISTEN TO PORT */
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}...`);
});
