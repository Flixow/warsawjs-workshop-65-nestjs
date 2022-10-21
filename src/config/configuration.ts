export default () => ({
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
    apiDomain: process.env.SUPERTOKENS_API_DOMAIN,
    websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN,
    apiKey: process.env.SUPERTOKENS_API_KEY,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',
  },
  db: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 5432),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
  },
});
