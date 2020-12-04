global.fetch = require("node-fetch");

export const config = {
    url: process.env.URL,
    projectId: process.env.PROJECT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    clientId: process.env.CLIENT_ID,
    locale: 'pl_PL',
}

