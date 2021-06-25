import React, { Component } from "react";
//import mediasData from "../media/mediasData.json";
//import mediaAccountsData from "./mediaAccountsData.json";
import Table from "../../components/media-account/Table";
import TopBar from "../../components/media-account/TobBar";
import ModalSpinner from "../../components/common/ModalSpinner";
import { ApiError } from "../common/ApiError";
import { handleApiError } from "../common/HandleApiError";
import { MediaDetailListData } from "../media/MediaDetailListData";
import { MediaAccountData } from "./MediaAccountData";
import { MediaAccountListData } from "./MediaAccountListData";

interface ListPageProps {
  shopId: number;
}

interface ListPageState {
  mediaAccounts: MediaAccount[];
  showLoading: boolean;
}

export interface MediaAccount {
  id: number;
  shopId: number;
  mediaId: number;
  mediaName: string;
  username: string;
  password: string;
  optionalDescriptor: string | null;
  adminUrl: string | null;
  loginValidity: string;
}

export default class ListPage extends Component<ListPageProps, ListPageState> {
  constructor(props: ListPageProps) {
    super(props);

    this.state = {
      showLoading: true,
      mediaAccounts: [],
    };

    this.fetchMediaAccountListData = this.fetchMediaAccountListData.bind(this);
    this.fetchMediaDetailListData = this.fetchMediaDetailListData.bind(this);
    this.handleMediaAccountDeleteButtonClick = this.handleMediaAccountDeleteButtonClick.bind(
      this
    );
  }

  componentDidMount() {
    Promise.all([
      this.fetchMediaAccountListData(),
      this.fetchMediaDetailListData(),
    ])
      .then(([mediaAccountListData, mediaDetailListData]) => {
        const loadedMediaAccounts: MediaAccount[] = [];

        mediaAccountListData.mediaAccounts.forEach(
          (mediaAccountData, index) => {
            let mediaName = "";
            let mediaAdminUrl: string | null = "";

            mediaDetailListData.mediaDetails.forEach((mediaDetail) => {
              if (mediaAccountData.mediaId === mediaDetail.id) {
                mediaName = mediaDetail.name;
                mediaAdminUrl = mediaDetail.adminUrl;
              }
            });

            loadedMediaAccounts.push({
              id: mediaAccountData.id,
              shopId: mediaAccountData.shopId,
              mediaId: mediaAccountData.mediaId,
              mediaName: mediaName,
              username: mediaAccountData.username,
              password: mediaAccountData.password,
              optionalDescriptor: mediaAccountData.optionalDescriptor,
              adminUrl: mediaAdminUrl,
              loginValidity: mediaAccountData.loginValidity,
            });
          }
        );

        this.setState({
          mediaAccounts: loadedMediaAccounts,
          showLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchMediaAccountListData(): Promise<MediaAccountListData> {
    const url = "http://localhost:8082/shops/1/media-accounts";
    /*const url = "/shops/" + this.props.shopId + "/media-accounts"*/

    return fetch(url)
      .then((response) => {
        return response.json() as Promise<MediaAccountListData>;
      })
      .catch((error) => {
        throw new Error("データーの読み込みに失敗しました。");
      });
  }

  fetchMediaDetailListData(): Promise<MediaDetailListData> {
    const url = "http://localhost:8082/media-details";

    return fetch(url)
      .then((response) => {
        return response.json() as Promise<MediaDetailListData>;
      })
      .catch((error) => {
        throw new Error("データーの読み込みに失敗しました。");
      });
  }

  handleMediaAccountDeleteButtonClick(mediaAccountId: number) {
    console.log(mediaAccountId);
  }

  render() {
    return (
      <>
        <ModalSpinner show={this.state.showLoading}></ModalSpinner>
        <div className="container-fluid vh-100">
          <div className="row pt-3">
            <div className="col">
              <TopBar shopId={this.props.shopId}></TopBar>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col">
              <Table
                mediaAccounts={this.state.mediaAccounts}
                onRowDeleteButtonClick={
                  this.handleMediaAccountDeleteButtonClick
                }
              ></Table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
