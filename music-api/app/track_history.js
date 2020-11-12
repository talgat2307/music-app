const router = require('express').Router();
const TrackHistory = require('../model/TrackHistory');
const User = require('../model/User');

router.post('/', async (req, res) => {

  const token = req.get('Authorization');
  if (!token) {
    return res.status(401).send({ error: 'No token presented' });
  }

  const user = await User.findOne({ token });
  if (!user) {
    return res.status(401).send({ error: 'Wrong token' });
  }

  try {
    const trackHistory = new TrackHistory({
      ...req.body,
      user: user.id,
    });
    await trackHistory.save();
    res.send(trackHistory);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;