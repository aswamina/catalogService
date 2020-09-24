const elastic = require("./elastic");
const server  = require("./server");
const data    = require("./data");
                require("dotenv").config();

(async function main() {
  const isElasticReady = await elastic.checkConnection();

  if (isElasticReady) {
    const elasticIndex = await elastic.esclient.indices.exists({index: elastic.index});
    if (!elasticIndex.body) {
      await elastic.createIndex(elastic.index);
      const indexError = elastic.getIndexError();
      if (!indexError) {
        await elastic.setAssemblyCatalogMapping();
        await data.populateDatabase()
      }
      // elastic.esclient.count({index: elastic.index, type: elastic.type}, function(err,resp,status) {
      //   console.log("resp = ", resp);
      // });
    }
  }
  server.start();
})();