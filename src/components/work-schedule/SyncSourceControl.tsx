import * as React from "react";
import ModalSyncSourceSelect from "./ModalSnycSourceSelect";
import { SyncSource } from "../../models/work-schedule/WorkScheduleSyncDetail";

interface SyncSourceControlProps {
  onSourceChange: (source: SyncSource) => void;
  source: SyncSource | null;
  availableSources: SyncSource[];
}

interface SyncSourceControlState {
  showSelect: boolean;
}

export default class SyncSourceControl extends React.Component<
  SyncSourceControlProps,
  SyncSourceControlState
> {
  constructor(props: SyncSourceControlProps) {
    super(props);
    this.state = { showSelect: false };

    this.handleSelectOpenButtonClick = this.handleSelectOpenButtonClick.bind(
      this
    );
    this.handleSelectOkButtonClick = this.handleSelectOkButtonClick.bind(this);
    this.handleSelectCloseButtonClick = this.handleSelectCloseButtonClick.bind(
      this
    );
  }

  handleSelectOpenButtonClick() {
    this.setState({ showSelect: true });
  }

  handleSelectOkButtonClick(source: SyncSource | null) {
    this.setState({ showSelect: false });
    if (
      source !== null &&
      source !== undefined &&
      source.mediaAccountId !== this.props.source?.mediaAccountId
    ) {
      this.props.onSourceChange(source);
    }
  }

  handleSelectCloseButtonClick() {
    this.setState({ showSelect: false });
  }

  public render() {
    return (
      <>
        <ModalSyncSourceSelect
          onSelectOkButtonClick={this.handleSelectOkButtonClick}
          onCloseButtonClick={this.handleSelectCloseButtonClick}
          show={this.state.showSelect}
          source={this.props.source}
          availableSources={this.props.availableSources}
        ></ModalSyncSourceSelect>
        <div className="card bg-transparent border-secondary">
          <div className="card-header border-secondary">
            <h5>出勤情報の取り込み先</h5>
          </div>
          <div className="card-body">
            <div className="input-group">
              <span className="input-group-text bg-navy-dark text-white">
                媒体名
              </span>
              <input
                type="text"
                className="form-control readonly"
                value={
                  this.props.source != null ? this.props.source.mediaName : ""
                }
                readOnly
              />
            </div>
            <div className="input-group mt-2">
              <span className="input-group-text bg-navy-dark text-white">
                ログインID
              </span>
              <input
                type="text"
                className="form-control readonly"
                value={
                  this.props.source != null ? this.props.source.loginId : ""
                }
                readOnly
              />
            </div>
            <div className="d-grid mt-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleSelectOpenButtonClick}
              >
                取り込み先編集
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
