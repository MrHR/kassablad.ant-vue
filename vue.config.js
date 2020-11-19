module.exports = {
  // devServer: {
  //   open: process.platform === 'darwin',
  //   host: '192.168.1.4',
  //   port: 3000, // CHANGE YOUR PORT HERE!
  //   https: true,
  //   hotOnly: false
  // }
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 3000, // CHANGE YOUR PORT HERE!
    https: true,
    hotOnly: false
  },
  pages: {
    app: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
      // excludeChunks: ['silent-renew-oidc']
    }
    // silentrenewoidc: {
    //   entry: 'src/silent-renew-oidc.js',
    //   template: 'public/silent-renew-oidc.html',
    //   filename: 'silent-renew-oidc.html',
    //   excludeChunks: ['app']
    // }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px'
          },
          javascriptEnabled: true
        }
      }
    }
  }
}
