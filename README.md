# Playwright Testing Guide

This project uses [Playwright](https://playwright.dev/) for automated browser testing of [eventbookings.com](https://www.eventbookings.com). Follow these steps to set up, run, and understand the tests.

---

## 1. Clone the Repository

Replace `https://github.com/Sarafat-Murshid/Playwright-Testing.git` with your GitHub repository URL:

```sh
git clone https://github.com/Sarafat-Murshid/Playwright-Testing.git
cd "Playwright Testing"
```

---

## 2. Install Node.js

Ensure Node.js (v18+) is installed:

```sh
node -v
```

Download from [nodejs.org](https://nodejs.org/) if needed.

---

## 3. Install Dependencies

Install required packages:

```sh
npm install
```

---

## 4. Configure Environment Variables

Edit the `.env` file in the project root. Example:

```properties
BASE_EMAIL=testuser@gmail.com
PASSWORD=Test@1234
SIGNUP_PATH=...
SIGNIN_PATH=...
SIGNUP_SUCCESS_PATH=...
```

Do not share sensitive credentials publicly.

---

## 5. Project Structure

- `pages/` – Page Object Models for Login, Signup, Dashboard.
- `tests/` – Test files for login and signup flows.
- `screenshots/` – Screenshots from test runs.
- `playwright-report/` – HTML test reports.
- `test-results/` – Test result metadata.

---

## 6. Playwright Configuration

See `playwright.config.cjs` for:

- Base URLs
- Browser projects (Chromium, Firefox, Mobile Chrome)
- Headless mode, viewport, retries, timeouts
- HTML reporter

---

## 7. Run the Tests

Run all tests:

```sh
npx playwright test
```

---

## 8. View Test Results

Open the HTML report:

```sh
start playwright-report\index.html
```

Or open it manually in Explorer.

---

## 9. How the Tests Work

- **Login Tests:** Valid login, empty form, invalid email.
- **Signup Tests:** Unique email signup.
- **Page Objects:** Encapsulate UI interactions.
- **Environment Variables:** Used for credentials and URLs.

---

## 10. Troubleshooting

- Check the HTML report for errors.
- Verify `.env` values.
- Ensure network access to required URLs.
- Update dependencies if needed.

---

## 11. Customizing Tests

- Change test data in `.env`.
- Add new tests in `tests/`.
- Extend page objects in `pages/`.

---

## 12. Best Practices

- Keep credentials secure.
- Use unique emails for signup.
- Review screenshots and reports for debugging.
- Use Playwright assertions for reliability.

---

**Summary:**  
Clone, install, configure `.env`, run `npx playwright test`, and review results in the HTML report. The project uses Page Object Models and environment variables for maintainable browser automation.
