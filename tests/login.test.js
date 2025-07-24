import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashBoardPage";
import dotenv from "dotenv";
dotenv.config();

test.describe("@login", () => {
  test.describe("Positive Login Tests @positive", () => {
    test("Login page loads and all form elements are visible", async ({
      page,
    }) => {
      const login = new LoginPage(page);
      await login.navigate();
      expect(await login.isEmailInputVisible()).toBeTruthy();
      expect(await login.isPasswordInputVisible()).toBeTruthy();
      expect(await login.isSubmitButtonVisible()).toBeTruthy();
    });

    test("Login with valid credentials", async ({ page }) => {
      const login = new LoginPage(page);
      const dashboard = new DashboardPage(page);

      await login.navigate();
      await login.login(process.env.BASE_EMAIL, process.env.PASSWORD);
      expect(await login.isLoginSuccessful()).toBeTruthy();
      await page.screenshot({
        path: `screenshots/login-success/login-success-${Date.now()}.png`,
      });

      await dashboard.logout();
    });
  });

  test.describe("Negative Login Tests @negative", () => {
    test("Login with empty form", async ({ page }) => {
      const login = new LoginPage(page);
      await login.navigate();
      await login.login("", "");
      await page.waitForSelector("#Email-error", {
        timeout: 3000,
      });
      expect(await login.getErrorMessage()).toContain("required");
    });

    test("Login with invalid email format", async ({ page }) => {
      const login = new LoginPage(page);
      await login.navigate();
      await login.login("invalid-email", "somepass");
      expect(await login.getErrorMessage()).toContain("valid email");
    });

    test("Login with wrong password", async ({ page }) => {
      const login = new LoginPage(page);
      await login.navigate();
      await login.login(process.env.BASE_EMAIL, "wrongpassword");
      expect(await login.getWrongCredentialsErrorMessage()).toContain(
        "Email or password is wrong"
      );
    });

    test("Login with a non-existing user", async ({ page }) => {
      const login = new LoginPage(page);
      await login.navigate();
      await login.login("nonexistinguser@example.com", "somepass");
      expect(await login.getWrongCredentialsErrorMessage()).toContain(
        "Email or password is wrong"
      );
    });

    test("Data-driven login tests", async ({ page }) => {
      const testData = [
        { email: "invalid@test", password: "pass", shouldFail: true },
        { email: "test@example.com", password: "wrongpass", shouldFail: true },
        {
          email: process.env.BASE_EMAIL,
          password: process.env.PASSWORD,
          shouldFail: false,
        },
      ];

      const login = new LoginPage(page);

      for (const data of testData) {
        await login.navigate();
        await login.login(data.email, data.password);

        if (data.shouldFail) {
          expect(await login.getWrongCredentialsErrorMessage()).toContain(
            "Email or password is wrong"
          );
        } else {
          await page.waitForNavigation({
            url: "**/b/member/account",
            waitUntil: "load",
          });
          expect(await login.isLoginSuccessful()).toBeTruthy();
        }
      }
    });
  });
});
