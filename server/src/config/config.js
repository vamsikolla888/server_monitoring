const config = {
  limit: 50,
  page: 1,
  sortfield: "created",
  direction: "desc",
  elasticUrl: process.env.ELASTIC_URL || "http://localhost:9200",
  mongoUrl: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/documentupload",
}

export default config;