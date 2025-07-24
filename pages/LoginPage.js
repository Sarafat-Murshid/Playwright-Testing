import { test as base } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator("#Email");
    this.passwordInput = page.locator("#Password");
    this.loginButton = page.locator('button:has-text("Log In")');
    this.emailErrorMessage = page.locator(
      'span[data-valmsg-for="Email"].error-msg'
    );
    this.passwordErrorMessage = page.locator(
      'span[data-valmsg-for="Password"].error-msg'
    );
    this.wrongCredentialsErrorMessage = page.locator(
      "div.error-msg.validation-summary-errors"
    );
  }

  async navigate() {
    const identityBaseURL = base.info().project.use.identityBaseURL;
    const signinPath = process.env.SIGNIN_PATH || process.env.SIGNUP_ALT_PATH;
    await this.page.goto(`${identityBaseURL}${signinPath}`);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isLoginSuccessful() {
    const successPath = process.env.SIGNUP_SUCCESS_PATH;
    const altSuccessPath = process.env.SIGNUP_SUCCESS_ALT_PATH;
    try {
      await this.page.waitForURL(`**${successPath}`);
      return this.page.url().includes(successPath);
    } catch (e) {
      try {
        await this.page.waitForURL(`**${altSuccessPath}`);
        return this.page.url().includes(altSuccessPath);
      } catch (e) {
        return false;
      }
    }
  }

  async getErrorMessage() {
    const emailError = await this.emailErrorMessage.textContent();
    const passwordError = await this.passwordErrorMessage.textContent();
    return `${emailError} ${passwordError}`.trim();
  }

  async getWrongCredentialsErrorMessage() {
    const wrongCredentialsError =
      await this.wrongCredentialsErrorMessage.textContent();
    return `${wrongCredentialsError}`.trim();
  }

  async isEmailInputVisible() {
    return await this.emailInput.isVisible();
  }

  async isPasswordInputVisible() {
    return await this.passwordInput.isVisible();
  }

  async isSubmitButtonVisible() {
    return await this.loginButton.isVisible();
  }
}
