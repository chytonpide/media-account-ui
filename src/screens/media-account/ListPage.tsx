import React, { Component } from "react";
import mediasData from "../media/mediasData.json";
import mediaAccountsData from "./mediaAccountsData.json";
import Table from "../../components/media-account/Table";
import TopBar from "../../components/media-account/TobBar";

interface ListPageProps {
  shopId: number;
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

export interface MediaAccounts {
  mediaAccounts: MediaAccount[];
}

export default class ListPage extends Component<ListPageProps, MediaAccounts> {
  constructor(props: ListPageProps) {
    super(props);

    this.state = {
      mediaAccounts: [],
    };
  }

  componentDidMount() {
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
  }

  render() {
    return (
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
    );
  }
}
