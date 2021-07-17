import * as React from "react";
import { SyncSource } from "../../models/work-schedule/WorkScheduleSyncDetail";

export interface SyncSourceInputProps {
  source: SyncSource | null;
  availableSources: SyncSource[];
}

export default class SyncSourceInput extends React.Component<
  SyncSourceInputProps
> {
  public render() {
    return (
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
            <span className="input-group-text bg-navy-dark text-white">ID</span>
            <input
              type="text"
              className="form-control readonly"
              value={this.props.source != null ? this.props.source.loginId : ""}
              readOnly
            />
          </div>
          <div className="d-grid mt-2">
            <button type="button" className="btn btn-secondary">
              取り込み先編集
            </button>
          </div>
        </div>
      </div>
    );
  }
}
