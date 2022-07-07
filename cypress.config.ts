import { defineConfig } from "cypress";

export default defineConfig({
    env: {
        apiKey: process.env.REACT_APP_MONGO_API_KEY,
        apiUrl: process.env.REACT_APP_MONGO_API_URL,
        baseUrl: process.env.REACT_APP_BASE_URL,
    },

    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
