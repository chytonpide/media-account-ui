import * as React from "react";
import mediasData from "../media/mediasData.json";
import ModalSpinner from "../../components/common/ModalSpinner";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { ApiError } from "../common/ApiError";
import MediaSelect from "../media/ModalFilterableSelect";
import MessageBox from "../../components/common/MessageBox";
import { fetchMediaListData } from "../media/MediaDataFetcher";
import { Media } from "../media/ModalFilterableSelect";

interface SyncEditPageProps {
  clientId: string;
  shopId: string;
}

export default class SyncEditPage extends React.Component<
  RouteComponentProps<SyncEditPageProps>
> {
  private clientId: number;
  private shopId: number;

  constructor(props: RouteComponentProps<SyncEditPageProps>) {
    super(props);
    this.clientId = Number(this.props.match.params.clientId);
    this.shopId = Number(this.props.match.params.shopId);
  }

  public render() {
    const mediaOptions: any = [];

    mediasData.medias.forEach((mediaData) => {
      mediaOptions.push(
        <option key={mediaData.id} value={mediaData.id}>
          {mediaData.name}
        </option>
      );
    });

    return (
      <div className="container-fluid vh-100">
        <div className="row mb-2">
          <div className="col">ErrorMessage</div>
        </div>
        <div className="row mb-4">
          <div className="col">
            <div>
              <label className="form-label required">媒体名</label>
              <div className="input-group">
                <input type="text" className="form-control readonly" readOnly />
                <button type="button" className="btn btn-secondary">
                  媒体選択
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <label className="form-label required">ID</label>
            <input type="text" className="form-control" id="username"></input>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <label className="form-label required">PW</label>
            <input type="text" className="form-control" id="password"></input>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <label className="form-label">Option ID</label>
            <input
              type="text"
              className="form-control"
              id="optionalDescriptor"
            ></input>
          </div>
        </div>
        <div className="row pb-4">
          <div className="col d-grid">
            <Link
              to={
                "/shops/" + this.props.match.params.shopId + "/media-accounts"
              }
              type="button"
              className="btn btn-secondary"
            >
              戻る
            </Link>
          </div>
          <div className="col d-grid">
            <button type="button" className="btn btn-secondary">
              保存
            </button>
          </div>
        </div>
      </div>
    );
  }
}
