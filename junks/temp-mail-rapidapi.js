const axios = require('axios').default;
const crypto = require('crypto');

class TempMail {
  constructor(privateKey) {
    this._privateKey = privateKey;
  }

  /**
   * @typedef {Object} MailInbox
   * @property {Object} _id
   * @property {string} _id.oid
   * @property {Object} createdAt
   * @property {number} createdAt.milliseconds
   * @property {string} mail_id
   * @property {string} mail_address_id
   * @property {string} mail_from
   * @property {string} mail_subject
   * @property {string} mail_preview
   * @property {string} mail_text_only
   * @property {string} mail_text
   * @property {string} mail_html
   * @property {number} mail_timestamp
   * @property {number} mail_attachments_count
   * @property {Object} mail_attachments
   * @property {string} error
   */

  /**
   * If mail box empty returns error. Error message;
   * There are no emails yet
   * Example return;
   *
   * { error: 'There are no emails yet' }
   *
   * @typedef {Object} Error
   * @property {string} error
   */

  /**
   * Returns all available messages inbox
   *
   * @returns {Promise<MailInbox[] | Error>}
   */
  getMail = async (hash) => {
    var options = {
      method: 'GET',
      url: `https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${hash}/`,
      headers: {
        'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com',
        'x-rapidapi-key': this._privateKey,
      },
    };

    const result = await axios.request(options);

    return result.data;
  };

  /**
   * Returns available domains
   *
   * @returns {Promise<String[]>}
   */
  domains = async () => {
    var options = {
      method: 'GET',
      url: 'https://privatix-temp-mail-v1.p.rapidapi.com/request/domains/',
      headers: {
        'x-rapidapi-host': 'privatix-temp-mail-v1.p.rapidapi.com',
        'x-rapidapi-key': this._privateKey,
      },
    };

    const result = await axios.request(options);

    return result.data;
  };

  /**
   * Generates MD5 hash from email
   * @param {string} email
   * @returns {string}
   */
  getEmailHash = (email) => {
    return crypto.createHash('md5').update(email).digest('hex');
  };

  /**
   * @typedef {Object} GenerateMail
   * @property {string} email - Created email
   * @property {string} hash - Email hash
   */

  /**
   * Generate random domain email
   * @param {string} email
   * @returns {Promise<GenerateMail>}
   */
  generateEmail = async (email) => {
    const domains = await this.domains();

    const domain = domains[Math.floor(Math.random() * domains.length)];

    const hash = crypto
      .createHash('md5')
      .update(email + domain)
      .digest('hex');

    return {
      email: email + domain,
      hash,
    };
  };
}

module.exports = TempMail;
