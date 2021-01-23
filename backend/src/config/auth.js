const JWT_SECRET = process.env.JWT_SECRET;
// 60seconds * 60minutes = 1hour
const JWT_EXPIRES_SECONDS = 60 * 60;

const validateConfig = () => {
  if (!JWT_SECRET || !JWT_SECRET.length) {
    console.log('JWT_SECRET variable is not specified.');
    console.log('Stopping.');
    process.exit(1);
  }
};

validateConfig();

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_SECONDS,
};
