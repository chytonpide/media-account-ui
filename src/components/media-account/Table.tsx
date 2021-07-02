import * as React from "react";
import { MediaAccount } from "../../screens/media-account/MediaAccount";
import TableRow from "./TableRow";

interface TableProps {
  mediaAccounts: MediaAccount[];
  onRowDeleteButtonClick: (mediaAccountId: number) => void;
}

export default class Table extends React.Component<TableProps> {
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
                mediaAccount={mediaAccount}
                onDeleteButtonClick={this.props.onRowDeleteButtonClick}
              ></TableRow>
            );
          })}
        </tbody>
      </table>
    );
  }
}
