const axios = require('axios');
let urlAuth = 'http://localhost:3001';
const validateToken = '/auth/validate';
if(process.env.NODE_ENV === 'production') {
  urlAuth = 'https://hipopo-services-auth.now.sh';
}
module.exports = {
  validateToken: (token) => {
    return axios.get(urlAuth+validateToken, {
      headers: {
        Authorization: "Basic "+ token
      }
    });
  }
};
