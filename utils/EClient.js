const { Client, HttpConnection } = require("@elastic/elasticsearch");

export default class EClient {
  async #connectToElasticsearch() {
    const username = process.env.elasticUsername;
    const pswd = process.env.elasticPassword;

    return new Client({
      node: "https://cscloud8-115.lnu.se/",
      Connection: HttpConnection,
      auth: {
        username: username,
        password: pswd,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async getObject() {
    return Object.freeze(await this.#connectToElasticsearch());
  }
}
