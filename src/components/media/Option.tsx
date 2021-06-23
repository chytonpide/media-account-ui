import * as React from "react";

export interface OptionProps {
  name: string;
}

export default class Option extends React.Component<OptionProps> {
  public render() {
    return (
      <button
        type="button"
        className="list-group-item list-group-item-action"
        aria-current="true"
      >
        {this.props.name}
      </button>
    );
  }
}
