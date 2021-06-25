import { ApiError } from "./ApiError";

export function handleApiError(response: Response) {
  if (response.status === 500) {
    const parseApiError = response.json() as Promise<ApiError>;
    parseApiError.then((apiError) => {
      throw new Error(apiError.message);
    });
  }
}
