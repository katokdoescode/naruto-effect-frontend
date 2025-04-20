import { expect, test } from '@playwright/test';

// REGULAR USER
test.describe
	.parallel('User', () => {
		test.beforeEach(async ({ page }) => {
			await page.goto('/');
			await page.waitForURL('/');
		});
		test('index page has expected h1', async ({ page }) => {
			await expect(page.locator('h1')).toBeVisible();
		});

		test('can close cookies modal, and it will not appear then', async ({
			page,
		}) => {
			await expect(page.locator('.cookie')).toBeVisible();

			await page.click('.cookie button');
			await expect(page.locator('.cookie')).not.toBeVisible();

			await page.reload();

			expect(
				await page.evaluate(() => {
					return localStorage.getItem('agree-with-cookies') === 'true';
				}),
			).toBeTruthy();

			await expect(page.locator('.cookie')).not.toBeVisible();
		});

		test('can switch language', async ({ page }) => {
			await expect(page.locator('html')).toHaveAttribute('lang', 'en');
			await page.locator('#change-lang-panel-second').click();
			await expect(page.locator('html')).toHaveAttribute('lang', 'ru');

			expect(
				await page.evaluate(() => {
					return localStorage.getItem('userLang') === 'ru';
				}),
			).toBeTruthy();
		});

		test('can navigate to practice page', async ({ page }) => {
			const practiceLocator = page.locator('header nav ul > li').first();
			await practiceLocator.waitFor();
			const practiceName = await practiceLocator.textContent();
			await practiceLocator.click();

			await expect(page.locator('h1')).toHaveText(practiceName);
		});

		test('can navigate to participant page', async ({ page }) => {
			const participantLocator = page.locator('aside nav ul > li').first();
			const participantName = await participantLocator.textContent();
			await participantLocator.click();

			await expect(page.locator('h1')).toHaveText(participantName);
		});

		test('cv page opens', async ({ page }) => {
			await page.waitForURL('/', { waitUntil: 'domcontentloaded' });
			await page.goto('/cv');
			await expect(page.locator('h1')).toHaveText('Curriculum vitae');
		});

		test('can toggle theme', async ({ page }) => {
			let colorSchemeCSS;
			let localStorageValue;

			async function setValues() {
				[colorSchemeCSS, localStorageValue] = await page.evaluate(() => {
					return [
						window.getComputedStyle(document.body).colorScheme,
						localStorage.getItem('colorScheme'),
					];
				});
			}

			// Set 'light'
			await page.locator('.theme-switch').selectOption({ index: 0 });
			await page.locator('.theme-switch').selectOption({ index: 0 });
			await setValues();
			expect(colorSchemeCSS).toBe('light');
			expect(localStorageValue).toBe('light');

			// Set 'dark'
			await page.locator('.theme-switch').selectOption({ index: 1 });
			await page.locator('.theme-switch').selectOption({ index: 1 });
			await setValues();
			expect(colorSchemeCSS).toBe('dark');
			expect(localStorageValue).toBe('dark');

			// Set 'auto'
			await page.locator('.theme-switch').selectOption({ index: 2 });
			await setValues();
			expect(localStorageValue).toBe('auto');
		});
	});
