import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "./Select";
import SearchBar from "./SearchBar";
import mediasData from "../../screens/media/mediasData.json";

export interface Media {
  id: number;
  name: string;
  url: string;
  keyword: string;
}

interface FilterbleSelectModalProps {
  onConfirmButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCloseButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
  }

  handleFilterTextChange(filterText: string) {
    this.setState({ filterText: filterText });
  }

  componentDidMount() {
    const medias: Media[] = [];

    mediasData.medias.forEach((mediaData) => {
      medias.push({
        id: mediaData.id,
        name: mediaData.name,
        url: "ab.com",
        keyword: "keyword",
      });
    });

    this.setState({ medias: medias });
  }

  public render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onCloseButtonClick}
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
            onClick={this.props.onCloseButtonClick}
          ></button>
        </Modal.Header>
        <Modal.Body className="bg-navy-dark text-light">
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          ></SearchBar>
          <Select medias={this.state.medias}></Select>
          <div>Woohoo, you're reading this text in a modal!</div>
          <div className="d-grid mt-3">
            <Button
              variant="secondary"
              onClick={this.props.onConfirmButtonClick}
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
