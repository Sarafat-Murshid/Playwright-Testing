# Playwright Testing Guide

This project uses [Playwright](https://playwright.dev/) for automated browser testing of [eventbookings.com](https://www.eventbookings.com). Follow these steps to set up, run, and understand the tests.

---

## 1. Clone the Repository

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

```sh
npx install playwright
```

---

## 4. Configure Environment Variables

Create the `.env` file in the project root. Copy these into that file:

```properties
BASE_EMAIL=testuser@gmail.com
PASSWORD=Test@1234
SIGNUP_PATH=/auth/signup?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fwww.eventbookings.com%252Fb%252Fmember%26client_id%3Dwebapp%26nonce%3Db4a33dd99f267b1608ee%26state%3D047d8057f22531a94275b451f31d2a%26scope%3Doffline_access%2520email%2520profile%2520IdentityServerApi%2520openid%26code_challenge%3D6SUrUH0hfvriBQ1tWfW-VPQPKz_zBYEXzJc9IN0563A%26code_challenge_method%3DS256
SIGNUP_ALT_PATH=/auth/signup
SIGNIN_PATH=/auth/signin?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fwww.eventbookings.com%252Fb%252Fmember%26client_id%3Dwebapp%26nonce%3Db4a33dd99f267b1608ee%26state%3D047d8057f22531a94275b451f31d2a%26scope%3Doffline_access%2520email%2520profile%2520IdentityServerApi%2520openid%26code_challenge%3D6SUrUH0hfvriBQ1tWfW-VPQPKz_zBYEXzJc9IN0563A%26code_challenge_method%3DS256
SIGNIN_ALT_PATH=/auth/signin
SIGNUP_SUCCESS_PATH=/b/member/account
SIGNUP_SUCCESS_ALT_PATH=/b/member/account?signup=success&st=5
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
