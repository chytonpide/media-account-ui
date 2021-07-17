import * as React from "react";
import {
  SyncTarget,
  SyncSource,
} from "../../models/work-schedule/WorkScheduleSyncDetail";
import SyncTargetOption from "./SyncTargetOption";

export interface SyncTargetsInputProps {
  source: SyncSource | null;
  targets: SyncTarget[];
  availableTargets: SyncTarget[];
}

export default class SyncTargetsInput extends React.Component<
  SyncTargetsInputProps
> {
  public render() {
    const syncTargetOptions: React.ReactElement[] = [];
    this.props.availableTargets.forEach((availableTarget) => {
      let sameAsSource: boolean = false;
      let selectedTarget: boolean = false;

      if (
        this.props.source != null &&
        availableTarget.mediaAccountId == this.props.source.mediaAccountId
      ) {
        sameAsSource = true;
      }

      this.props.targets.forEach((target) => {
        if (availableTarget.mediaAccountId == target.mediaAccountId) {
          selectedTarget = true;
        }
      });

      if (sameAsSource) {
        syncTargetOptions.push(
          <SyncTargetOption
            target={availableTarget}
            checked={false}
            disabled={true}
            descOfDisabled={"取り込み先は選択できません。"}
          />
        );
      } else if (selectedTarget) {
        syncTargetOptions.push(
          <SyncTargetOption
            target={availableTarget}
            checked={true}
            disabled={false}
            descOfDisabled={null}
          />
        );
      } else {
        syncTargetOptions.push(
          <SyncTargetOption
            target={availableTarget}
            checked={false}
            disabled={false}
            descOfDisabled={null}
          />
        );
      }
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
              id="flexCheckChecked"
            />
            <label
              className="form-check-label"
              htmlFor="flexCheckChecked"
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
