import * as React from "react";

export interface SearchBarProps {
  filterText: string;
  onFilterTextChange: (filterText: string) => void;
}

export default class SearchBar extends React.Component<SearchBarProps> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {};
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onFilterTextChange(e.target.value);
  }

  public render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="検索"
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
      </div>
    );
  }
}
