const catchAsync = require('../utils/catchAsync');

const PATH = './data/img';

const getImage = catchAsync(async (req, res, next) => {
  const path = `${PATH}/${req.params.entity}/${req.params.fileName}`;

  res.sendFile(path, { root: global.appRoot });
});

module.exports = {
  getImage,
};
