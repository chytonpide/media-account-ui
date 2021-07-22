import * as React from "react";
import { CheckJsDirective } from "typescript";
import { SyncTarget } from "../../models/work-schedule/WorkScheduleSyncDetail";

export interface SyncTargetCheckboxProps {
  onChange: (target: SyncTarget, checked: boolean) => void;
  target: SyncTarget;
  checked: boolean;
  disabled: boolean;
  descOfDisabled: string | null;
}

export default class SyncTargetCheckbox extends React.Component<
  SyncTargetCheckboxProps
> {
  constructor(props: SyncTargetCheckboxProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.checked) {
      this.props.onChange(this.props.target, true);
    } else {
      this.props.onChange(this.props.target, false);
    }
  }

  handleButtonClick() {}

  public render() {
    let style = "list-group-item list-group-item-action cursor-pointer";

    if (this.props.disabled) {
      style = "list-group-item list-group-item-action disabled";
    }

    return (
      <label
        //type="button"
        className={style}
        htmlFor={"syncTargetOption" + this.props.target.mediaAccountId}
        onClick={this.handleButtonClick}
      >
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            onChange={this.handleChange}
            disabled={this.props.disabled === true ? true : false}
            checked={this.props.checked === true ? true : false}
            id={"syncTargetOption" + this.props.target.mediaAccountId}
          />

          {this.props.target.mediaName}
          {this.props.disabled == true && (
            <>
              &nbsp;&nbsp;
              <span className="badge bg-dark">{this.props.descOfDisabled}</span>
            </>
          )}
        </div>
      </label>
    );
  }
}
