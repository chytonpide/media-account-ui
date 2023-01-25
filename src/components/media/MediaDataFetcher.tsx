import { MediaData } from "./MediaData";
import { MediaListData } from "./MediaListData";

const origin = "http://localhost:8082";

const mediasDataStub = {
    medias: [
        {
            mediaId: 1,
            name: "매체1",
            mediaCode: "lvg",
            url: "https://abc.com",
            adminUrl: "https://admin.abc.com",
            keyword: "らぶぎゃらりー",
            ordering: 0,
            mediaAccountPresent: true,
            createdDtm: "2021-07-01 22:29:50",
            modifiedDtm: "2021-07-02 16:52:36",
        },
        {
            mediaId: 2,
            name: "매체2",
            mediaCode: "dj",
            url: "https://abc.com",
            adminUrl: "https://admin.abc.com",
            keyword: "でりへるじゃぱん",
            ordering: 1,
            mediaAccountPresent: true,
            createdDtm: "2021-07-01 22:29:50",
            modifiedDtm: "2021-07-02 16:52:36",
        },
        {
            mediaId: 3,
            name: "매체3",
            mediaCode: "fj",
            url: "https://abc.com",
            adminUrl: "https://admin.abc.com",
            keyword: "でりへるじゃぱん",
            ordering: 1,
            mediaAccountPresent: false,
            createdDtm: "2021-07-01 22:29:50",
            modifiedDtm: "2021-07-02 16:52:36",
        },
    ],
};

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

    return Promise.resolve(mediasDataStub);
    /*
  return fetch(url).then((response) => {
    return response.json() as Promise<MediaListData>;
  });*/
}
