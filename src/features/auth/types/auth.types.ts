export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
};

export type AuthSession = {
  userId: string;
  createdAt: string;
};

export type PasswordResetChallenge = {
  email: string;
  codeHash: string;
  codeSalt: string;
  expiresAt: string;
};

export type AuthResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
      field?: "name" | "email" | "password" | "confirmPassword" | "code";
    };
