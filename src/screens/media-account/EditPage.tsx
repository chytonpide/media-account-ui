import * as React from "react";
import ModalSpinner from "../../components/common/ModalSpinner";
import { MediaAccount } from "./MediaAccount";
import { ApiError } from "../common/ApiError";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { MediaAccountData } from "./MediaAccountData";
import { MediaData } from "../media/MediaData";
import MessageBox from "../../components/common/MessageBox";
import { fetchMediaAccountData } from "./MediaAccountDataFetcher";
import { fetchMediaData } from "../media/MediaDataFetcher";

interface EditPageProps {
  shopId: string;
  mediaAccountId: string;
}

interface EditPageState {
  showLoading: boolean;
  errorMessage: string | null;
  errorMessageId: number | null;
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
      errorMessage: null,
      errorMessageId: null,
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
    this.hideLoadingAndrenderErrorMessageBox = this.hideLoadingAndrenderErrorMessageBox.bind(
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
            this.hideLoadingAndrenderErrorMessageBox(apiError.message);
          });
        }
      })
      .catch((error) => {
        this.hideLoadingAndrenderErrorMessageBox(
          "データーの保存に失敗しました。"
        );
      });
  }

  hideLoadingAndrenderErrorMessageBox(message: string) {
    this.setState({
      showLoading: false,
      errorMessage: message,
      errorMessageId: Math.round(new Date().getTime() / 1000),
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
        this.hideLoadingAndrenderErrorMessageBox(
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
              {this.state.errorMessage != null &&
                this.state.errorMessageId != null && (
                  <MessageBox
                    messageId={this.state.errorMessageId}
                    message={this.state.errorMessage}
                    color={"danger"}
                  />
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
