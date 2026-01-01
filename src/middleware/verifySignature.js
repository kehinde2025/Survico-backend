export default (req, res, next) => {
  if (req.headers["x-signature"] !== process.env.CALLBACK_SECRET)
    return res.sendStatus(403);
  next();
};
