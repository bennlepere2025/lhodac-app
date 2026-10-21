import { redirect } from 'next/navigation';

// ❌ À ÉVITER (le catch intercepte la redirection de Next.js)
try {
  // ... code ...
  redirect('/dashboard');
} catch (error) {
  console.error(error);
}

// ✅ CORRECT (la redirection est exécutée en dehors du catch)
let shouldRedirect = false;
try {
  // ... votre logique métier ...
  shouldRedirect = true;
} catch (error) {
  console.error(error);
}

if (shouldRedirect) {
  redirect('/dashboard');
}