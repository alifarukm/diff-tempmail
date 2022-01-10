const https = require('https');

class OneSecMail {
  constructor(mail) {
    this._mail = mail;
  }

  mails = async () => {
    const options = {
      hostname: 'www.1secmail.com',
      port: 443,
      path: `/api/v1/?action=getMessages&login=${this._mail}&domain=1secmail.com`,
      method: 'GET',
    };

    const result = await this._request(options, {});
    return result;
  };

  getAddress = () => {
    return this._mail + '@1secmail.com';
  };

  /**
   * Do a request with options provided.
   *
   * @param {Object} options
   * @param {Object} data
   * @return {Promise} a promise of request
   */
  mailDetail = async (id) => {
    const options = {
      hostname: 'www.1secmail.com',
      port: 443,
      path: `/api/v1/?action=readMessage&login=${this._mail}&domain=1secmail.com&id=${id}`,
      method: 'GET',
    };

    const result = await this._request(options, {});
    return result;
  };

  /**
   * Do a request with options provided.
   *
   * @param {Object} options
   * @param {Object} data
   * @return {Promise} a promise of request
   */
  _request(options, data) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        let responseBody = '';

        res.on('data', (chunk) => {
          responseBody += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(responseBody));
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.end();
    });
  }
}

module.exports = OneSecMail;
