import * as React from "react";
import "./FilteredSelect.css";
import ButtonStyleOption from "../common/ButtonStyleOption";
import Option from "./Option";
import { Media } from "../../screens/media/ModalFilterableSelect";

export interface FilteredSelectProps {
  medias: Media[];
  filterText: string;
  onSelectChange: (selectedItemId: number) => void;
}

export default class FilteredSelect extends React.Component<
  FilteredSelectProps
> {
  public render() {
    const filterText = this.props.filterText;
    const options: React.ReactElement[] = [];

    this.props.medias.forEach((media, index) => {
      if (
        media.name.indexOf(filterText) === -1 &&
        media.keyword.indexOf(filterText) === -1 &&
        media.url.indexOf(filterText) === -1
      ) {
        return;
      }

      options.push(
        <ButtonStyleOption
          key={index}
          itemId={media.id}
          selected={media.selected}
          onClick={this.props.onSelectChange}
          disabled={media.mediaAccountPresent}
          displayComponent={
            <>
              {media.name}

              {media.mediaAccountPresent && (
                <>
                  &nbsp;&nbsp;
                  <span className="badge bg-secondary">登録済</span>
                </>
              )}
            </>
          }
        ></ButtonStyleOption>
      );
    });
    /*
    <Option
    key={index}
    mediaName={media.name}
    mediaId={media.id}
    selected={media.selected}
    mediaAccountPresent={}
    onClick={this.props.onSelectChange}
  ></Option>
  */

    return (
      <div className="list-group fixed-height-15">
        {options}
        {options.length === 0 && <div>検索結果が御座いません。</div>}
      </div>
    );
  }
}
