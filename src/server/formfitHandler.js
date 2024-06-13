const Firestore = require("@google-cloud/firestore");
const crypto = require("crypto");
const storeData = require("../services/storeData");
const loadData = require("../services/loadData")

const db = new Firestore({
  databaseId: "formfitdbs",
});

async function getHistory(request, h) {
  const allData = await loadData();
  const response = h.response({
    status: "success",
    data: allData,
  });
  response.code(200);
  return response;
}
module.exports = { getHistory };
