import { MediaAccountData } from "./MediaAccountData";
import { MediaAccountListData } from "./MediaAccountListData";
import mediasData from "../media/mediasData.json";
import mediaAccountListDataStub from "./mediaAccountsData.json";

const apiOrigin = "http://localhost:8082";

export function fetchMediaAccountData(
    shopId: number,
    mediaAccountId: number
): Promise<MediaAccountData> {
    const url =
        apiOrigin + "/shops/" + shopId + "/media-accounts/" + mediaAccountId;
    /*const url = "/shops/" + this.props.shopId + "/media-accounts"*/

    return fetch(url).then((response) => {
        return response.json() as Promise<MediaAccountData>;
    });
}

export function fetchMediaAccountListData(
    shopId: number
): Promise<MediaAccountListData> {
    const url = apiOrigin + "/shops/" + shopId + "/media-accounts";
    /*const url = "/shops/" + this.props.shopId + "/media-accounts"*/

    return Promise.resolve(mediaAccountListDataStub);

    /*
  return fetch(url).then((response) => {
    return response.json() as Promise<MediaAccountListData>;
  });
  */
}

export function fetchDeleteMediaAccount(
    shopId: number,
    mediaAccountId: number
): Promise<Response> {
    const url =
        apiOrigin + "/shops/" + shopId + "/media-accounts/" + mediaAccountId;

    return fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {
            Accept: "application/json",
        },
    });
}
