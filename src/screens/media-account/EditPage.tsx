import * as React from "react";
import ModalSpinner from "../../components/common/ModalSpinner";
import { MediaAccount } from "./MediaAccount";
import { ApiError } from "../../models/common/ApiError";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { MediaAccountData } from "./MediaAccountData";
import { MediaData } from "../media/MediaData";
import MessageBox from "../../components/common/MessageBox";
import { Message } from "../../components/common/MessageBox";
import { fetchMediaAccountData } from "./MediaAccountDataFetcher";
import { fetchMediaData } from "../media/MediaDataFetcher";

interface EditPageProps {
  shopId: string;
  mediaAccountId: string;
}

interface EditPageState {
  showLoading: boolean;
  message: Message | null;
  mediaAccount: MediaAccount;
}

interface ChangeLoginAccountData {
  username: string;
  password: string | null;
  optionalDescriptor: string | null;
}

export default class EditPage extends React.Component<
  RouteComponentProps<EditPageProps>,
  EditPageState
> {
  private shopId: number;
  private mediaAccountId: number;

  constructor(props: RouteComponentProps<EditPageProps>) {
    super(props);

    this.state = {
      showLoading: true,
      message: null,
      mediaAccount: {
        id: 0,
        shopId: 0,
        mediaId: 0,
        mediaName: "",
        username: "",
        password: "",
        adminUrl: "",
        optionalDescriptor: "",
        loginValidity: "",
      },
    };

    this.shopId = Number(this.props.match.params.shopId);
    this.mediaAccountId = Number(this.props.match.params.mediaAccountId);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleOptionalDescriptorChange = this.handleOptionalDescriptorChange.bind(
      this
    );
    this.handleChnageSaveButtonClick = this.handleChnageSaveButtonClick.bind(
      this
    );

    //this.fetchMediaAccountData = this.fetchMediaAccountData.bind(this);
    //this.fetchMediaDetailData = this.fetchMediaDetailData.bind(this);
    this.fetchChangeLoginAccountData = this.fetchChangeLoginAccountData.bind(
      this
    );
    this.hideLoadingAndRenderErrorMessageBox = this.hideLoadingAndRenderErrorMessageBox.bind(
      this
    );
  }

  handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newMediaAccount = this.state.mediaAccount;
    newMediaAccount.username = e.target.value;

    this.setState({ mediaAccount: newMediaAccount });
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newMediaAccount = this.state.mediaAccount;
    newMediaAccount.password = e.target.value;

    this.setState({ mediaAccount: newMediaAccount });
  }

  handleOptionalDescriptorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newMediaAccount = this.state.mediaAccount;
    newMediaAccount.optionalDescriptor = e.target.value;

    this.setState({ mediaAccount: newMediaAccount });
  }

  handleChnageSaveButtonClick() {
    this.setState({ showLoading: true });

    const data: ChangeLoginAccountData = {
      username: this.state.mediaAccount.username,
      password: this.state.mediaAccount.password,
      optionalDescriptor: this.state.mediaAccount.optionalDescriptor,
    };

    this.fetchChangeLoginAccountData(this.shopId, this.mediaAccountId, data)
      .then((response) => {
        if (response.ok) {
          this.props.history.push("/shops/" + this.shopId + "/media-accounts");
        } else {
          (response.json() as Promise<ApiError>).then((apiError) => {
            this.hideLoadingAndRenderErrorMessageBox(apiError.message);
          });
        }
      })
      .catch((error) => {
        this.hideLoadingAndRenderErrorMessageBox(
          "データーの保存に失敗しました。"
        );
      });
  }

  hideLoadingAndRenderErrorMessageBox(aMessage: string) {
    const message: Message = {
      body: aMessage,
      id: Math.round(new Date().getTime() / 1000),
      color: "dander",
    };

    this.setState({
      showLoading: false,
      message: message,
    });
  }

  componentDidMount() {
    fetchMediaAccountData(this.shopId, this.mediaAccountId)
      .then((mediaAccountData) => {
        return mediaAccountData;
      })
      .then((mediaAccountData) => {
        fetchMediaData(this.shopId, mediaAccountData.mediaId).then(
          (mediaDetailData) => {
            this.setState({
              showLoading: false,
              mediaAccount: {
                id: mediaAccountData.id,
                mediaId: mediaAccountData.mediaId,
                shopId: mediaAccountData.shopId,
                mediaName: mediaDetailData.name,
                adminUrl: mediaDetailData.adminUrl,
                username: mediaAccountData.username,
                password: mediaAccountData.password,
                optionalDescriptor: mediaAccountData.optionalDescriptor,
                loginValidity: mediaAccountData.loginValidity,
              },
            });
          }
        );
      })
      .catch((error) => {
        this.hideLoadingAndRenderErrorMessageBox(
          "データーの読み込みに失敗しました。"
        );
      });
  }

  fetchChangeLoginAccountData(
    shopId: number,
    mediaAccountId: number,
    data: ChangeLoginAccountData
  ): Promise<Response> {
    const url =
      "http://localhost:8082/shops/" +
      shopId +
      "/media-accounts/" +
      mediaAccountId +
      "/login-account";

    return fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public render() {
    return (
      <>
        <ModalSpinner show={this.state.showLoading}></ModalSpinner>
        <div className="container-fluid vh-100">
          <div className="row mb-2">
            <div className="col">
              {this.state.message != null && (
                <MessageBox message={this.state.message} />
              )}
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <label className="form-label">媒体名</label>
              <input
                type="text"
                className="form-control readonly"
                id="mediaName"
                value={this.state.mediaAccount.mediaName}
                readOnly
              ></input>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <label className="form-label required">ID</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={this.state.mediaAccount.username}
                onChange={this.handleUsernameChange}
              ></input>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <label className="form-label required">PW</label>
              <input
                type="text"
                className="form-control"
                id="password"
                value={this.state.mediaAccount.password}
                onChange={this.handlePasswordChange}
              ></input>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col">
              <label className="form-label">Option ID</label>
              <input
                type="text"
                className="form-control"
                id="optionalDescriptor"
                value={
                  this.state.mediaAccount.optionalDescriptor !== null
                    ? this.state.mediaAccount.optionalDescriptor
                    : ""
                }
                onChange={this.handleOptionalDescriptorChange}
              ></input>
            </div>
          </div>
          <div className="row pb-4">
            <div className="col d-grid">
              <Link
                to={"/shops/" + this.shopId + "/media-accounts"}
                type="button"
                className="btn btn-secondary"
              >
                戻る
              </Link>
            </div>
            <div className="col d-grid">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleChnageSaveButtonClick}
              >
                変更を保存
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
