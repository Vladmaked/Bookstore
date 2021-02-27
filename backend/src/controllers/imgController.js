const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');

const PATH = './data/img';
const SMALL_HEIGHT = 250;

const getImage = catchAsync(async (req, res, next) => {
  let path = PATH;

  if (req.query.size && req.query.size === 'small') {
    path += '/small';
  } else {
    path += '/original';
  }

  path += `/${req.params.fileName}`;

  res.sendFile(path, { root: global.appRoot });
});

const resizeAndSave = catchAsync(async (req, res, next) => {
  outputPath = `${PATH}/small/${req.file.filename}`;

  await sharp(req.file.path).resize({ height: SMALL_HEIGHT }).png().toFile(outputPath);

  next();
});

module.exports = {
  getImage,
  resizeAndSave,
};
