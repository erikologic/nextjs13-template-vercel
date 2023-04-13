import { expect, test } from '@playwright/test';
import { set } from 'firebase/database';
import { setTimeout } from 'timers/promises';
import { getRandomChars } from './tools';
import { signupAndLogin } from './user-management';

// AS A user
// I WANT TO be able to create a 3 weekly outcomes
// SO THAT I can plan my week
test('create weekly outcomes and persist them', async ({ page }) => {
	const outcomesFixture = [
		{ hotSpot: 'Mind', outcome: 'I am a Mind weekly outcome' },
		{ hotSpot: 'Body', outcome: 'I am a Body weekly outcome' },
		{
			hotSpot: 'Relationships',
			outcome: 'I am a Relationships weekly outcome',
		},
	];

	const myEmail = `test-${getRandomChars()}@test.com`;
	const myPassword = 'password';

	await signupAndLogin(page, myEmail, myPassword);
	await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();

	{
		const outcomes = await page
			.getByRole('region', { name: 'Weekly Outcomes' })
			.getByRole('listitem');

		for await (const [
			index,
			{ hotSpot, outcome },
		] of outcomesFixture.entries()) {
			await outcomes
				.nth(index)
				.getByRole('combobox', { name: 'Hot spot' })
				.selectOption(hotSpot);
			await outcomes
				.nth(index)
				.getByPlaceholder('Enter your outcome')
				.fill(outcome);
			await outcomes.nth(index).getByRole('button', { name: 'Save' }).click();
		}

		expect(await outcomes.all()).toHaveLength(3);
	}

	await page.reload();

	{
		await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();

		const outcomes = page
			.getByRole('region', { name: 'Weekly Outcomes' })
			.getByRole('listitem');

		for await (const [
			index,
			{ hotSpot, outcome },
		] of outcomesFixture.entries()) {
			expect(
				await outcomes
					.nth(index)
					.getByRole('combobox', { name: 'Hot spot' })
					.inputValue(),
			).toEqual(hotSpot);

			expect(
				await outcomes
					.nth(index)
					.getByPlaceholder('Enter your outcome')
					.inputValue(),
			).toEqual(outcome);
		}

		expect(await outcomes.all()).toHaveLength(3);
	}
});

// AS A user
// I WANT TO be able to create a 3 daily outcomes
// SO THAT I can plan my day

test('create daily outcomes and persist them', async ({ page }) => {
	const outcomesFixture = [
		{ hotSpot: 'Emotions', outcome: 'I am a Emotions daily outcome' },
		{ hotSpot: 'Career', outcome: 'I am a Career daily outcome' },
		{ hotSpot: 'Fun', outcome: 'I am a Fun daily outcome' },
	];

	const myEmail = `test-${getRandomChars()}@test.com`;
	const myPassword = 'password';

	await signupAndLogin(page, myEmail, myPassword);
	await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();

	{
		const outcomes = await page
			.getByRole('region', { name: 'Daily Outcomes' })
			.getByRole('listitem');

		for await (const [
			index,
			{ hotSpot, outcome },
		] of outcomesFixture.entries()) {
			await outcomes
				.nth(index)
				.getByRole('combobox', { name: 'Hot spot' })
				.selectOption(hotSpot);
			await outcomes
				.nth(index)
				.getByPlaceholder('Enter your outcome')
				.fill(outcome);
			await outcomes.nth(index).getByRole('button', { name: 'Save' }).click();
		}

		expect(await outcomes.all()).toHaveLength(3);
	}

	await page.reload();

	{
		await expect(page.getByRole('heading', { name: 'Today' })).toBeVisible();

		const outcomes = page
			.getByRole('region', { name: 'Daily Outcomes' })
			.getByRole('listitem');

		for await (const [
			index,
			{ hotSpot, outcome },
		] of outcomesFixture.entries()) {
			expect(
				await outcomes
					.nth(index)
					.getByRole('combobox', { name: 'Hot spot' })
					.inputValue(),
			).toEqual(hotSpot);

			expect(
				await outcomes
					.nth(index)
					.getByPlaceholder('Enter your outcome')
					.inputValue(),
			).toEqual(outcome);
		}

		expect(await outcomes.all()).toHaveLength(3);
	}
});

// AS A user
// I WANT TO be able to create a few retro notes
// SO THAT I can save note on my day
