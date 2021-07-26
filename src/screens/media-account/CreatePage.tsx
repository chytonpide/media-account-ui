import * as React from "react";
import mediasData from "../media/mediasData.json";
import ModalSpinner from "../../components/common/ModalSpinner";
import { MediaAccount } from "./MediaAccount";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { ApiError } from "../../models/common/ApiError";
import MediaSelect from "../media/ModalFilterableSelect";
import MessageBox from "../../components/common/MessageBox";
import { Message } from "../../components/common/MessageBox";
//import MediaSelect from "../../components/media/NonStateModalFilterableSelect";
import { fetchMediaAccountData } from "./MediaAccountDataFetcher";
import { fetchMediaListData } from "../media/MediaDataFetcher";
import { Media } from "../media/ModalFilterableSelect";

interface CreatePageProps {
  shopId: string;
}

interface CreateMediaAccountData {
  mediaId: number;
  username: string;
  password: string;
  optionalDescriptor: string | null;
}

interface CreatePageState {
  showLoading: boolean;
  showMediaSelect: boolean;
  message: Message | null;
  mediaAccount: MediaAccount;
}

interface CreateMediaAccountData {
  mediaId: number;
  username: string;
  password: string;
  optionalDescriptor: string | null;
}

export default class CreatePage extends React.Component<
  RouteComponentProps<CreatePageProps>,
  CreatePageState
> {
  private shopId: number;

  constructor(props: RouteComponentProps<CreatePageProps>) {
    super(props);
    this.shopId = Number(this.props.match.params.shopId);
    this.state = {
      showLoading: false,
      showMediaSelect: true,
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

    this.handleSelectMediaButtonClick = this.handleSelectMediaButtonClick.bind(
      this
    );
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleOptionalDescriptorChange = this.handleOptionalDescriptorChange.bind(
      this
    );
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleMediaSelectOkClick = this.handleMediaSelectOkClick.bind(this);
    this.handleMediaSelectCloseClick = this.handleMediaSelectCloseClick.bind(
      this
    );
    this.fetchCreateMediaAccountData = this.fetchCreateMediaAccountData.bind(
      this
    );
  }

  handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const mediaAccount = this.state.mediaAccount;
    mediaAccount.username = e.target.value;

    this.setState({ mediaAccount: mediaAccount });
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const mediaAccount = this.state.mediaAccount;
    mediaAccount.password = e.target.value;

    this.setState({ mediaAccount: mediaAccount });
  }

  handleOptionalDescriptorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const mediaAccount = this.state.mediaAccount;
    mediaAccount.optionalDescriptor = e.target.value;

    this.setState({ mediaAccount: mediaAccount });
  }

  handleSelectMediaButtonClick() {
    this.setState({
      showMediaSelect: true,
    });
  }

  handleMediaSelectOkClick(media: Media) {
    this.setState({
      mediaAccount: {
        id: this.state.mediaAccount.id,
        shopId: this.state.mediaAccount.shopId,
        mediaId: media.id,
        mediaName: media.name,
        username: this.state.mediaAccount.username,
        password: this.state.mediaAccount.password,
        optionalDescriptor: this.state.mediaAccount.optionalDescriptor,
        adminUrl: this.state.mediaAccount.adminUrl,
        loginValidity: this.state.mediaAccount.loginValidity,
      },
      showMediaSelect: false,
    });
  }

  handleMediaSelectCloseClick() {
    this.setState({
      showMediaSelect: false,
    });
  }

  handleSaveButtonClick() {
    this.setState({ showLoading: true });

    let optionalDescriptor: string | null = this.state.mediaAccount
      .optionalDescriptor;

    if (optionalDescriptor?.length === 0) {
      optionalDescriptor = null;
    }

    const data: CreateMediaAccountData = {
      mediaId: this.state.mediaAccount.mediaId,
      username: this.state.mediaAccount.username,
      password: this.state.mediaAccount.password,
      optionalDescriptor: optionalDescriptor,
    };

    this.fetchCreateMediaAccountData(this.shopId, data)
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

  fetchCreateMediaAccountData(
    shopId: number,
    data: CreateMediaAccountData
  ): Promise<Response> {
    const url = "http://localhost:8082/shops/" + shopId + "/media-accounts/";

    return fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
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
    fetchMediaListData(this.shopId).then((mediaDetailListData) => {
      mediaDetailListData.medias.forEach((mediaDetail) => {});
    });
  }

  public render() {
    const mediaOptions: any = [];

    mediasData.medias.forEach((mediaData) => {
      mediaOptions.push(
        <option key={mediaData.id} value={mediaData.id}>
          {mediaData.name}
        </option>
      );
    });

    return (
      <div className="container-fluid vh-100">
        <ModalSpinner show={this.state.showLoading}></ModalSpinner>
        <MediaSelect
          onSelectOkButtonClick={this.handleMediaSelectOkClick}
          onCloseButtonClick={this.handleMediaSelectCloseClick}
          show={this.state.showMediaSelect}
          shopId={this.shopId}
        ></MediaSelect>
        <div className="row mb-2">
          <div className="col">
            {this.state.message != null && (
              <MessageBox message={this.state.message} />
            )}
          </div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <div>
              <label className="form-label required">媒体名</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control readonly"
                  value={this.state.mediaAccount.mediaName}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleSelectMediaButtonClick}
                >
                  媒体選択
                </button>
              </div>
            </div>
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
              to={
                "/shops/" + this.props.match.params.shopId + "/media-accounts"
              }
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
              onClick={this.handleSaveButtonClick}
            >
              保存
            </button>
          </div>
        </div>
      </div>
    );
  }
}
