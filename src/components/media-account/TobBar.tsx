import * as React from "react";
import { Link } from "react-router-dom";

export interface TopBarProps {
  shopId: number;
}

export default class TopBar extends React.Component<TopBarProps> {
  public render() {
    return (
      /*<div className="d-grid d-md-flex justify-content-md-end">*/
      <div>
        <Link
          to={"/shops/" + this.props.shopId + "/media-accounts/create"}
          type="button"
          className="btn btn-lg btn-secondary"
        >
          アカウント追加
        </Link>
      </div>
    );
  }
}
