import * as React from "react";
import { MediaAccounts } from "../../screens/media-account/ListPage";
import TableRow from "./TableRow";

export default class Table extends React.Component<MediaAccounts> {
  public render() {
    return (
      <table className="table text-light">
        <thead>
          <tr>
            <th>媒体名</th>
            <th>ID</th>
            <th>PW</th>
            <th>OptionID</th>
            <th></th>
            <th>ログイン</th>
          </tr>
        </thead>
        <tbody>
          {this.props.mediaAccounts.map((mediaAccount, index) => {
            return (
              <TableRow
                key={index}
                shopId={mediaAccount.shopId}
                id={mediaAccount.id}
                mediaId={mediaAccount.mediaId}
                mediaName={mediaAccount.mediaName}
                username={mediaAccount.username}
                password={mediaAccount.password}
                optionalDescriptor={mediaAccount.optionalDescriptor}
                loginValidity={mediaAccount.loginValidity}
              ></TableRow>
            );
          })}
        </tbody>
      </table>
    );
  }
}
