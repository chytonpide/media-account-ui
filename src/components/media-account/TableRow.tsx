import * as React from "react";
import { MediaAccount } from "../../screens/media-account/ListPage";
import { Link } from "react-router-dom";

export default class TableRow extends React.Component<MediaAccount> {
  constructor(props: MediaAccount) {
    super(props);

    this.validityBadge = this.validityBadge.bind(this);
    this.eidtLink = this.eidtLink.bind(this);
    this.handleOpenAdminUrlButtonClick = this.handleOpenAdminUrlButtonClick.bind(
      this
    );
  }

  handleEditClick(event: React.MouseEvent<HTMLElement>) {}

  handleOpenAdminUrlButtonClick(adminUrl: string) {
    window.open("https://www.google.com?" + adminUrl, "_system");
  }

  private validityBadge(loginValidity: string) {
    switch (loginValidity) {
      case "VALID":
        return <span className="badge bg-success">成功</span>;
      case "NOT_VALID":
        return (
          <span className="badge text-dark bg-warning">
            ID・PWをご確認ください。
          </span>
        );
      case "FAILED":
        return <span className="badge bg-danger">エラー</span>;
    }
  }

  private eidtLink() {
    return (
      "/shops/" +
      this.props.shopId +
      "/media-accounts/" +
      this.props.id +
      "/edit"
    );
  }

  public render() {
    return (
      <tr>
        <td>{this.props.mediaName}</td>
        <td>
          {this.props.username}
          &nbsp;&nbsp;
          <span
            className="btn btn-sm btn-outline-light"
            onClick={() => {
              navigator.clipboard.writeText(this.props.username);
            }}
          >
            コピー
          </span>
        </td>
        <td>
          {this.props.password}
          {this.props.password !== null && (
            <>
              &nbsp;&nbsp;
              <span
                className="btn btn-sm btn-outline-light"
                onClick={() => {
                  navigator.clipboard.writeText(this.props.password);
                }}
              >
                コピー
              </span>
            </>
          )}
        </td>
        <td>
          {this.props.optionalDescriptor}
          {this.props.optionalDescriptor !== null && (
            <>
              &nbsp;&nbsp;
              <span
                className="btn btn-sm btn-outline-light"
                onClick={() => {
                  if (this.props.optionalDescriptor != null) {
                    navigator.clipboard.writeText(
                      this.props.optionalDescriptor
                    );
                  }
                }}
              >
                コピー
              </span>
            </>
          )}
        </td>
        <td>
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-sm btn-outline-light"
              onClick={() =>
                this.handleOpenAdminUrlButtonClick(this.props.mediaName)
              }
            >
              管理画面へ
            </button>
            <Link
              to={this.eidtLink()}
              type="button"
              className="btn btn-sm btn-outline-light"
            >
              編集
            </Link>
            <button type="button" className="btn btn-sm btn-outline-light">
              削除
            </button>
          </div>
        </td>
        <td>
          <h5>{this.validityBadge(this.props.loginValidity)}</h5>
        </td>
      </tr>
    );
  }
}
