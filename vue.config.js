const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/eterna/' // Remplacez 'eterna' par le nom de votre repository GitHub
    : '/',
});
