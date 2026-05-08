import { useState } from "react";
import { Link, useNavigate } from "react-router";

import type { Route } from "./+types/login";
import { useFormInputs, useLocalStorage } from "../hooks";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginErrors = Partial<Record<keyof LoginFormValues, string>>;

type StoredSession = {
  email: string;
  rememberMe: boolean;
  loggedInAt: string;
};

const initialValues: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: true,
};

function validateLogin(values: LoginFormValues) {
  const errors: LoginErrors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

function buildWorkspaceName(email: string) {
  const [workspace] = email.split("@");

  if (!workspace) {
    return "My Workspace";
  }

  return `${workspace.charAt(0).toUpperCase()}${workspace.slice(1)} Workspace`;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login | TaskFlow" },
    {
      name: "description",
      content: "Sign in to access your TaskFlow workspace.",
    },
  ];
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { values, handleChange, reset } = useFormInputs(initialValues);
  const [, setSession] = useLocalStorage<StoredSession | null>(
    "taskflow-session",
    null,
  );
  const [, setWorkspace] = useLocalStorage("taskflow-active-workspace", "");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateLogin(values);
    setErrors(nextErrors);
    setSubmitError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 900);
      });

      const normalizedEmail = values.email.trim().toLowerCase();
      const nextWorkspace = buildWorkspaceName(normalizedEmail);

      setSession({
        email: normalizedEmail,
        rememberMe: values.rememberMe,
        loggedInAt: new Date().toISOString(),
      });
      setWorkspace(nextWorkspace);
      reset(initialValues);
      navigate("/");
    } catch {
      setSubmitError("We couldn't sign you in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff,_#ffffff_45%,_#f8fafc_100%)] px-4 py-10 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="hidden bg-slate-950 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm tracking-[0.22em] uppercase">
                TaskFlow
              </div>
              <div className="space-y-4">
                <h1 className="max-w-md text-4xl font-semibold leading-tight">
                  Move projects forward without losing track of the details.
                </h1>
                <p className="max-w-lg text-base leading-7 text-slate-300">
                  Manage projects, teammates, and task updates from one shared
                  workspace built for growing product teams.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold">12k+</p>
                <p className="mt-2 text-sm text-slate-300">Tasks organized</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold">128</p>
                <p className="mt-2 text-sm text-slate-300">Teams onboarded</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold">99.9%</p>
                <p className="mt-2 text-sm text-slate-300">Uptime tracked</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <div className="mx-auto flex max-w-md flex-col justify-center">
              <div className="mb-8 space-y-3">
                <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 lg:hidden">
                  TaskFlow
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                  Sign in to your workspace
                </h2>
                <p className="text-sm leading-6 text-slate-600">
                  Use any valid email and a password with at least 8 characters
                  to continue through the demo flow.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                  />
                  {errors.email ? (
                    <p className="text-sm text-rose-600">{errors.email}</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      className="text-sm font-medium text-slate-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
                  />
                  {errors.password ? (
                    <p className="text-sm text-rose-600">{errors.password}</p>
                  ) : null}
                </div>

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <input
                    name="rememberMe"
                    type="checkbox"
                    checked={values.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                  />
                  Keep me signed in on this device
                </label>

                {submitError ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    {submitError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isSubmitting ? "Signing in..." : "Login"}
                </button>
              </form>

              <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-900">
                Demo workspace preview:{" "}
                <span className="font-semibold">
                  {buildWorkspaceName(values.email.trim().toLowerCase())}
                </span>
              </div>

              <p className="mt-6 text-center text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/"
                  className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4"
                >
                  Explore the product
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
