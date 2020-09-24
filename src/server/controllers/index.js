const model = require("../models");

async function getAssemblyCatalog(req, res) {
  const query  = req.query;
  if (!query.group) {
    res.status(422).json({
      error: true,
      data: "Missing required parameter: group"
    });
    return;
  }
  try {
    const result = await model.getAssemblyCatalog(req.query);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: "Unknown error."});
  }
}

module.exports = {
  getAssemblyCatalog
};