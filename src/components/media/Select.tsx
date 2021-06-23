import * as React from "react";
import "./Select.css";
import Option from "./Option";
import { Media } from "./FilterableSelectModal";

export interface SelectProps {
  medias: Media[];
  filterText: string;
}

export default class Select extends React.Component<SelectProps> {
  public render() {
    const media: Media = {
      id: 1,
      name: "a",
      url: "a",
      keyword: "a",
    };

    const filterText = this.props.filterText;

    const options: React.ReactElement[] = [];

    this.props.medias.forEach((media, index) => {
      if (media.name.indexOf(filterText) === -1) {
        return;
      }

      options.push(<Option key={index} name={media.name}></Option>);
    });

    return <div className="list-group fixed-height-15">{options}</div>;
  }
}
