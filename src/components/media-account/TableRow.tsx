import * as React from "react";
import { MediaAccount } from "../../components/media-account/MediaAccount";
import { Link } from "react-router-dom";

interface TableRowProps {
  mediaAccount: MediaAccount;
  onDeleteButtonClick: (mediaAccountId: number) => void;
}

export default class TableRow extends React.Component<TableRowProps> {
  constructor(props: TableRowProps) {
    super(props);

    this.validityBadge = this.validityBadge.bind(this);
    this.eidtLink = this.eidtLink.bind(this);
    this.handleOpenAdminUrlButtonClick = this.handleOpenAdminUrlButtonClick.bind(
      this
    );
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }

  handleDeleteButtonClick(mediaAccountId: number) {
    this.props.onDeleteButtonClick(mediaAccountId);
  }

  handleOpenAdminUrlButtonClick(adminUrl: string | null) {
    if (adminUrl != null) {
      console.log(adminUrl);
      window.open(adminUrl);
    }
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
      this.props.mediaAccount.shopId +
      "/media-accounts/" +
      this.props.mediaAccount.id +
      "/edit"
    );
  }

  public render() {
    return (
      <tr>
        <td>{this.props.mediaAccount.mediaName}</td>
        <td>
          {this.props.mediaAccount.username}
          &nbsp;&nbsp;
          <span
            className="btn btn-sm btn-outline-light"
            onClick={() => {
              navigator.clipboard.writeText(this.props.mediaAccount.username);
            }}
          >
            コピー
          </span>
        </td>
        <td>
          {this.props.mediaAccount.password}
          {this.props.mediaAccount.password !== null && (
            <>
              &nbsp;&nbsp;
              <span
                className="btn btn-sm btn-outline-light"
                onClick={() => {
                  navigator.clipboard.writeText(
                    this.props.mediaAccount.password
                  );
                }}
              >
                コピー
              </span>
            </>
          )}
        </td>
        <td>
          {this.props.mediaAccount.optionalDescriptor}
          {this.props.mediaAccount.optionalDescriptor !== null && (
            <>
              &nbsp;&nbsp;
              <span
                className="btn btn-sm btn-outline-light"
                onClick={() => {
                  if (this.props.mediaAccount.optionalDescriptor != null) {
                    navigator.clipboard.writeText(
                      this.props.mediaAccount.optionalDescriptor
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
                this.handleOpenAdminUrlButtonClick(
                  this.props.mediaAccount.adminUrl
                )
              }
              disabled={this.props.mediaAccount.adminUrl != null ? false : true}
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
            <button
              type="button"
              className="btn btn-sm btn-outline-light"
              onClick={() => {
                this.handleDeleteButtonClick(this.props.mediaAccount.id);
              }}
            >
              削除
            </button>
          </div>
        </td>
        <td>
          <h5>{this.validityBadge(this.props.mediaAccount.loginValidity)}</h5>
        </td>
      </tr>
    );
  }
}
