import { ApiError } from "./ApiError";

export function handleApiError(response: Response) {
  if (response.status === 500) {
    const parseApiError = response.json() as Promise<ApiError>;
    parseApiError.then((apiError) => {
      if (apiError.message.length == 0) {
        throw new Error("エラーが発生しました。");
      } else {
        throw new Error(apiError.message);
      }
    });
  }
}
