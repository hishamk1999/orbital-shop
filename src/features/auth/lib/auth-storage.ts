import type {
  AuthResult,
  AuthSession,
  PasswordResetChallenge,
  StoredUser,
} from "../types/auth.types";

const USERS_KEY = "orbital.auth.users.v1";
const SESSION_KEY = "orbital.auth.session.v1";
const RESET_KEY = "orbital.auth.password-reset.v1";
const RESET_LIFETIME_MS = 10 * 60 * 1000;

function hasBrowserStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!hasBrowserStorage()) return fallback;

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!hasBrowserStorage()) {
    throw new Error("Browser storage is unavailable.");
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function randomHex(bytes = 16) {
  const values = new Uint8Array(bytes);
  window.crypto.getRandomValues(values);
  return Array.from(values, (value) => value.toString(16).padStart(2, "0")).join("");
}

async function hashSecret(secret: string, salt: string) {
  const bytes = new TextEncoder().encode(`${salt}:${secret}`);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (value) =>
    value.toString(16).padStart(2, "0"),
  ).join("");
}

export function getUsers() {
  return readJson<StoredUser[]>(USERS_KEY, []);
}

export function getSession() {
  return readJson<AuthSession | null>(SESSION_KEY, null);
}

export function signOut() {
  if (!hasBrowserStorage()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResult> {
  const users = getUsers();
  const email = normalizeEmail(input.email);

  if (users.some((user) => user.email === email)) {
    return {
      ok: false,
      field: "email",
      message: "An account already exists for this email. Sign in instead.",
    };
  }

  const passwordSalt = randomHex();
  const user: StoredUser = {
    id: window.crypto.randomUUID(),
    name: input.name.trim(),
    email,
    passwordSalt,
    passwordHash: await hashSecret(input.password, passwordSalt),
    createdAt: new Date().toISOString(),
  };

  writeJson(USERS_KEY, [...users, user]);
  writeJson(SESSION_KEY, { userId: user.id, createdAt: new Date().toISOString() });
  return { ok: true };
}

export async function loginUser(emailInput: string, password: string): Promise<AuthResult> {
  const email = normalizeEmail(emailInput);
  const user = getUsers().find((candidate) => candidate.email === email);

  if (!user || (await hashSecret(password, user.passwordSalt)) !== user.passwordHash) {
    return {
      ok: false,
      message: "That email and password combination does not match an account.",
    };
  }

  writeJson(SESSION_KEY, { userId: user.id, createdAt: new Date().toISOString() });
  return { ok: true };
}

export async function createPasswordReset(
  emailInput: string,
): Promise<{ result: AuthResult; code?: string }> {
  const email = normalizeEmail(emailInput);
  const userExists = getUsers().some((user) => user.email === email);

  if (!userExists) {
    return {
      result: {
        ok: false,
        field: "email",
        message: "No Orbital account was found for this email.",
      },
    };
  }

  const code = window.crypto.getRandomValues(new Uint32Array(1))[0].toString().slice(-6).padStart(6, "0");
  const codeSalt = randomHex();
  const challenge: PasswordResetChallenge = {
    email,
    codeSalt,
    codeHash: await hashSecret(code, codeSalt),
    expiresAt: new Date(Date.now() + RESET_LIFETIME_MS).toISOString(),
  };

  writeJson(RESET_KEY, challenge);
  return { result: { ok: true }, code };
}

export async function verifyPasswordResetCode(code: string): Promise<AuthResult> {
  const challenge = readJson<PasswordResetChallenge | null>(RESET_KEY, null);

  if (!challenge) {
    return { ok: false, field: "code", message: "Request a new recovery code first." };
  }

  if (new Date(challenge.expiresAt).getTime() <= Date.now()) {
    window.localStorage.removeItem(RESET_KEY);
    return { ok: false, field: "code", message: "This code has expired. Request a new one." };
  }

  if ((await hashSecret(code.trim(), challenge.codeSalt)) !== challenge.codeHash) {
    return { ok: false, field: "code", message: "That recovery code is not correct." };
  }

  return { ok: true };
}

export async function resetPassword(password: string): Promise<AuthResult> {
  const challenge = readJson<PasswordResetChallenge | null>(RESET_KEY, null);
  if (!challenge || new Date(challenge.expiresAt).getTime() <= Date.now()) {
    return { ok: false, message: "Your recovery session expired. Start again." };
  }

  const users = getUsers();
  const userIndex = users.findIndex((user) => user.email === challenge.email);
  if (userIndex === -1) {
    return { ok: false, message: "The account is no longer available." };
  }

  const passwordSalt = randomHex();
  users[userIndex] = {
    ...users[userIndex],
    passwordSalt,
    passwordHash: await hashSecret(password, passwordSalt),
  };

  writeJson(USERS_KEY, users);
  window.localStorage.removeItem(RESET_KEY);
  return { ok: true };
}
