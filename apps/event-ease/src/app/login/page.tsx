"use client";

import { signup, login } from "./actions";
import { Button, Form, TextField, Logo } from "@event-ease/ui";
import { useState, useRef } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState<"login" | "signup" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleLogin = async () => {
    if (!formRef.current) return;
    setLoading("login");
    const formData = new FormData(formRef.current);
    await login(formData);
  };

  const handleSignup = async () => {
    if (!formRef.current) return;
    setLoading("signup");
    const formData = new FormData(formRef.current);
    await signup(formData);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className="min-h-dvh bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Form.Root ref={formRef} onSubmit={handleFormSubmit} className="w-full max-w-sm sm:max-w-md space-y-18">
        <Logo variant="large" />
        <div className="text-center space-y-6 sm:space-y-6">
          <div className="space-y-4">
            <TextField
              controlProps={{
                placeholder: "Email",
                required: true,
                type: "email",
                className: "h-11 sm:h-12 text-base",
              }}
              name="email"
            />
            <TextField
              controlProps={{
                placeholder: "Password",
                required: true,
                type: "password",
                className: "h-11 sm:h-12 text-base",
              }}
              name="password"
            />
          </div>

          <div className="space-y-4 pt-2">
            <Button
              variant="primary"
              className="w-full h-11 sm:h-12 text-base font-medium"
              disabled={loading !== null}
              type="submit"
            >
              Log In
            </Button>
            <Button
              onClick={handleSignup}
              variant="secondary"
              className="w-full h-11 sm:h-12 text-base font-medium"
              disabled={loading !== null}
              type="button"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Form.Root>
    </div>
  );
}
