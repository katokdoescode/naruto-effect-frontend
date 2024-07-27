import { expect, test } from '@playwright/test';

// Don't forget to `supabase db reset` before start tests

/**
 * @param {import("@playwright/test").Page} page
 */
async function login(page) {
	await page.goto('/');
	await page.click('body');
	await page.keyboard.press('Alt+M+L');
	await expect(page.locator('.login-dialog')).toHaveAttribute('open', '');
	await page.locator('input[type=password]').fill('test');
	await page.keyboard.press('Enter');
	await expect(page.locator('.login-dialog')).not.toHaveAttribute('open', '');
}

/**
 * @param {import("@playwright/test").Page} page
 */
async function logOut(page) {
	await page.click('form[action="/api/signOut"] button[type=submit]');
}

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
			await setValues();
			expect(colorSchemeCSS).toBe('light');
			expect(localStorageValue).toBe('light');

			// Set 'dark'
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

test.describe('Hokage', () => {
	test.beforeEach(async ({ page }) => {
		await login(page);
		await page.click('.cookie button');
	});

	test('can edit main page data', async ({ page }) => {
		const contentControlPanel = page.locator('#panel-content');
		await contentControlPanel.locator('button[value=edit]').click();
		await page.locator('#contentTitleEditor').fill('Main page title');
		await contentControlPanel.locator('button[value=save]').click();
		await expect(
			page.getByRole('heading', { name: 'Main page title' }),
		).toBeVisible();
	});

	test('can edit practice', async ({ page }) => {
		await page.locator('#main-menu .links-list a').first().click();
		const contentControlPanel = page.locator('#panel-content');
		await contentControlPanel.locator('button[value=edit]').click();

		await page.locator('#practiceTitle').fill('My practice');
		await page.locator('#practiceSubtitle').fill('Short description');
		await page.locator('.editor-wrapper').click();
		await page.keyboard.press('ControlOrMeta+A');
		await page.keyboard.press('Delete');
		await page.keyboard.type('Test text');

		await contentControlPanel.locator('button[value=save]').click();

		await expect(page.locator('h1')).toHaveText('My practice');
		await expect(page.locator('#content h2')).toHaveText('Short description');
		await expect(page.locator('#content article')).toHaveText('Test text');
	});

	test('can create new practice', async ({ page }) => {
		await page.locator('a[href="/practices/create"]').click();

		const contentControlPanel = page.locator('#panel-content');
		const newPracticeTitle = `Practice ${Date.now()}`;

		await page.locator('#practiceTitle').fill(newPracticeTitle);
		await page.locator('#practiceSubtitle').fill('Short description');
		await page.locator('.editor-wrapper').click();
		await page.keyboard.type('Test text');

		await contentControlPanel.locator('button[value=save]').click();

		await expect(page.locator('h1')).toHaveText(newPracticeTitle);
		await expect(page.locator('#content h2')).toHaveText('Short description');
		await expect(page.locator('#content article')).toHaveText('Test text');
	});

	test('can delete practice', async ({ page }) => {
		await page.locator('#main-menu .links-list a').first().click();
		const currentUrl = page.url();
		const currentPath = currentUrl.slice(currentUrl.lastIndexOf('/') + 1);
		const contentControlPanel = page.locator('#panel-content');
		await contentControlPanel.locator('button[value=edit]').click();
		await contentControlPanel.locator('button[value=delete]').click();
		await page.locator('dialog[open].modal').waitFor();
		await page.locator('dialog[open].modal button').last().click();
		await page.locator('#main-menu .links-list a').first().click();
		const newCurrentUrl = page.url();
		const newCurrentPath = newCurrentUrl.slice(
			newCurrentUrl.lastIndexOf('/') + 1,
		);

		expect(currentPath !== newCurrentPath).toBe(true);
	});

	test('can publish practice', async ({ page }) => {
		const link = page.locator('#main-menu .links-list a').last();
		const href = await link.getAttribute('href');
		await link.click();
		const contentControlPanel = page.locator('#panel-content');
		await contentControlPanel.locator('button[value=edit]').click();
		await page
			.locator('#second-menu .edit-title-wrapper input[type=checkbox]')
			.click();
		await contentControlPanel.locator('button[value=save]').click();
		await expect(
			page.locator(`#main-menu .links-list a[href="${href}"]:is(.disabled)`),
		).not.toBeVisible();
	});

	test('can create new participant', async ({ page }) => {
		await page.locator('a[href="/participants/create"]').click();

		const contentControlPanel = page.locator('#panel-content');
		const newParticipantTitle = 'Radion Harvatsev';

		await page.locator('#practiceTitle').fill(newParticipantTitle);
		await page
			.locator('#practiceSubtitle')
			.fill('This is the guy who can drink beer every day');
		await page.locator('.editor-wrapper').click();
		await page.keyboard.type('Test text');

		await contentControlPanel.locator('button[value=save]').click();

		await expect(page.locator('h1')).toHaveText(newParticipantTitle);
		await expect(page.locator('#content h2')).toHaveText(
			'This is the guy who can drink beer every day',
		);
		await expect(page.locator('#content article')).toHaveText('Test text');
	});

	test('can edit participant', async ({ page }) => {
		await page.locator('a[href="/participants/radion-harvatsev"]').click();
		const contentControlPanel = page.locator('#panel-content');
		const newParticipantTitle = 'Rodion Harvatsev';

		await contentControlPanel.locator('button[value=edit]').click();

		await page.locator('#practiceTitle').fill(newParticipantTitle);
		await page
			.locator('#practiceSubtitle')
			.fill('This is the guy who can drink wine every day');
		await page.locator('.editor-wrapper').click();
		await page.keyboard.press('ControlOrMeta+A');
		await page.keyboard.press('Delete');
		await page.keyboard.type('London is a capital of the Great Britan');
		await contentControlPanel.locator('button[value=save]').click();
		await expect(page.locator('h1')).toHaveText(newParticipantTitle);
		await expect(page.locator('#content h2')).toHaveText(
			'This is the guy who can drink wine every day',
		);
		await expect(page.locator('#content article')).toHaveText(
			'London is a capital of the Great Britan',
		);
	});

	test('can publish participant', async ({ page }) => {
		await page.locator('a[href="/participants/rodion-harvatsev"]').click();
		const contentControlPanel = page.locator('#panel-content');
		await contentControlPanel.locator('button[value=edit]').click();
		await page
			.locator('#second-menu .edit-title-wrapper input[type=checkbox]')
			.click();
		await contentControlPanel.locator('button[value=save]').click();

		await logOut(page);
		const newParticipantTitle = 'Rodion Harvatsev';
		await page.locator('a[href="/participants/rodion-harvatsev"]').click();
		await expect(page.locator('h1')).toHaveText(newParticipantTitle);
		await expect(page.locator('#content h2')).toHaveText(
			'This is the guy who can drink wine every day',
		);
		await expect(page.locator('#content article')).toHaveText(
			'London is a capital of the Great Britan',
		);
	});

	test('can delete participant', async ({ page }) => {
		await page.locator('a[href="/participants/rodion-harvatsev"]').click();
		const contentControlPanel = page.locator('#panel-content');
		await contentControlPanel.locator('button[value=edit]').click();
		await contentControlPanel.locator('button[value=delete]').click();

		await page.locator('dialog[open].modal').waitFor();
		await page.locator('dialog[open].modal button').last().click();
		await expect(
			page.locator('a[href="/participants/rodion-harvatsev"]'),
		).not.toBeVisible();
	});
});
