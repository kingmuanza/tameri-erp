module.exports = {
    apps: [
        {
            name: "tameri-front",
            script: "serve",
            env: {
                PM2_SERVE_PATH: "./tameri-front/dist/tameri-front",
                PM2_SERVE_PORT: "8080",
                PM2_SERVE_SPA: "true",
                PM2_SERVE_HOMEPAGE: "/index.html"
            }
        },
        {
            name: "tameri-front-admin",
            script: "serve",
            env: {
                PM2_SERVE_PATH: "./tameri-front-admin/dist/tameri",
                PM2_SERVE_PORT: "5000",
                PM2_SERVE_SPA: "true",
                PM2_SERVE_HOMEPAGE: "/index.html"
            } 
        },
        {
            name: "tameri-back",
            script: "./server.js",
            cmd: "./tameri-back",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
}