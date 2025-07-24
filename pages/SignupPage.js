import { test as base } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class SignupPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator("#FirstName");
    this.lastNameInput = page.locator("#LastName");
    this.emailInput = page.locator("#Email");
    this.passwordInput = page.locator("#Password");
    this.confirmPasswordInput = page.locator("#ConfirmPassword");
    this.signupButton = page.locator("#btnSubmit");
    this.errorMessage = page.locator(".error-msg");
    this.emailErrorMessage = this.page.locator(
      'span[data-valmsg-for="Email"].error-msg'
    );
  }

  async navigate() {
    const identityBaseURL = base.info().project.use.identityBaseURL;
    const signupPath = process.env.SIGNUP_PATH || process.env.SIGNUP_ALT_PATH;
    await this.page.goto(`${identityBaseURL}${signupPath}`);
    await this.firstNameInput.waitFor({ state: "visible" });
  }

  async signup(firstName, lastName, email, password, confirmPassword) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.signupButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async isSignupSuccessful() {
    const successPath = process.env.SIGNUP_SUCCESS_PATH;
    const altSuccessPath = process.env.SIGNUP_SUCCESS_ALT_PATH;

    try {
      await this.page.waitForURL(`**${successPath}`);
      return this.page.url().includes(successPath);
    } catch {
      try {
        await this.page.waitForURL(`**${altSuccessPath}`);
        return this.page.url().includes(altSuccessPath);
      } catch {
        return false;
      }
    }
  }

  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: "visible" });
    return await this.errorMessage.textContent();
  }

  async getEmailErrorMessage() {
    await this.emailErrorMessage.waitFor({ state: "visible" });
    return await this.emailErrorMessage.textContent();
  }
}
