const express = require('express');
const { check, validationResult } = require('express-validator');
const routes = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');

const Url = require('../models/Url');

//@routes POST PUBLIC api/url/shortener
//@desc   Create Short Url
routes.post(
  '/',
  [
    check('originalUrl', 'Please this field is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { originalUrl } = req.body;
    const baseUrl = config.get('baseURL');

    if (!validUrl.isUri(baseUrl))
      return res.status(404).json({ msg: 'Not Authorized' });

    if (!validUrl.isUri(originalUrl))
      return res.status(400).json({ msg: 'Please enter a valid Url' });

    try {
      let url = await Url.findOne({ originalUrl });
      if (url) return res.json(url);

      const urlCode = shortId.generate();
      const shortUrl = baseUrl + '/' + urlCode;

      url = new Url({
        urlCode,
        originalUrl,
        shortUrl,
        date: new Date()
      });

      await url.save();

      res.json(url);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Errors');
    }
  }
);

module.exports = routes;
