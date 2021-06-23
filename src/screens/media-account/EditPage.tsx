import * as React from "react";
import mediasData from "../media/mediasData.json";
import mediaAccountData from "./mediaAccountData.json";
import { MediaAccount } from "./ListPage";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";

interface EditPageProps {
  shopId: string;
  mediaAccountId: string;
}

export default class EditPage extends React.Component<
  RouteComponentProps<EditPageProps>,
  MediaAccount
> {
  constructor(props: RouteComponentProps<EditPageProps>) {
    super(props);

    this.state = {
      id: 0,
      shopId: 0,
      mediaId: 0,
      mediaName: "",
      username: "",
      password: "",
      optionalDescriptor: "",
      loginValidity: "",
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleOptionalDescriptorChange = this.handleOptionalDescriptorChange.bind(
      this
    );
    this.handleChnageSaveButtonClick = this.handleChnageSaveButtonClick.bind(
      this
    );
  }

  handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ password: e.target.value });
  }

  handleOptionalDescriptorChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ optionalDescriptor: e.target.value });
  }

  handleChnageSaveButtonClick() {
    console.log("send");
  }

  componentDidMount() {
    let mediaName = "";
    mediasData.medias.forEach((mediaData) => {
      if (mediaAccountData.mediaId === mediaData.id) {
        mediaName = mediaData.name;
      }
    });

    this.setState({
      id: mediaAccountData.id,
      mediaId: mediaAccountData.mediaId,
      shopId: mediaAccountData.shopId,
      mediaName: mediaName,
      username: mediaAccountData.username,
      password: mediaAccountData.password,
      optionalDescriptor: mediaAccountData.optionalDescriptor,
      loginValidity: mediaAccountData.loginValidity,
    });
  }

  public render() {
    return (
      <div className="container-fluid vh-100">
        <div className="row mb-4">
          <div className="col">
            <label className="form-label">媒体名</label>
            <input
              type="text"
              className="form-control readonly"
              id="mediaName"
              value={this.state.mediaName}
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
              defaultValue=""
              value={this.state.username}
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
              defaultValue=""
              value={this.state.password}
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
              defaultValue=""
              value={
                this.state.optionalDescriptor !== null
                  ? this.state.optionalDescriptor
                  : ""
              }
              onChange={this.handleOptionalDescriptorChange}
            ></input>
          </div>
        </div>
        <div className="row pb-4">
          <div className="col d-grid">
            <Link
              to={"/shops/" + this.state.shopId + "/media-accounts"}
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
    );
  }
}
