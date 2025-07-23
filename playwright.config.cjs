const { devices } = require("@playwright/test");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  use: {
    baseURL: "https://www.eventbookings.com",
    identityBaseURL: "https://identity.eventbookings.com",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: "Chromium", use: { browserName: "chromium" } },
    { name: "Firefox", use: { browserName: "firefox" } },
    { name: "Mobile Chrome", use: devices["Pixel 5"] },
  ],
  retries: 1,
  timeout: 100000,
  reporter: [["html", { open: "never" }]],
};
