import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import { threadId } from "worker_threads";
import "./ModalSpinner.css";

export interface ModalSpinnerProps {
  show: boolean;
}

export default class ModalSpinner extends React.Component<ModalSpinnerProps> {
  private modalElement: React.RefObject<HTMLDivElement>;

  constructor(props: ModalSpinnerProps) {
    super(props);
    this.modalElement = React.createRef();
  }

  public render() {
    if (this.props.show === false) {
      const el = this.modalElement.current;
      if (el != null) {
        setTimeout(() => (el.style.display = "none"), 350);
      }
    }

    if (this.props.show === true) {
      const el = this.modalElement.current;
      if (el != null) {
        el.style.display = "block";
      }
    }
    /*
    if (this.props.show === false) {
      style = style + " not-showing";
    }*/
    /*style={{ opacity: this.props.show ? "1" : "0" }}*/
    return (
      <div
        ref={this.modalElement}
        className="modal-spinner-container"
        style={{ opacity: this.props.show ? "1" : "0" }}
      >
        <div className="modal-spinner-spinner"></div>
      </div>
    );
  }
}
