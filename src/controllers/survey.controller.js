import Survey from "../models/survey.js";
export const getSurveys = async (_, res) => res.json(await Survey.find());
