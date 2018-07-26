module.exports = {
  devServer: {
    proxy: {
      '/': 'http://localhost:8042'
    },
  },
  babel: {
    jsx: 'm',
  }
};
