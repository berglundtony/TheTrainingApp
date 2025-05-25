import {
  unexpectedError,
  networkOrUnexpectedError,
  loginFailed,
} from "@/constants";
import ApiError from "@/classes/api-error";
import { isApiError } from "./type-guards";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function setPassword(password) {
  try {
    const res = await fetch(`${baseUrl}/api/set-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const result = await res.json();

    if (!res.ok) {
      if (result && isApiError(result)) {
        if (result.show404) {
          return ApiError.fromError(404);
        }

        if (result.message) {
          return ApiError.fromError(result.status_code, result.message);
        }
      }

      // Fallback if API didn't return structured error
      return ApiError.fromError(res.status, "Unexpected error");
    }

    return result.id;
  } catch {
    return ApiError.fromError(500, "Network or unexpected error");
  }
}

export async function login(email, password) {
  try {
    const res = await fetch(`${baseUrl}/api/login-route`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (!res.ok) {
      if (result && isApiError(result)) {
        if (result.show404) {
          return ApiError.fromError(404);
        }

        if (result.message) {
          return ApiError.fromError(result.status_code, result.message);
        }
      }

      // Fallback if API didn't return structured error
      return ApiError.fromError(res.status, unexpectedError);
    }

    return result.id;
  } catch (error) {
    // TODO: Use DEBUG-flag from context
    /* DEBUG && */ console.error(loginFailed, error);
    return ApiError.fromError(500, networkOrUnexpectedError);
  }
}

export async function logout() {
  const response = await fetch("/api/logout-route", {
    method: "POST",
  });

  const result = await response.json();

  if (!response.ok) {
    return { message: result.message || "Unexpected error" };
  }

  return result;
}

export async function forgotPassword(email) {
  try {
    const res = await fetch(`${baseUrl}/api/forgot-password-route`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();

    if (!res.ok) {
      if (result && isApiError(result)) {
        if (result.show404) {
          return ApiError.fromError(404);
        }

        if (result.message) {
          return ApiError.fromError(result.status_code, result.message);
        }
      }

      // Fallback if API didn't return structured error
      return ApiError.fromError(res.status, "Unexpected error");
    }

    return result.id;
  } catch {
    return ApiError.fromError(500, "Network or unexpected error");
  }
}

//TODO: create logout function
