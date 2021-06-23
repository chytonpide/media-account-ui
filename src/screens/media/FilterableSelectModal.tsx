import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import FilteredSelect from "../../components/media/FilteredSelect";
import SearchBar from "../../components/media/SearchBar";
import mediasData from "./mediasData.json";

export interface Media {
  id: number;
  name: string;
  url: string;
  keyword: string;
  selected: boolean;
}

interface FilterbleSelectModalProps {
  onConfirmButtonClick: (selectedMedia: Media) => void;
  onCloseButtonClick: (event: void) => void;
  show: boolean;
  //medias: Media[];
}

interface FilterbleSelectModalState {
  medias: Media[];
  filterText: string;
}

export default class SelectModal extends React.Component<
  FilterbleSelectModalProps,
  FilterbleSelectModalState
> {
  constructor(props: FilterbleSelectModalProps) {
    super(props);
    this.state = {
      medias: [],
      filterText: "",
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleConfirmButtonClick = this.handleConfirmButtonClick.bind(this);
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
        };

        medias.push(media);
      } else {
        media = {
          id: media.id,
          name: media.name,
          url: media.url,
          keyword: media.keyword,
          selected: false,
        };

        medias.push(media);
      }
    });
    this.setState({ medias: medias });
  }

  handleConfirmButtonClick() {
    let selectedMedia: Media = {
      id: 0,
      name: "none",
      url: "none",
      keyword: "none",
      selected: false,
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

    this.props.onConfirmButtonClick(selectedMedia);
  }

  handleCloseButtonClick() {
    this.props.onCloseButtonClick();
  }

  componentDidMount() {
    const medias: Media[] = [];

    mediasData.medias.forEach((mediaData, index) => {
      medias.push({
        id: mediaData.id,
        name: mediaData.name,
        url: "ab.com" + index,
        keyword: "keyword" + index,
        selected: false,
      });
    });

    this.setState({ medias: medias });
  }

  public render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.handleCloseButtonClick}
        s
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
            onFilterTextChange={this.handleFilterTextChange}
          ></SearchBar>
          <p className="fs-7 lh-1 mb-4">媒体名、又は媒体のドメインで検索</p>
          <FilteredSelect
            medias={this.state.medias}
            filterText={this.state.filterText}
            onSelectChange={this.handleSelectChange}
          ></FilteredSelect>
          <div className="d-grid mt-3">
            <Button variant="secondary" onClick={this.handleConfirmButtonClick}>
              確定
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-navy-dark text-light"></Modal.Footer>
      </Modal>
    );
  }
}
