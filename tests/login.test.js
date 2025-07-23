import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashBoardPage";
import dotenv from "dotenv";
dotenv.config();

test.describe("@login", () => {
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

  test("Login with empty form", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login("", "");
    expect(await login.getErrorMessage()).toBeTruthy();
  });

  test("Login with invalid email format", async ({ page }) => {
    const login = new LoginPage(page);
    await login.navigate();
    await login.login("invalid-email", "somepass");
    expect(await login.getErrorMessage()).toContain("valid email");
  });
});
