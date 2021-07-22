import * as React from "react";
import ButtonStyleOption from "../common/ButtonStyleOption";
import { SyncSource } from "../../models/work-schedule/WorkScheduleSyncDetail";

export interface FilteredSelectProps {
  source: SyncSource | null;
  filterText: string;
  availableSources: SyncSource[];
  selectedMediaAccountId: number | null;
  onSelectChange: (mediaAccountId: number) => void;
}

export default class FilteredSelect extends React.Component<
  FilteredSelectProps
> {
  public render() {
    const filterText = this.props.filterText;
    const options: React.ReactElement[] = [];

    this.props.availableSources.forEach((availableSource) => {
      let disabled = false;
      let selected = false;
      if (
        availableSource.mediaName.indexOf(filterText) === -1 &&
        availableSource.loginId.indexOf(filterText) === -1
      ) {
        return;
      }

      if (
        this.props.source?.mediaAccountId === availableSource.mediaAccountId
      ) {
        disabled = true;
      }

      if (
        this.props.selectedMediaAccountId === availableSource.mediaAccountId
      ) {
        selected = true;
      }

      options.push(
        <ButtonStyleOption
          key={availableSource.mediaAccountId}
          itemId={availableSource.mediaAccountId}
          selected={selected}
          displayComponent={
            <>
              {availableSource.mediaName}
              &nbsp;&nbsp;
              <span className="badge bg-light text-dark">
                ID&nbsp;:&nbsp;{availableSource.loginId}
              </span>
              {disabled && (
                <>
                  &nbsp;&nbsp;
                  <span className="badge bg-secondary">現在使用中</span>
                </>
              )}
            </>
          }
          disabled={disabled}
          onClick={this.props.onSelectChange}
        ></ButtonStyleOption>
      );
    });

    return (
      <div className="list-group fixed-height-15">
        {options}
        {options.length === 0 && <div>検索結果が御座いません。</div>}
      </div>
    );
  }
}
