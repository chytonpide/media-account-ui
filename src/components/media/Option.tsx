import * as React from "react";

export interface OptionProps {
  itemName: string;
  itemId: number;
  selected: boolean;
  onClick: (selectedItemId: number) => void;
}

export default class Option extends React.Component<OptionProps> {
  constructor(props: OptionProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(itemId: number) {
    this.props.onClick(itemId);
  }

  public render() {
    let style = "list-group-item list-group-item-action";
    if (this.props.selected === true) {
      style = style + " active";
    }

    return (
      <button
        type="button"
        className={style}
        aria-current="true"
        onClick={() => this.handleClick(this.props.itemId)}
      >
        {this.props.itemName}
      </button>
    );
  }
}
