

module.exports = function() {
  if (process.env.NODE === 'production') {
    throw new Error('Please do not use this in production.');
  }
};
