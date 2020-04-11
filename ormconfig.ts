require("dotenv").config();

module.exports = {
    "type": "mariadb",
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || 3306,
    "charset": "utf8mb4",
    "username": process.env.DB_USER || "root",
    "password": process.env.DB_PASS || "1112",
    "database": process.env.DB_NAME || "kakao",
    "entities": [process.env.ENTITYPATH || "dist/src/modules/**/*.entity.js"],
    "synchronize": true,
    "dropSchema" : process.env.DROPSCHEMA || false,
  }