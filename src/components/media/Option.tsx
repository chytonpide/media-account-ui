import * as React from "react";

export interface OptionProps {
  mediaName: string;
  mediaId: number;
  selected: boolean;
  mediaAccountPresent: boolean;
  onClick: (selectedMediaId: number) => void;
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

    if (this.props.mediaAccountPresent === true) {
      style = style + "";
    }

    if (this.props.selected === true) {
      style = style + " active";
    }

    return (
      <button
        disabled={this.props.mediaAccountPresent === true ? true : false}
        type="button"
        className={style}
        onClick={() => this.handleClick(this.props.mediaId)}
      >
        {this.props.mediaName}
        {this.props.mediaAccountPresent === true && (
          <>
            &nbsp;&nbsp;<span className="badge bg-secondary">登録済</span>
          </>
        )}
      </button>
    );
  }
}
