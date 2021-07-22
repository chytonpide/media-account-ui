import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import FilteredSelect from "../../components/media/FilteredSelect";
import SearchBar from "../../components/common/SearchBar";
import { fetchMediaListData } from "./MediaDataFetcher";

export interface Media {
  id: number;
  name: string;
  url: string;
  keyword: string;
  selected: boolean;
  mediaAccountPresent: boolean;
}

interface ModalFilterbleSelectProps {
  onSelectOkButtonClick: (selectedMedia: Media) => void;
  onCloseButtonClick: (event: void) => void;
  show: boolean;
  shopId: number;
  //medias: Media[];
}

interface ModalFilterbleSelectState {
  medias: Media[];
  filterText: string;
}

export default class ModalFilterableSelect extends React.Component<
  ModalFilterbleSelectProps,
  ModalFilterbleSelectState
> {
  constructor(props: ModalFilterbleSelectProps) {
    super(props);

    this.state = {
      medias: [],
      filterText: "",
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectOkButtonClick = this.handleSelectOkButtonClick.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
  }

  handleFilterTextChange(filterText: string) {
    const medias: Media[] = [];

    this.state.medias.forEach((media) => {
      medias.push({
        id: media.id,
        name: media.name,
        url: media.url,
        keyword: media.keyword,
        selected: false,
        mediaAccountPresent: media.mediaAccountPresent,
      });
    });

    this.setState({ filterText: filterText, medias: medias });
  }

  handleSelectChange(mediaId: number) {
    const medias: Media[] = [];

    this.state.medias.forEach((media) => {
      if (media.id === mediaId) {
        media = {
          id: media.id,
          name: media.name,
          url: media.url,
          keyword: media.keyword,
          selected: true,
          mediaAccountPresent: media.mediaAccountPresent,
        };

        medias.push(media);
      } else {
        media = {
          id: media.id,
          name: media.name,
          url: media.url,
          keyword: media.keyword,
          selected: false,
          mediaAccountPresent: media.mediaAccountPresent,
        };

        medias.push(media);
      }
    });
    this.setState({ medias: medias });
  }

  handleSelectOkButtonClick() {
    let selectedMedia: Media = {
      id: 0,
      name: "none",
      url: "none",
      keyword: "none",
      selected: false,
      mediaAccountPresent: false,
    };

    this.state.medias.forEach((media) => {
      if (media.selected === true) {
        selectedMedia = media;
      }
    });

    if (selectedMedia.id === 0) {
      //alert
      return;
    }

    this.props.onSelectOkButtonClick(selectedMedia);
  }

  handleCloseButtonClick() {
    this.props.onCloseButtonClick();
  }

  componentDidMount() {
    const medias: Media[] = [];

    /*
    mediasData.medias.forEach((mediaData, index) => {
      medias.push({
        id: mediaData.id,
        name: mediaData.name,
        url: "ab.com" + index,
        keyword: "keyword" + index,
        selected: false,
      });
    });
    */

    fetchMediaListData(this.props.shopId).then((mediaListData) => {
      mediaListData.medias.forEach((mediaData) => {
        medias.push({
          id: mediaData.mediaId,
          name: mediaData.name,
          url: mediaData.url,
          keyword: mediaData.keyword,
          selected: false,
          mediaAccountPresent: mediaData.mediaAccountPresent,
        });
      });
      this.setState({ medias: medias });
    });
    /*
      .then(() => {
        this.setState({ medias: medias });
      });
      */
  }

  public render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleCloseButtonClick}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="bg-navy-dark text-light">
          <Modal.Title>媒体選択</Modal.Title>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={this.handleCloseButtonClick}
          ></button>
        </Modal.Header>
        <Modal.Body className="bg-navy-dark text-light">
          <SearchBar
            filterText={this.state.filterText}
            placeholder={"媒体名又はURLで検索"}
            onFilterTextChange={this.handleFilterTextChange}
          ></SearchBar>
          <p className="fs-7 lh-1 mt-4">ご利用可能な媒体リスト</p>
          <FilteredSelect
            medias={this.state.medias}
            filterText={this.state.filterText}
            onSelectChange={this.handleSelectChange}
          ></FilteredSelect>
          <div className="d-grid mt-3">
            <Button
              variant="secondary"
              onClick={this.handleSelectOkButtonClick}
            >
              確定
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-navy-dark text-light"></Modal.Footer>
      </Modal>
    );
  }
}
