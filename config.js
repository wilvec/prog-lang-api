const config = {
  db: {
    host: "localhost",
    user: "admin",
    username: "admin",
    password: "admin",
    database: "inventory",
    connectTimeout: 60000,
  },
  listPerPage: 10,
  expireTime: "30m",
};

module.exports = config;
