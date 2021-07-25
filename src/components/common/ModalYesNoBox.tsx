import * as React from "react";
import { Modal, Button } from "react-bootstrap";

export interface ModalYesNoBoxProps {
  show: boolean;
  message: string;
  onYesButtonClick: (event: void) => void;
  onNoButtonClick: (event: void) => void;
}

export default class ModalYesNoBox extends React.Component<ModalYesNoBoxProps> {
  constructor(props: ModalYesNoBoxProps) {
    super(props);

    this.handleYesButtonClick = this.handleYesButtonClick.bind(this);
    this.handleNoButtonClick = this.handleNoButtonClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
  }

  handleCloseButtonClick() {
    this.props.onNoButtonClick();
  }

  handleYesButtonClick() {
    this.props.onYesButtonClick();
  }

  handleNoButtonClick() {
    this.props.onNoButtonClick();
  }
  public render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleCloseButtonClick}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-navy-dark text-light">
          <Modal.Title>確認</Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={this.handleCloseButtonClick}
          ></button>
        </Modal.Header>
        <Modal.Body className="bg-navy-dark text-light">
          <div className="container">
            <div className="row">
              <div className="col">{this.props.message}</div>
            </div>
            <div className="row mt-4">
              <div className="col d-grid">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleYesButtonClick}
                >
                  はい
                </button>
              </div>
              <div className="col d-grid">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleNoButtonClick}
                >
                  いいえ
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-navy-dark text-light"></Modal.Footer>
      </Modal>
    );
  }
}
