export const isApiError = (obj) => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "statusCode" in obj &&
    "message" in obj &&
    "show404" in obj
  );
};