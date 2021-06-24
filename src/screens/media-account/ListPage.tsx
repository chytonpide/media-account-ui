import React, { Component } from "react";
import mediasData from "../media/mediasData.json";
//import mediaAccountsData from "./mediaAccountsData.json";
import Table from "../../components/media-account/Table";
import TopBar from "../../components/media-account/TobBar";
import ModalSpinner from "../../components/common/ModalSpinner";
import { ApiError } from "../common/ApiError";

interface ListPageProps {
  shopId: number;
}

interface ListPageState {
  mediaAccounts: MediaAccount[];
  showLoading: boolean;
}

interface MediaAccountData {
  id: number;
  shopId: number;
  mediaId: number;
  username: string;
  password: string;
  optionalDescriptor: string | null;
  loginValidity: string;
}

interface MediaAccountListData {
  mediaAccounts: MediaAccountData[];
}

export interface MediaAccount {
  id: number;
  shopId: number;
  mediaId: number;
  mediaName: string;
  username: string;
  password: string;
  optionalDescriptor: string | null;
  loginValidity: string;
}

export default class ListPage extends Component<ListPageProps, ListPageState> {
  constructor(props: ListPageProps) {
    super(props);

    this.state = {
      showLoading: true,
      mediaAccounts: [],
    };

    this.fetchMediaAccounts = this.fetchMediaAccounts.bind(this);
  }

  componentDidMount() {
    this.fetchMediaAccounts().then((mediaAccountListData) => {
      const loadedMediaAccounts: MediaAccount[] = [];

      console.log(mediaAccountListData);

      mediaAccountListData.mediaAccounts.forEach((mediaAccountData, index) => {
        let mediaName = "";

        mediasData.medias.forEach((mediaData, index) => {
          if (mediaAccountData.mediaId === mediaData.id) {
            mediaName = mediaData.name;
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
          loginValidity: mediaAccountData.loginValidity,
        });
      });

      this.setState({
        mediaAccounts: loadedMediaAccounts,
      });
    });

    /*
    const loadedMediaAccounts: MediaAccount[] = [];

    mediaAccountsData.mediaAccounts.forEach((mediaAccountData, index) => {
      let mediaName = "";

      mediasData.medias.forEach((mediaData, index) => {
        if (mediaAccountData.mediaId === mediaData.id) {
          mediaName = mediaData.name;
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
        loginValidity: mediaAccountData.loginValidity,
      });
    });

    this.setState({
      mediaAccounts: loadedMediaAccounts,
    });
    */

    setTimeout(() => {
      this.setState({
        showLoading: false,
      });
    }, 2000);
  }

  fetchMediaAccounts(): Promise<MediaAccountListData> {
    const url = "http://localhost:8082/shops/1/media-accounts";
    /*const url = "/shops/" + this.props.shopId + "/media-accounts"*/

    return fetch(url).then((response) => {
      if (response.ok) {
        return response.json() as Promise<MediaAccountListData>;
      } else {
        throw response;
      }
    });

    /*
    let response = await fetch(
      "/shops/" + this.props.shopId + "/media-accounts"
    );

    if (response.ok) {
      const body: MediaAccountListData = await response.json();
    } else {
      const body: ApiError = await response.json();
    }
    */
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
              <Table mediaAccounts={this.state.mediaAccounts}></Table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
