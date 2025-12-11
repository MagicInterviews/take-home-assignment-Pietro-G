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
    <div className="min-h-dvh bg-white flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
      <Form.Root ref={formRef} onSubmit={handleFormSubmit} className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 min-w-0">
        <div className="flex justify-center">
          <Logo variant="large" className="text-blue-600 [&_svg]:!text-blue-600 [&_span]:!text-blue-600" />
        </div>
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="space-y-4 w-full">
            <TextField
              size="md"
              controlProps={{
                placeholder: "Email",
                required: true,
                type: "email",
                className: "w-full sm:h-12",
              }}
              name="email"
            />
            <TextField
              size="md"
              controlProps={{
                placeholder: "Password",
                required: true,
                type: "password",
                className: "w-full sm:h-12",
              }}
              name="password"
            />
          </div>

          <div className="space-y-4 pt-2 w-full">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:h-12 min-w-0 px-2 sm:px-4 whitespace-nowrap"
              disabled={loading !== null}
              type="submit"
            >
              Log In
            </Button>
            <Button
              onClick={handleSignup}
              variant="secondary"
              size="md"
              className="w-full sm:h-12 min-w-0 px-2 sm:px-4 whitespace-nowrap"
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
