import React, { Component } from "react";
import mediasData from "./mediasData.json";
import Table from "../../components/media-account/Table";

interface ListPageProps {
  shopId: number;
}

export interface MediaAccount {
  id: number;
  shopId: number;
  mediaId: number;
  mediaName: string;
  username: string;
  password: string;
  optionalDescriptor: string | null;
  loginValidity: string;
}

export interface MediaAccounts {
  mediaAccounts: MediaAccount[];
}

export default class ListPage extends Component<ListPageProps, MediaAccounts> {
  constructor(props: ListPageProps) {
    super(props);

    this.state = {
      mediaAccounts: [],
    };
  }

  componentDidMount() {
    const loadedMediaAccounts: MediaAccount[] = [];

    this.setState({
      mediaAccounts: loadedMediaAccounts,
    });
  }

  render() {
    return <Table mediaAccounts={this.state.mediaAccounts}></Table>;
  }
}
