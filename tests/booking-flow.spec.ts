import { test, expect } from '@playwright/test';

test('Parcours complet de recherche, sélection et paiement MoMo', async ({ page }) => {
  // 1. Accès à la page d'accueil
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('LHODAC');

  // 2. Navigation vers la recherche d'hôtels
  await page.click('text=Hôtels');
  await expect(page).toHaveURL(/.*search/);

  // 3. Simulation du tunnel de réservation
  await page.goto('/booking');
  await fillTravelerFormAndAgree(page);

  // 4. Passage au paiement MoMo sandbox
  await page.click('text=Procéder au Paiement MoMo');
  await expect(page).toHaveURL(/.*checkout/);
  
  // 5. Saisie du numéro Mobile Money
  await page.fill('input[placeholder*="06"]', '065000000');
  await page.click('button:has-text("Payer maintenant")');

  // 6. Vérification de l'écran d'attente USSD
  await expect(page.locator('text=Validation USSD en cours')).toBeVisible();
});

async function fillTravelerFormAndAgree(page: any) {
  await page.fill('input[placeholder*="Neil Benn"]', 'Jean Dupont');
  await page.fill('input[placeholder*="+242"]', '065000000');
  await page.fill('input[placeholder*="neil@example.com"]', 'jean@example.com');
  await page.click('input[type="checkbox"]'); // Acceptation CGV
  await page.click('text=Continuer vers le récapitulatif');
}