"use client";
import { useRef, useState } from "react";
import { setPassword } from "@/utils/api-client";
import { isApiError } from "@/utils/type-guards";

export default function UpdateForm() {
  const [errorMessage, setErrorMessage] = useState(""); // State for the error message

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const formData = new FormData(event.currentTarget);
    const password = formData.get("new_password")?.toString() || "";
    const result = await setPassword(password);

    if (!password) {
      setErrorMessage("Password is required");
      return;
    }

    if (isApiError(result)) {
      setErrorMessage(result.message || unexpectedError);
    } else {
      setErrorMessage("Successfully changed password");
      // TODO: clear the form
      //event.currentTarget.reset();
    }
  };

  return (
    <>
      <p>Sätta lösenordet</p>
      <form onSubmit={handleSubmit}>
        <input
          id="new_password"
          name="new_password"
          type="password"
          required
          aria-label="new password"
        />
        <button type="submit">Send</button>
      </form>
      {errorMessage && <p className=".error">{errorMessage}</p>}
    </>
  );
}
