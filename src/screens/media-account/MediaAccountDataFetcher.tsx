import { MediaAccountData } from "./MediaAccountData";
import { MediaAccountListData } from "./MediaAccountListData";

const origin = "http://localhost:8082";

export function fetchMediaAccountData(
  shopId: number,
  mediaAccountId: number
): Promise<MediaAccountData> {
  const url = origin + "/shops/" + shopId + "/media-accounts/" + mediaAccountId;
  /*const url = "/shops/" + this.props.shopId + "/media-accounts"*/

  return fetch(url).then((response) => {
    return response.json() as Promise<MediaAccountData>;
  });
}

export function fetchMediaAccountListData(
  shopId: number
): Promise<MediaAccountListData> {
  const url = origin + "/shops/" + shopId + "/media-accounts";
  /*const url = "/shops/" + this.props.shopId + "/media-accounts"*/

  return fetch(url).then((response) => {
    return response.json() as Promise<MediaAccountListData>;
  });
}

export function fetchDeleteMediaAccount(
  shopId: number,
  mediaAccountId: number
): Promise<Response> {
  const url = origin + "/shops/" + shopId + "/media-accounts/" + mediaAccountId;

  return fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json",
    },
  });
}
