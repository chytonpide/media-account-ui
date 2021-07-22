import * as React from "react";
import "./ButtonStyleOption.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export interface OptionProps {
  displayComponent: React.ReactElement;
  itemId: number;
  selected: boolean;
  disabled: boolean;
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

    if (this.props.disabled === true) {
      style = style + "";
    }

    if (this.props.selected === true) {
      style = style + " active";
    }
    /*
    let itemName = "";

    this.props.displayTexts.forEach((text) => {
      itemName = itemName + "  " + text;
    });
    <FontAwesomeIcon icon={faChevronRight} />
    <span className="horizental-bordered-item">デリヘルじゃぱん</span>
    <span className="horizental-last-bordered-item">abcdefg</span>*/
    return (
      <button
        disabled={this.props.disabled === true ? true : false}
        type="button"
        className={style}
        onClick={() => this.handleClick(this.props.itemId)}
      >
        {this.props.displayComponent}
      </button>
    );
  }
}
