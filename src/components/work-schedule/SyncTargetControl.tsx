import * as React from "react";

export interface SyncTargetsInputProps {}

export default class SyncTargetsInput extends React.Component<
  SyncTargetsInputProps
> {
  public render() {
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
              checked
            />
            <label
              className="form-check-label"
              {...{ for: "flexCheckChecked" }}
            >
              全て選択
            </label>
          </div>
          <div className="list-group">
            <button
              disabled
              type="button"
              className="list-group-item list-group-item-action"
            >
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
                <label className="form-check-label">Disabled checkbox</label>
              </div>
            </button>

            <button
              disabled
              type="button"
              className="list-group-item list-group-item-action"
            >
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" />
                <label className="form-check-label">
                  Disabled checkbox &nbsp;&nbsp;
                  <span className="badge bg-secondary">
                    取り込み先は選択できません
                  </span>
                </label>
              </div>
            </button>

            <button
              disabled
              type="button"
              className="list-group-item list-group-item-action"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDisabled"
                />
                <label className="form-check-label">Disabled checkbox</label>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
