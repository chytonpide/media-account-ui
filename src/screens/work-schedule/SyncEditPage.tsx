import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { fetchWorkScheduleSyncDetail } from "./WorkScheduleSyncDetailFetcher";
import {
  WorkScheduleSyncDetail,
  SyncSchedule,
} from "../../models/work-schedule/WorkScheduleSyncDetail";
import SyncSourceControl from "../../components/work-schedule/SyncSourceControl";
import SyncTargetControl from "../../components/work-schedule/SyncTargetControl";
import SyncScheduleControl from "../../components/work-schedule/SyncScheduleControl";
import FloatingButton from "../../components/common/FloatingButton";

interface SyncEditPageProps {
  clientId: string;
  shopId: string;
}

interface SyncEditPageState {
  workScheduleSyncDetail: WorkScheduleSyncDetail;
}

export default class SyncEditPage extends React.Component<
  RouteComponentProps<SyncEditPageProps>,
  SyncEditPageState
> {
  private clientId: number;
  private shopId: number;
  private bottomRef: React.RefObject<HTMLDivElement>;
  constructor(props: RouteComponentProps<SyncEditPageProps>) {
    super(props);
    this.clientId = Number(this.props.match.params.clientId);
    this.shopId = Number(this.props.match.params.shopId);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
    this.handleScheduleRemoveClick = this.handleScheduleRemoveClick.bind(this);
    this.bottomRef = React.createRef();
    this.state = {
      workScheduleSyncDetail: {
        id: 0,
        shopId: 0,
        source: null,
        targets: [],
        schedules: [],
        availableSources: [],
        availableTargets: [],
      },
    };
  }

  handleScheduleRemoveClick(index: number) {
    console.log(index);
  }

  handleScheduleChange(schedule: SyncSchedule) {
    console.log(schedule);
  }

  componentDidMount() {
    fetchWorkScheduleSyncDetail(this.shopId).then((data) => {
      const workScheduleSyncDetail: WorkScheduleSyncDetail = {
        id: data.id,
        shopId: data.shopId,
        source: data.source,
        targets: data.targets,
        schedules: data.schedules,
        availableSources: data.availableSources,
        availableTargets: data.availableTargets,
      };

      this.setState({ workScheduleSyncDetail: workScheduleSyncDetail });
    });
  }

  public render() {
    return (
      <>
        <FloatingButton
          onClick={() =>
            this.bottomRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          descOfButton="下へ"
        ></FloatingButton>
        <div className="container-fluid">
          <div className="row mb-3 pt-3">
            <div className="col">
              <div className="row">
                <div className="col">
                  <SyncSourceControl
                    source={this.state.workScheduleSyncDetail.source}
                    availableSources={
                      this.state.workScheduleSyncDetail.availableSources
                    }
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <SyncTargetControl
                    source={this.state.workScheduleSyncDetail.source}
                    targets={this.state.workScheduleSyncDetail.targets}
                    availableTargets={
                      this.state.workScheduleSyncDetail.availableTargets
                    }
                  />
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
                    schedules={this.state.workScheduleSyncDetail.schedules}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-3 mt-3">
            <div className="col d-grid">
              <button type="button" className="btn btn-secondary">
                変更を保存
              </button>
            </div>
          </div>
          <div ref={this.bottomRef}></div>
        </div>
      </>
    );
  }
}
