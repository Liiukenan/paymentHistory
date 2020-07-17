module.exports = {
  root: true,
  env: {
    node: true
  },
  'globals':{
    "clientWindow":true,
    "":true,
    "showIncentiveVideoAd":true,
    "shareWechatMoments":true,
    "getUserToken":true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'on',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  }
}
