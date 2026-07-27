export type AuthFieldErrors = Partial<
  Record<"name" | "email" | "password" | "confirmPassword" | "code", string>
>;

export function validateEmail(email: string) {
  if (!email.trim()) return "Enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
  return "";
}

export function validatePassword(password: string) {
  if (!password) return "Enter your password.";
  if (password.length < 8) return "Use at least 8 characters.";
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    return "Include an uppercase letter, a lowercase letter, and a number.";
  }
  return "";
}

export function validateRegistration(values: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const errors: AuthFieldErrors = {};
  if (values.name.trim().length < 2) errors.name = "Enter at least 2 characters.";
  const emailError = validateEmail(values.email);
  const passwordError = validatePassword(values.password);
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
}
