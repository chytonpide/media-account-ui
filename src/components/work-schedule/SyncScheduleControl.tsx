import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { WorkScheduleSyncSchedule } from "../../models/work-schedule/WorkScheduleSyncSchedule";
import { SyncSchedule } from "../../models/work-schedule/WorkScheduleSyncDetail";
import SyncScheduleInput from "./SyncScheduleInput";

export interface SyncScheduleControlProps {
  onEachScheduleDeleteButtonClick: (index: number) => void;
  onEachScheduleChange: (schedule: SyncSchedule) => void;
  schedules: SyncSchedule[];
}

export default class SyncScheduleControl extends React.Component<
  SyncScheduleControlProps
> {
  public render() {
    const scheduleInputs: React.ReactElement[] = [];

    this.props.schedules.forEach((schedule, index) => {
      scheduleInputs.push(
        <SyncScheduleInput
          key={index}
          index={index}
          schedule={schedule}
          onChange={this.props.onEachScheduleChange}
          onDeleteButtonClick={this.props.onEachScheduleDeleteButtonClick}
        ></SyncScheduleInput>
      );
    });

    return (
      <div className="card bg-transparent border-secondary">
        <div className="card-header border-secondary">
          <h5>出勤情報の同期化スケージュール</h5>
        </div>
        <div className="card-body">
          <div className="card bg-transparent border-secondary">
            <div className="card-body">
              <div>
                現在登録されているスケージュール数 :&nbsp;
                <span className="h4">5</span>&nbsp;件
              </div>
              <div>
                <small>※最大21件登録できます。</small>
              </div>
              <div className="d-grid mt-3">
                <button type="button" className="btn btn-secondary">
                  スケージュールを追加
                </button>
              </div>
            </div>
          </div>
          <div className="d-md-flex justify-content-md-end mt-3">
            <button className="btn btn-secondary" type="button">
              整列&nbsp;
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>
          <div>{scheduleInputs}</div>
        </div>
      </div>
    );
  }
}
