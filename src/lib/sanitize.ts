export function sanitize(str: string): string {
  return str
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 2000);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}
