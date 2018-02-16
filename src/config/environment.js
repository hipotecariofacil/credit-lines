export default {
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || "/var/run/mysqld/mysqld.sock",
  DB_NAME: process.env.DB_NAME || "hipopo",
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || 'hipotecariofacil.auth0.com'
}
