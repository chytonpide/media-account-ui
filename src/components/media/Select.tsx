import * as React from "react";
import "./Select.css";
import Option from "./Option";
import { Media } from "./FilterableSelectModal";

export interface SelectProps {
  medias: Media[];
}

export default class Select extends React.Component<SelectProps> {
  public render() {
    const media: Media = {
      id: 1,
      name: "a",
      url: "a",
      keyword: "a",
    };

    const options: React.ReactElement[] = [];

    this.props.medias.forEach((media, index) => {
      options.push(<Option key={index} name={media.name}></Option>);
    });

    return <div className="list-group fixed-height">{options}</div>;
  }
}
