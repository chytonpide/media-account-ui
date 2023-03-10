import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

interface ModalConfirmBoxProps {
  show: boolean;
  message: string;
  onConfrimButtonClick: () => void;
}

export default class ModalConfirmBox extends React.Component<
  ModalConfirmBoxProps
> {
  constructor(props: ModalConfirmBoxProps) {
    super(props);

    this.handleConfirmButtonClick = this.handleConfirmButtonClick.bind(this);
  }

  handleCloseButtonClick() {
    this.props.onConfrimButtonClick();
  }

  handleConfirmButtonClick() {
    this.props.onConfrimButtonClick();
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
          <Modal.Title>
            <FontAwesomeIcon icon={faExclamationCircle} />
            &nbsp; 確認
          </Modal.Title>
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
                  onClick={this.handleConfirmButtonClick}
                >
                  確認
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
