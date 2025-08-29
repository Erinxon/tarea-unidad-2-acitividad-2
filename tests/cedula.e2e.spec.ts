import { test, expect } from '@playwright/test';

test.describe('Validación de cédula', () => {
    test('muestra éxito con cédula válida', async ({ page }) => {
        await page.goto('/');
        const input = page.getByLabel('Cédula');

        await input.fill('40241394648'); 
        await page.getByRole('button', { name: 'Validar' }).click();

        await expect(page.getByRole('alert')).toContainText('válida');
    });

    test('muestra error con cédula inválida', async ({ page }) => {
        await page.goto('/');
        const input = page.getByLabel('Cédula');

        await input.fill('40241394641');
        await page.getByRole('button', { name: 'Validar' }).click();

        await expect(page.getByRole('alert')).toContainText('no es válida');
    });
});
