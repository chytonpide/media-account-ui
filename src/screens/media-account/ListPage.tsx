import React, { Component } from "react";
//import mediasData from "../media/mediasData.json";
//import mediaAccountsData from "./mediaAccountsData.json";
import Table from "../../components/media-account/Table";
import TopBar from "../../components/media-account/TobBar";
import ModalSpinner from "../../components/common/ModalSpinner";
import { RouteComponentProps } from "react-router-dom";
import { ApiError } from "../common/ApiError";
import { MediaAccount } from "./MediaAccount";
import {
  fetchMediaAccountListData,
  fetchDeleteMediaAccount,
} from "./MediaAccountDataFetcher";
import { fetchMediaListData } from "../media/MediaDataFetcher";
import ModalConfirm from "../../components/common/ModalConfirm";

interface ListPageProps {
  shopId: string;
}

interface ListPageState {
  mediaAccounts: MediaAccount[];
  showLoading: boolean;
  showDeleteConfirm: boolean;
}

export default class ListPage extends Component<
  RouteComponentProps<ListPageProps>,
  ListPageState
> {
  private shopId: number;
  private selectedMediaAccountIdForDeleting: number;
  constructor(props: RouteComponentProps<ListPageProps>) {
    super(props);
    this.shopId = Number(this.props.match.params.shopId);
    this.selectedMediaAccountIdForDeleting = 0;
    this.state = {
      showLoading: true,
      showDeleteConfirm: false,
      mediaAccounts: [],
    };

    this.handleMediaAccountDeleteButtonClick = this.handleMediaAccountDeleteButtonClick.bind(
      this
    );
    this.handleDeleteYesButtonClick = this.handleDeleteYesButtonClick.bind(
      this
    );
    this.handleDeleteNoButtonClick = this.handleDeleteNoButtonClick.bind(this);
  }

  componentDidMount() {
    Promise.all([
      fetchMediaAccountListData(this.shopId),
      fetchMediaListData(this.shopId),
    ])
      .then(([mediaAccountListData, mediaListData]) => {
        const loadedMediaAccounts: MediaAccount[] = [];

        mediaAccountListData.mediaAccounts.forEach(
          (mediaAccountData, index) => {
            let mediaName = "";
            let mediaAdminUrl: string | null = "";

            mediaListData.medias.forEach((mediaData) => {
              if (mediaAccountData.mediaId === mediaData.mediaId) {
                mediaName = mediaData.name;
                mediaAdminUrl = mediaData.adminUrl;
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
        console.log("データーの読み込みに失敗しました。");
      });
  }

  handleDeleteYesButtonClick() {
    this.setState({
      showDeleteConfirm: false,
      showLoading: true,
    });

    fetchDeleteMediaAccount(this.shopId, this.selectedMediaAccountIdForDeleting)
      .then((response) => {
        if (response.ok) {
          const newMediaAccounts: MediaAccount[] = [];
          this.state.mediaAccounts.forEach((mediaAccount) => {
            if (mediaAccount.id !== this.selectedMediaAccountIdForDeleting) {
              newMediaAccounts.push(mediaAccount);
            }
          });
          this.setState({
            mediaAccounts: newMediaAccounts,
            showLoading: false,
          });
        } else {
          (response.json() as Promise<ApiError>).then((apiError) => {
            //this.hideLoadingAndrenderErrorMessageBox(apiError.message);
          });
        }
      })
      .catch((error) => {
        //
      });
  }

  handleDeleteNoButtonClick() {
    this.setState({ showDeleteConfirm: false });
  }

  handleMediaAccountDeleteButtonClick(mediaAccountId: number) {
    this.selectedMediaAccountIdForDeleting = mediaAccountId;
    this.setState({ showDeleteConfirm: true });
  }

  render() {
    return (
      <>
        <ModalConfirm
          show={this.state.showDeleteConfirm}
          message={
            "アカウントを削除しますか？アカウントを削除するとこのアカウントを使っている全ての自動更新設定が削除されます。"
          }
          onYesButtonClick={this.handleDeleteYesButtonClick}
          onNoButtonClick={this.handleDeleteNoButtonClick}
        ></ModalConfirm>
        <ModalSpinner show={this.state.showLoading}></ModalSpinner>
        <div className="container-fluid vh-100">
          <div className="row pt-3">
            <div className="col">
              <TopBar shopId={this.shopId}></TopBar>
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
