import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import SyncSourceControl from "../../components/work-schedule/SyncSourceControl";
import SyncTargetControl from "../../components/work-schedule/SyncTargetControl";
import SyncScheduleControl from "../../components/work-schedule/SyncScheduleControl";
import { WorkScheduleSyncSchedule } from "../../models/work-schedule/WorkScheduleSyncSchedule";

interface SyncEditPageProps {
  clientId: string;
  shopId: string;
}

export default class SyncEditPage extends React.Component<
  RouteComponentProps<SyncEditPageProps>
> {
  private clientId: number;
  private shopId: number;

  constructor(props: RouteComponentProps<SyncEditPageProps>) {
    super(props);
    this.clientId = Number(this.props.match.params.clientId);
    this.shopId = Number(this.props.match.params.shopId);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
    this.handleScheduleRemoveClick = this.handleScheduleRemoveClick.bind(this);
  }

  handleScheduleRemoveClick(scheduleId: number) {
    console.log(scheduleId);
  }

  handleScheduleChange(schedule: WorkScheduleSyncSchedule) {
    console.log(schedule);
  }

  public render() {
    return (
      <div className="container-fluid vh-100">
        <div className="row mb-3 pt-3">
          <div className="col">
            <div className="row">
              <div className="col">
                <SyncSourceControl />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <SyncTargetControl />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <SyncScheduleControl
                  onEachScheduleDeleteButtonClick={
                    this.handleScheduleRemoveClick
                  }
                  onEachScheduleChange={this.handleScheduleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-2 mt-3">
          <div className="col d-grid">
            <button type="button" className="btn btn-secondary">
              保存
            </button>
          </div>
        </div>
      </div>
    );
  }
}
