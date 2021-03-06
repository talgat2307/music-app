const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const Album = require('../model/Album');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  let query;
  if (req.query.artist) query = { artist: req.query.artist };
  try {
    const album = await Album.find(query).
      sort({ released_date: 'desc' }).
      populate('artist');
    res.send(album);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await Album.findById(req.params.id).populate('artist');
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const album = new Album(req.body);
  if (req.file) {
    album.image = req.file.filename;
  }

  try {
    await album.save();
    res.send(album);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;