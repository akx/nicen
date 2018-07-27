module.exports = {
  html: {
    title: 'Nicen',
  },
  devServer: {
    proxy: {
      '/': 'http://localhost:8042',
    },
  },
};
