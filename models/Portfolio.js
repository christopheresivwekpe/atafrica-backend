const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const portfolioSchema = new Schema(
  {
    riskScore: { type: Number, default: 0, required: true },
    nigeriaStocks: { type: Number, default: 0, required: true },
    foriegnStocks: { type: Number, default: 0, required: true },
    techStocks: { type: Number, default: 0, required: true },
    emergingStocks: { type: Number, default: 0, required: true },
    nigeriaBonds: { type: Number, default: 0, required: true },
    foriegnBonds: { type: Number, default: 0, required: true },
    commodities: { type: Number, default: 0, required: true },
    realEstate: { type: Number, default: 0, required: true },
    tBills: { type: Number, default: 0, required: true },
    alternative: { type: Number, default: 0, required: true }
  },
  {
    timestamps: true,
  }
);
const Portfolio = model('Portfolio', portfolioSchema);
module.exports = Portfolio;
