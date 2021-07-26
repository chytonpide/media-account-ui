import * as React from "react";
import {
  SyncTarget,
  SyncSource,
} from "../../models/work-schedule/WorkScheduleSyncDetail";
import SyncTargetCheckbox from "./SyncTargetCheckbox";

export interface SyncTargetsControlProps {
  onEachTargetChange: (target: SyncTarget, checked: boolean) => void;
  onAllTargetsCheckboxCange: (checked: boolean) => void;
  source: SyncSource | null;
  targets: SyncTarget[];
  availableTargets: SyncTarget[];
}

export default class SyncTargetsControl extends React.Component<
  SyncTargetsControlProps
> {
  constructor(props: SyncTargetsControlProps) {
    super(props);
    this.handleAllTargetsCheckboxChange = this.handleAllTargetsCheckboxChange.bind(
      this
    );
    this.allTargetsChecked = this.allTargetsChecked.bind(this);
  }

  handleAllTargetsCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onAllTargetsCheckboxCange(e.currentTarget.checked);
  }

  allTargetsChecked() {
    let result: boolean = false;
    let availableTargetsIncludingSource = false;

    this.props.availableTargets.forEach((availableTarget) => {
      if (
        availableTarget.mediaAccountId === this.props.source?.mediaAccountId
      ) {
        availableTargetsIncludingSource = true;
      }
    });

    if (
      availableTargetsIncludingSource &&
      this.props.targets.length === this.props.availableTargets.length - 1
    ) {
      result = true;
    }

    if (
      !availableTargetsIncludingSource &&
      this.props.targets.length === this.props.availableTargets.length
    ) {
      result = true;
    }
    return result;
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
              checked={this.allTargetsChecked()}
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
