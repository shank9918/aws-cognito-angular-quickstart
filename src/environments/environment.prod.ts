export const environment = {
  production: true,

  region: 'ap-south-1',

  identityPoolId: 'ap-south-1:382e8b81-50c0-4651-8a00-909e8c4c708e',
  userPoolId: 'ap-south-1_y6AS1g7AS',
  clientId: '483q7d79ei19i165o2fm0kumi2',

  rekognitionBucket: 'rekognition-pics',
  albumName: "usercontent",
  bucketRegion: 'ap-south-1',

  ddbTableName: 'bmc_logintrials',

  cognito_idp_endpoint: '',
  cognito_identity_endpoint: '',
  sts_endpoint: '',
  dynamodb_endpoint: '',
  s3_endpoint: '',

  fb_configs: {
    appId: '831160593749122',
    cookie: false,  // enable cookies to allow the server to access the session
    xfbml: true,  // parse social plugins on this page
    version: 'v3.0' // use graph api version 2.5
  }
};

