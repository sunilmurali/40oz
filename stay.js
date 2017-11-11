let config = require('./config');
let googleapis = require('googleapis');

let API_KEY = config.GOOGLE_API_KEY;

module.exports = ()=>{
  return {
    test: ()=>{
      console.log(googleapis);
    }
  }
};
