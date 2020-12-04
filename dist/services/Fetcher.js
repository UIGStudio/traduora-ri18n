"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fetcher {
    constructor(config) {
        this.login = async () => {
            const response = await fetch(this.authUrl(), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "grant_type": "client_credentials",
                    "client_id": this.config.clientId,
                    "client_secret": this.config.clientSecret
                })
            });
            const data = await response.json();
            if (data) {
                return {
                    accessToken: data.access_token,
                    expiresIn: data.expires_in,
                    tokenType: data.token_type,
                };
            }
            throw Error(`Cannot login: ${response.statusText}`);
        };
        this.fetchLocale = async (locale, token) => {
            console.log(this.projectUrl(locale));
            const response = await fetch(this.projectUrl(locale), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'Authorization': `Bearer ${token}`
                },
            });
            return await response.json();
        };
        this.projectUrl = (locale) => {
            return `${this.config.url}projects/${this.config.projectId}/exports?locale=${locale}&format=jsonnested`;
        };
        this.authUrl = () => {
            return `${this.config.url}auth/token`;
        };
        this.config = config;
    }
}
exports.default = Fetcher;
//# sourceMappingURL=Fetcher.js.map