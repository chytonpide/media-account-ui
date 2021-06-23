import * as React from "react";
import mediasData from "../media/mediasData.json";
import mediaAccountData from "./mediaAccountData.json";
import { MediaAccount } from "./ListPage";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import MediaSelect from "../media/FilterableSelectModal";
import { Media } from "../media/FilterableSelectModal";

interface CreatePageProps {
  shopId: string;
}

interface CreatePageState {
  showMediaSelect: boolean;
  mediaAccount: MediaAccount;
}

export default class CreatePage extends React.Component<
  RouteComponentProps<CreatePageProps>,
  CreatePageState
> {
  constructor(props: RouteComponentProps<CreatePageProps>) {
    super(props);

    this.state = {
      showMediaSelect: true,
      mediaAccount: {
        id: 0,
        shopId: 0,
        mediaId: 0,
        mediaName: "",
        username: "",
        password: "",
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
    this.handleChnageSaveButtonClick = this.handleChnageSaveButtonClick.bind(
      this
    );
    this.handleMediaSelectConfirmClick = this.handleMediaSelectConfirmClick.bind(
      this
    );
    this.handleMediaSelectCloseClick = this.handleMediaSelectCloseClick.bind(
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

  handleMediaSelectConfirmClick(media: Media) {
    this.setState({
      mediaAccount: {
        id: this.state.mediaAccount.id,
        shopId: this.state.mediaAccount.shopId,
        mediaId: media.id,
        mediaName: media.name,
        username: this.state.mediaAccount.username,
        password: this.state.mediaAccount.password,
        optionalDescriptor: this.state.mediaAccount.optionalDescriptor,
        loginValidity: "",
      },
      showMediaSelect: false,
    });
  }

  handleMediaSelectCloseClick() {
    this.setState({
      showMediaSelect: false,
    });
  }

  handleChnageSaveButtonClick() {
    console.log("send!");
  }

  /*
  componentDidMount() {
    let mediaName = "";

    mediasData.medias.forEach((mediaData) => {
      if (mediaAccountData.mediaId === mediaData.id) {
        mediaName = mediaData.name;
      }
    });

    const mediaAccount = {
      id: mediaAccountData.id,
      mediaId: mediaAccountData.mediaId,
      shopId: mediaAccountData.shopId,
      mediaName: mediaName,
      username: mediaAccountData.username,
      password: mediaAccountData.password,
      optionalDescriptor: mediaAccountData.optionalDescriptor,
      loginValidity: mediaAccountData.loginValidity,
    };

    this.setState({
      mediaAccount: mediaAccount,
    });
  }
  */

  public render() {
    const mediaOptions: any = [];

    mediasData.medias.forEach((mediaData) => {
      mediaOptions.push(
        <option key={mediaData.id} value={mediaData.id}>
          {mediaData.name}
        </option>
      );
    });

    /*
<div className="row mb-4">
          <div className="col">
            <label className="form-label">媒体名</label>
            <select className="form-select">{mediaOptions}</select>
          </div>
        </div>
    */

    return (
      <div className="container-fluid vh-100">
        <MediaSelect
          onConfirmButtonClick={this.handleMediaSelectConfirmClick}
          onCloseButtonClick={this.handleMediaSelectCloseClick}
          show={this.state.showMediaSelect}
        ></MediaSelect>
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
            <label className="form-label">PW</label>
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
              onClick={this.handleChnageSaveButtonClick}
            >
              保存
            </button>
          </div>
        </div>
      </div>
    );
  }
}
