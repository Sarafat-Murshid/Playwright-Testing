import { test as base } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dropdownToggle = page.locator("#dropdownMenuButtonProfile");
    this.logoutButton = page.locator('a.dropdown-item:has-text("Sign Out")');
  }

  async logout() {
    await this.dropdownToggle.waitFor({ state: "visible" });
    await this.dropdownToggle.click();
    await this.logoutButton.waitFor({ state: "visible" });
    await this.logoutButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
