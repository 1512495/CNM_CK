const Bluebird = require('bluebird');
const Recaptcha = require('recaptcha-v2').Recaptcha;

const RECAPTCHA_SKIP_ENABLED = false
const RECAPTCHA_SITE_KEY = '6LdJB24UAAAAABTCJiRERbKstFsIfpiLoXurkUZS'
const RECAPTCHA_SECRET_KEY = '6LdJB24UAAAAAJxqfIrY-iNxNl_tsM6XvUZYTyt1'

exports.verifyRecaptcha = (recaptchaData) => {
    if (RECAPTCHA_SKIP_ENABLED === 'true') { // For development purpose only, you need to add SKIP_ENABLED in .env
      return Bluebird.resolve();
    }
 
    return new Bluebird((resolve, reject) => {
      const recaptcha = new Recaptcha(RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY, recaptchaData);
 
      recaptcha.verify((success) => {
        if (success) {
          return resolve();
        } 
 
  reject(new Error());
      });
    });
  };