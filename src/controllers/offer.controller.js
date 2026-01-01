import Offer from "../models/Offer.js";
export const getOffers = async (_, res) => res.json(await Offer.find());
