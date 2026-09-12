try {
  new URL('/api/auth/login');
} catch(e) {
  console.log(e.name, e.message);
}
