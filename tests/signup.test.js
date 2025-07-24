import { test, expect } from "@playwright/test";
import { SignupPage } from "../pages/SignupPage";
import { DashboardPage } from "../pages/DashBoardPage";
import { LoginPage } from "../pages/LoginPage";
import dotenv from "dotenv";
dotenv.config();

const baseEmail = process.env.BASE_EMAIL;
const password = process.env.PASSWORD;

test.describe("@signup", () => {
  test("Successful signup with unique email", async ({ page }) => {
    const signup = new SignupPage(page);
    const dashboard = new DashboardPage(page);
    const uniqueEmail = `${baseEmail.split("@")[0]}+${Date.now()}@${
      baseEmail.split("@")[1]
    }`;

    await signup.navigate();
    await signup.signup(
      "TestFirst",
      "TestLast",
      uniqueEmail,
      password,
      password
    );

    expect(await signup.isSignupSuccessful()).toBeTruthy();
    await page.screenshot({
      path: `screenshots/signup-success/signup-success-${Date.now()}.png`,
    });

    await dashboard.logout();
  });

  test("Signup with same credentials should fail and show error", async ({
    page,
  }) => {
    const signup = new SignupPage(page);
    const dashboard = new DashboardPage(page);
    const uniqueEmail = `${baseEmail.split("@")[0]}+${Date.now()}@${
      baseEmail.split("@")[1]
    }`;

    await signup.navigate();
    await signup.signup(
      "TestFirst",
      "TestLast",
      uniqueEmail,
      password,
      password
    );
    expect(await signup.isSignupSuccessful()).toBeTruthy();

    await dashboard.logout();

    await signup.navigate();
    await signup.signup(
      "TestFirst",
      "TestLast",
      uniqueEmail,
      password,
      password
    );
    expect(await signup.getEmailErrorMessage()).toContain("already taken");
  });

  test("Signup, login, then logout and login again", async ({ page }) => {
    const signup = new SignupPage(page);
    const dashboard = new DashboardPage(page);
    const login = new LoginPage(page);
    const uniqueEmail = `${baseEmail.split("@")[0]}+${Date.now()}@${
      baseEmail.split("@")[1]
    }`;

    await signup.navigate();
    await signup.signup(
      "TestFirst",
      "TestLast",
      uniqueEmail,
      password,
      password
    );
    expect(await signup.isSignupSuccessful()).toBeTruthy();

    await dashboard.logout();

    await login.navigate();
    await login.login(uniqueEmail, password);
    expect(await login.isLoginSuccessful()).toBeTruthy();
  });
});
