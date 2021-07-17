import * as React from "react";
import { CheckJsDirective } from "typescript";
import { SyncTarget } from "../../models/work-schedule/WorkScheduleSyncDetail";

export interface SyncTargetOptionProps {
  target: SyncTarget;
  checked: boolean;
  disabled: boolean;
  descOfDisabled: string | null;
}

export default class SyncTargetOption extends React.Component<
  SyncTargetOptionProps
> {
  public render() {
    return (
      <button type="button" className="list-group-item list-group-item-action">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            disabled={this.props.disabled === true ? true : false}
            checked={this.props.checked === true ? true : false}
            id={"syncTargetOption" + this.props.target.mediaAccountId}
          />
          <label
            className="form-check-label"
            htmlFor={"syncTargetOption" + this.props.target.mediaAccountId}
          >
            {this.props.target.mediaName}
            {this.props.disabled == true && (
              <>
                &nbsp;&nbsp;
                <span className="badge bg-dark">
                  {this.props.descOfDisabled}
                </span>
              </>
            )}
          </label>
        </div>
      </button>
    );
  }
}
