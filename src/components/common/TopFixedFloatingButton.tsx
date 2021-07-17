import * as React from "react";
import "./TopFixedFloatingButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export interface TopFixedFloatingButtonProps {
  onClick: () => void;
  descOfButton: string;
}
//TO-DO: displayed구현
export default class TopFixedFloatingButton extends React.Component<
  TopFixedFloatingButtonProps
> {
  constructor(props: TopFixedFloatingButtonProps) {
    super(props);
  }

  public render() {
    /*<FontAwesomeIcon icon={faChevronDown} size="lg" />*/
    return (
      <div className="my-floating-button" onClick={this.props.onClick}>
        {this.props.descOfButton}
      </div>
    );
  }
}
