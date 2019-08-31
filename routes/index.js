const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

//@route GET PUBLIC /:code
//@Redirect to OriginalUrl
router.get('/:code', async (req, res) => {
  try {
    let url = await Url.findOne({ urlCode: req.params.code });
    if (!url) return res.status(404).json({ msg: 'Url not found' });

    const UpdateUrlTable = {
      clicks: url.clicks + 1
    };

    url = await Url.findByIdAndUpdate(
      url._id,
      {
        $set: UpdateUrlTable
      },
      {
        new: false
      }
    );

    res.redirect(url.originalUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json('Server error');
  }
});

module.exports = router;
