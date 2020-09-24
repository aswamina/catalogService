const elastic = require("../elastic");
const products  = require("./westelm.json");

const esAction = {
  index: {
    _index: elastic.index,
    _type: elastic.type
  }
};

/**
 * @function populateDatabase
 * @returns {void}
 */

async function populateDatabase() {

  const docs = [];

  for (const product of products) {
    docs.push(esAction);
    docs.push(product);
  }

  return elastic.esclient.bulk({ body: docs });
}

module.exports = {
  populateDatabase
};