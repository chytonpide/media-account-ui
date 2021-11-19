import { MediaData } from "./MediaData";
import { MediaListData } from "./MediaListData";

const origin = "http://localhost:8082";

export function fetchMediaData(
  shopId: number,
  mediaId: number
): Promise<MediaData> {
  const url = origin + "/shops/" + shopId + "/medias/" + mediaId;

  return fetch(url).then((response) => {
    return response.json() as Promise<MediaData>;
  });
}

export function fetchMediaListData(shopId: number): Promise<MediaListData> {
  const url = origin + "/shops/" + shopId + "/medias";

  return fetch(url).then((response) => {
    return response.json() as Promise<MediaListData>;
  });
}
