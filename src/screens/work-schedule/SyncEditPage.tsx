import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  WorkScheduleSyncDetail,
  SyncSchedule,
  SyncTarget,
  compareSyncSchedule,
} from "../../models/work-schedule/WorkScheduleSyncDetail";
import SyncSourceControl from "../../components/work-schedule/SyncSourceControl";
import SyncTargetControl from "../../components/work-schedule/SyncTargetControl";
import SyncScheduleControl from "../../components/work-schedule/SyncScheduleControl";
import TopFixedFloatingButton from "../../components/common/TopFixedFloatingButton";
import workScheduleSyncDetailStub from "../../models/work-schedule/WorkScheduleSyncDetailStub.json";

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
    this.bottomRef = React.createRef();
    this.clientId = Number(this.props.match.params.clientId);
    this.shopId = Number(this.props.match.params.shopId);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
    this.handleScheduleDeleteButtonClick = this.handleScheduleDeleteButtonClick.bind(
      this
    );
    this.handleScheduleAddButtonClick = this.handleScheduleAddButtonClick.bind(
      this
    );
    this.handleScheduleSortButtonClick = this.handleScheduleSortButtonClick.bind(
      this
    );
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleAllTargetCheckboxChange = this.handleAllTargetCheckboxChange.bind(
      this
    );

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

  handleScheduleDeleteButtonClick(index: number) {
    const newWorkScheduleSyncDetail = this.state.workScheduleSyncDetail;
    newWorkScheduleSyncDetail.schedules.splice(index, 1);

    this.setState({
      workScheduleSyncDetail: newWorkScheduleSyncDetail,
    });
  }

  handleScheduleChange(schedule: SyncSchedule, index: number) {
    const newWorkScheduleSyncDetail = this.state.workScheduleSyncDetail;
    newWorkScheduleSyncDetail.schedules[index] = schedule;

    this.setState({
      workScheduleSyncDetail: newWorkScheduleSyncDetail,
    });
  }

  handleScheduleAddButtonClick() {
    const newWorkScheduleSyncDetail = this.state.workScheduleSyncDetail;
    newWorkScheduleSyncDetail.schedules.splice(0, 0, {
      dayOfWeek: "MONDAY",
      hour: 1,
      minute: 1,
    });

    this.setState({
      workScheduleSyncDetail: newWorkScheduleSyncDetail,
    });
  }

  handleScheduleSortButtonClick() {
    const newWorkScheduleSyncDetail = this.state.workScheduleSyncDetail;
    newWorkScheduleSyncDetail.schedules.sort(compareSyncSchedule);

    this.setState({
      workScheduleSyncDetail: newWorkScheduleSyncDetail,
    });
  }

  handleTargetChange(aTarget: SyncTarget, checked: boolean) {
    const newWorkScheduleSyncDetail = this.state.workScheduleSyncDetail;

    if (checked) {
      newWorkScheduleSyncDetail.targets.push(aTarget);
    } else {
      newWorkScheduleSyncDetail.targets.forEach((target, index) => {
        if (target.mediaAccountId === aTarget.mediaAccountId) {
          newWorkScheduleSyncDetail.targets.splice(index, 1);
        }
      });
    }
    this.setState({
      workScheduleSyncDetail: newWorkScheduleSyncDetail,
    });
  }

  handleAllTargetCheckboxChange(checked: boolean) {
    if (checked) {
      const newWorkScheduleSyncDetail = this.state.workScheduleSyncDetail;
      const newTargets: SyncTarget[] = [];
      newWorkScheduleSyncDetail.availableTargets.forEach((target, index) => {
        if (
          newWorkScheduleSyncDetail.source?.mediaAccountId ===
          target.mediaAccountId
        ) {
          return;
        }
        newTargets.push(target);
      });

      newWorkScheduleSyncDetail.targets = newTargets;
      this.setState({ workScheduleSyncDetail: newWorkScheduleSyncDetail });
    } else {
      const newWorkScheduleSyncDetail = this.state.workScheduleSyncDetail;
      const newTargets: SyncTarget[] = [];
      newWorkScheduleSyncDetail.targets = newTargets;
      this.setState({ workScheduleSyncDetail: newWorkScheduleSyncDetail });
    }
  }

  componentDidMount() {
    this.setState({ workScheduleSyncDetail: workScheduleSyncDetailStub });

    /*
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
    */
  }

  public render() {
    return (
      <>
        <TopFixedFloatingButton
          onClick={() =>
            this.bottomRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          descOfButton="下へ"
        ></TopFixedFloatingButton>
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
                    onEachTargetChange={this.handleTargetChange}
                    onAllTargetsCheckboxCange={
                      this.handleAllTargetCheckboxChange
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
                      this.handleScheduleDeleteButtonClick
                    }
                    onEachScheduleChange={this.handleScheduleChange}
                    onScheduleAddButtonClick={this.handleScheduleAddButtonClick}
                    onScheduleSortButtonClick={
                      this.handleScheduleSortButtonClick
                    }
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
