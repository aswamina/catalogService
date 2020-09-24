const { Client } = require("@elastic/elasticsearch");
                   require("dotenv").config();
const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient   = new Client({ node: elasticUrl });
const index      = "product_assembly_catalog";
const type       = "product_assembly_catalog";
let   indexError = false;
/**
 * @function createIndex
 * @returns {void}
 * @description Creates an index in ElasticSearch.
 */
async function createIndex(index) {
  try {
    await esclient.indices.create({ index });
    console.log(`Created index ${index}`);
  } catch (err) {
    indexError = true;
    console.log(`An error occurred while creating the index ${index}:`);
    console.log(err);
  }
}

function getIndexError() {
  return indexError
}

/**
 * @function setAssemblyCatalogMapping,
 * @returns {void}
 * @description Sets the assembly catalog mapping to the database.
 */
async function setAssemblyCatalogMapping () {
  try {
    const schema = {
      id: {
        type: "integer"
      },
      business_affiliate_name: {
        type: "text"
      },
      navigation_group: {
        type: "text"
      },
      name: {
        type: "text"
      },
      low_assembly_price: {
        type: "integer"
      },
      high_assembly_price: {
        type: "integer"
      },
      options: {
        type: "object"
      }
    };
  
    await esclient.indices.putMapping({ 
      index, 
      type,
      include_type_name: true,
      body: { 
        properties: schema 
      } 
    })
    
    console.log("Assembly Catalog mapping created successfully");
  
  } catch (err) {
    console.error("An error occurred while setting the Assembly Catalog mapping:");
    console.error(err);
  }
}
/**
 * @function checkConnection
 * @returns {Promise<Boolean>}
 * @description Checks if the client is connected to ElasticSearch
 */
function checkConnection() {
  return new Promise(async (resolve) => {
    console.log("Checking connection to ElasticSearch...");
    let isConnected = false;
    while (!isConnected) {
      try {
        await esclient.cluster.health({});
        console.log("Successfully connected to ElasticSearch");
        isConnected = true;
      // eslint-disable-next-line no-empty
      } catch (_) {
      }
    }
    resolve(true);
  });
}

module.exports = {
  esclient,
  setAssemblyCatalogMapping,
  checkConnection,
  createIndex,
  index,
  type,
  getIndexError
};