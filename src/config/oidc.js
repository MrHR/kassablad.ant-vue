export const oidcSettings = {
  authority: 'http://localhost:8000',
  clientId: 'ant-vue',
  redirectUri: 'https://localhost:3000/callback',
  // responseType: 'id_token token',
  responseType: 'code',
  // scope: 'openid profile'
  scope: 'openid profile api1',
  post_logout_redirect_uri: 'http://localhost:3000/kassablad'
}
