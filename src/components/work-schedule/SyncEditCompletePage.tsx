import * as React from "react";

export interface SyncEditCompletePageProps {}

export interface SyncEditCompletePageState {}

export default class SyncEditCompletePage extends React.Component<
  SyncEditCompletePageProps,
  SyncEditCompletePageState
> {
  constructor(props: SyncEditCompletePageProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div className="container-fluid">
        <div className="row mb-3 pt-3">
          <div className="col">変更を保存しました。</div>
        </div>
        <div className="row pb-3 mt-3">
          <div className="col d-grid">
            <button type="button" className="btn btn-secondary">
              閉じる
            </button>
          </div>
        </div>
      </div>
    );
  }
}
