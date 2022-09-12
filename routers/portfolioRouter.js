const express = require('express');
const SAMPLE_PORTFOLIO = require('../data/portfolio');
const Portfolio = require('../models/Portfolio');
const expressAsyncHandler = require('express-async-handler');

const portfolioRouter = express.Router();

/** API ROUTE TO INSERT SEEDS INTO DATABASE **/
portfolioRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdStudents = await Portfolio.insertMany(SAMPLE_PORTFOLIO);
    res.send({ message: "Uploaded successfully" });
  })
);

/** ROUTE TO READ A PORTFOLIO (via risk score) **/
portfolioRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const portfolio = await Portfolio.findOne({
      riskScore: id
    });

    /**VALIDATE ID PARAMS */
    if (!portfolio) {
      return res.status(400).send({ message: "Portfolio does not exist" });
    }

    res.status(200).send({
      message: "success",
      data: portfolio
    });
  })
);

/** ROUTE TO READ ALL PORTFOLIO. **/
portfolioRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    /** GET ALL PORTFOLIO DATA **/
    const portfolios = await Portfolio
    .find({ })
    .sort({ riskScore: 1 });

    res.status(200).send({
      message: "success",
      data: portfolios
    });
  })
);

module.exports = portfolioRouter;