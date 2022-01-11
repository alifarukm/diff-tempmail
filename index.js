const axios = require('axios').default;

class OneSecMail {
  _url = 'https://www.1secmail.com';
  constructor(mail) {
    this._mail = mail;
  }

  mails = async () => {
    const path = `/api/v1/?action=getMessages&login=${this._mail}&domain=1secmail.com`;

    const result = await axios.get(this._url + path);

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
    const path = `/api/v1/?action=readMessage&login=${this._mail}&domain=1secmail.com&id=${id}`;

    const result = await axios.get(this._url + path);

    return result;
  };
}

module.exports = OneSecMail;
