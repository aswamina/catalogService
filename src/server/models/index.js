const { esclient, index, type } = require("../../elastic");

async function getAssemblyCatalog(req) {
  const query = {
    query: {
      match_phrase: {
        navigation_group: req.group
      }
    }
  }

  const { body: { hits } } = await esclient.search({
    from:  req.page  || 0,
    size:  req.limit || 100,
    index: index, 
    type:  type,
    body:  query
  });

  const results = hits.total.value;
  const values  = hits.hits.map((hit) => {
    return {
      id:     hit._source.id,
      business_affiliate_name:  hit._source.business_affiliate_name,
      navigation_group: hit._source.navigation_group,
      name:  hit._source.name,
      low_assembly_price:  hit._source.low_assembly_price,
      high_assembly_price:  hit._source.high_assembly_price,
      options:  hit._source.options,
    }
  });

  return {
    results,
    values
  }
}

module.exports = {
  getAssemblyCatalog
}