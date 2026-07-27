import { beforeEach, describe, expect, it } from "vitest";

import {
  createPasswordReset,
  getSession,
  getUsers,
  loginUser,
  registerUser,
  resetPassword,
  verifyPasswordResetCode,
} from "../lib/auth-storage";

describe("local authentication storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("registers a user with a hashed password and starts a session", async () => {
    const result = await registerUser({
      name: "Avery Stone",
      email: "AVERY@example.com",
      password: "Orbit123",
    });

    expect(result).toEqual({ ok: true });
    expect(getUsers()).toHaveLength(1);
    expect(getUsers()[0]).toMatchObject({
      name: "Avery Stone",
      email: "avery@example.com",
    });
    expect(getUsers()[0].passwordHash).not.toContain("Orbit123");
    expect(getSession()?.userId).toBe(getUsers()[0].id);
  });

  it("rejects duplicate accounts and incorrect login credentials", async () => {
    const account = {
      name: "Avery Stone",
      email: "avery@example.com",
      password: "Orbit123",
    };
    await registerUser(account);

    const duplicate = await registerUser(account);
    const badLogin = await loginUser(account.email, "Wrong123");

    expect(duplicate.ok).toBe(false);
    expect(badLogin.ok).toBe(false);
  });

  it("completes password recovery and replaces the old password", async () => {
    await registerUser({
      name: "Avery Stone",
      email: "avery@example.com",
      password: "Orbit123",
    });

    const recovery = await createPasswordReset("avery@example.com");
    expect(recovery.result).toEqual({ ok: true });
    expect(recovery.code).toMatch(/^\d{6}$/);

    expect((await verifyPasswordResetCode("000000")).ok).toBe(false);
    expect((await verifyPasswordResetCode(recovery.code!)).ok).toBe(true);
    expect((await resetPassword("Nebula456")).ok).toBe(true);
    expect((await loginUser("avery@example.com", "Orbit123")).ok).toBe(false);
    expect((await loginUser("avery@example.com", "Nebula456")).ok).toBe(true);
  });
});
