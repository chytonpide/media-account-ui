import * as React from "react";
import {
  SyncTarget,
  SyncSource,
} from "../../models/work-schedule/WorkScheduleSyncDetail";
import SyncTargetCheckbox from "./SyncTargetCheckbox";

export interface SyncTargetsInputProps {
  onEachTargetChange: (target: SyncTarget, checked: boolean) => void;
  onAllTargetsCheckboxCange: (checked: boolean) => void;
  source: SyncSource | null;
  targets: SyncTarget[];
  availableTargets: SyncTarget[];
}

export default class SyncTargetsInput extends React.Component<
  SyncTargetsInputProps
> {
  constructor(props: SyncTargetsInputProps) {
    super(props);
    this.handleAllTargetsCheckboxChange = this.handleAllTargetsCheckboxChange.bind(
      this
    );
  }

  handleAllTargetsCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onAllTargetsCheckboxCange(e.currentTarget.checked);
  }

  public render() {
    const syncTargetOptions: React.ReactElement[] = [];

    this.props.availableTargets.forEach((availableTarget) => {
      let sameAsSource: boolean = false;
      let descOfDisabled: string | null = null;
      let selectedTarget: boolean = false;

      if (
        this.props.source != null &&
        availableTarget.mediaAccountId == this.props.source.mediaAccountId
      ) {
        sameAsSource = true;
        descOfDisabled = "取り込み先は選択できません。";
      }

      this.props.targets.forEach((target) => {
        if (availableTarget.mediaAccountId == target.mediaAccountId) {
          selectedTarget = true;
        }
      });

      syncTargetOptions.push(
        <SyncTargetCheckbox
          onChange={this.props.onEachTargetChange}
          key={availableTarget.mediaAccountId}
          target={availableTarget}
          checked={selectedTarget}
          disabled={sameAsSource}
          descOfDisabled={descOfDisabled}
        />
      );
    });

    let allTargetsChecked: boolean = false;

    if (this.props.source != null) {
      if (
        this.props.targets.length ===
        this.props.availableTargets.length - 1
      ) {
        allTargetsChecked = true;
      } else {
        allTargetsChecked = false;
      }
    } else {
      if (this.props.targets.length === this.props.availableTargets.length) {
        allTargetsChecked = true;
      } else {
        allTargetsChecked = false;
      }
    }

    return (
      <div className="card bg-transparent border-secondary">
        <div className="card-header border-secondary">
          <h5>出勤情報の同期先</h5>
        </div>
        <div className="card-body">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="allTargetsCheckbox"
              onChange={this.handleAllTargetsCheckboxChange}
              checked={allTargetsChecked}
            />
            <label
              className="form-check-label cursor-pointer"
              htmlFor="allTargetsCheckbox"
              /*{...{ forHtml: "flexCheckChecked" }}*/
            >
              全て選択
            </label>
          </div>
          <div className="list-group">{syncTargetOptions}</div>
        </div>
      </div>
    );
  }
}
