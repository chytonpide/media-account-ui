import * as React from "react";

export interface Schedule {
  id: number;
  dayOfWeek: string;
  hour: number;
  minute: number;
  second: number;
}

export interface ScheduleInputProps {
  onRemoveClick: (scheduleId: number) => void;
  onChange: (schedule: Schedule) => void;
  schedule: Schedule;
}

export interface CronScheduleInputState {}

export default class CronScheduleInput extends React.Component<
  ScheduleInputProps,
  CronScheduleInputState
> {
  constructor(props: ScheduleInputProps) {
    super(props);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleDayOfWeekChange = this.handleDayOfWeekChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);

    this.state = {};
  }

  handleRemoveClick() {
    this.props.onRemoveClick(this.props.schedule.id);
  }

  handleDayOfWeekChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSchedule = this.props.schedule;
    const dayOfWeek = e.target.value;
    newSchedule["dayOfWeek"] = dayOfWeek;
    this.props.onChange(newSchedule);
  }

  handleHourChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSchedule = this.props.schedule;
    const hour = Number(e.target.value);
    newSchedule.hour = hour;
    //newSchedule["hour"] = hour;
    this.props.onChange(newSchedule);
  }

  handleMinChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSchedule = this.props.schedule;
    const minute = Number(e.target.value);
    newSchedule.minute = minute;
    this.props.onChange(newSchedule);
  }

  render() {
    const schedule = this.props.schedule;

    const dayOfWeekOptions = [];
    dayOfWeekOptions.push(
      <option key="dayOfWeek0" value="EVERY">
        毎日
      </option>
    );
    dayOfWeekOptions.push(
      <option key="dayOfWeek1" value="MONDAY">
        月
      </option>
    );
    dayOfWeekOptions.push(
      <option key="dayOfWeek2" value="TUESDAY">
        火
      </option>
    );
    dayOfWeekOptions.push(
      <option key="dayOfWeek3" value="WEDNESDAY">
        水
      </option>
    );
    dayOfWeekOptions.push(
      <option key="dayOfWeek4" value="THURSDAY">
        木
      </option>
    );
    dayOfWeekOptions.push(
      <option key="dayOfWeek5" value="FRIDAY">
        金
      </option>
    );
    dayOfWeekOptions.push(
      <option key="dayOfWeek6" value="SATURDAY">
        土
      </option>
    );
    dayOfWeekOptions.push(
      <option key="dayOfWeek7" value="SUNDAY">
        日
      </option>
    );

    const hourOptions = [];
    for (var i = 0; i < 24; i++) {
      hourOptions.push(
        <option key={"hour" + i} value={i}>
          {i}
        </option>
      );
    }

    const minOptions = [];
    for (var i = 0; i < 60; i++) {
      minOptions.push(
        <option key={"min" + i} value={i}>
          {i}
        </option>
      );
    }

    return (
      <div className="row mt-3">
        <div className="col">
          <div className="card bg-transparent border-secondary">
            <div className="card-header bg-transparent">
              <div className="d-md-flex justify-content-md-end">
                <button
                  className="btn btn-sm btn-outline-danger"
                  type="button"
                  onClick={this.handleRemoveClick}
                >
                  削除
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="row justify-content-end">
                    <div className="col-6">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        onChange={this.handleDayOfWeekChange}
                        value={schedule.dayOfWeek}
                      >
                        {dayOfWeekOptions}
                      </select>
                    </div>
                    <div className="col-4">曜日</div>
                  </div>
                </div>

                <div className="col">
                  <div className="row justify-content-end">
                    <div className="col-6">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        onChange={this.handleHourChange}
                        value={schedule.hour}
                      >
                        {hourOptions}
                      </select>
                    </div>
                    <div className="col-4">時</div>
                  </div>
                </div>

                <div className="col">
                  <div className="row justify-content-end">
                    <div className="col-6">
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        onChange={this.handleMinChange}
                        value={schedule.minute}
                      >
                        {minOptions}
                      </select>
                    </div>
                    <div className="col-4">分</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
