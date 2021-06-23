import * as React from "react";
import "./Select.css";
import Option from "./Option";
import { Media } from "./FilterableSelectModal";

export interface SelectProps {
  medias: Media[];
  filterText: string;
  onSelectChange: (selectedItemId: number) => void;
}

export default class Select extends React.Component<SelectProps> {
  public render() {
    const media: Media = {
      id: 1,
      name: "a",
      url: "a",
      keyword: "a",
      selected: false,
    };

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
        <Option
          key={index}
          itemName={media.name}
          itemId={media.id}
          selected={media.selected}
          onClick={this.props.onSelectChange}
        ></Option>
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
