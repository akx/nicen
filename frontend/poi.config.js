module.exports = {
  html: {
    title: 'Nicen',
    description: 'Nicen – makes your {C,CSS,JavaScript,Python} code look nicer.',
  },
  devServer: {
    proxy: {
      '/': 'http://localhost:8042',
    },
  },
};
