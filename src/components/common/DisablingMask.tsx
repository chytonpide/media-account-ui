import * as React from "react";
import "./DisablingMask.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

interface DisablingMaskProps {
  /*show: boolean;*/
  confirmBoxShow: boolean;
  confirmBoxMessage: string | null;
}

interface DisablingMaskState {
  confirmed: boolean;
}

export default class DisablingMask extends React.Component<
  DisablingMaskProps,
  DisablingMaskState
> {
  constructor(props: DisablingMaskProps) {
    super(props);
    this.state = {
      confirmed: false,
    };
    this.handleConfirmButtonClick = this.handleConfirmButtonClick.bind(this);
  }

  handleConfirmButtonClick() {
    this.setState({ confirmed: true });
  }

  public render() {
    return (
      <div
        className="disabling-mask"
        /*style={{ opacity: this.props.show ? "1" : "0" }}*/
      >
        {this.props.confirmBoxShow && this.state.confirmed === false && (
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="bg-navy-dark text-light modal-header">
                <div className="modal-title h4">
                  <FontAwesomeIcon icon={faExclamationCircle} />
                  &nbsp; 確認
                </div>
              </div>
              <div className="bg-navy-dark text-light modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col">{this.props.confirmBoxMessage}</div>
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
              </div>
              <div className="bg-navy-dark text-light modal-footer"></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
