import * as React from "react";
import SearchBar from "../../components/common/SearchBar";
import FilteredSelect from "./FilteredSelect";
import { Modal, Button } from "react-bootstrap";
import { SyncSource } from "../../models/work-schedule/WorkScheduleSyncDetail";

interface ModalSyncSourceSelectProps {
  source: SyncSource | null;
  availableSources: SyncSource[];
}

interface ModalSyncSourceSelectState {
  filterText: string;
  availableSources: SyncSource[];
  selectedMediaAccountId: number | null;
}

export default class ModalSyncSourceSelect extends React.Component<
  ModalSyncSourceSelectProps,
  ModalSyncSourceSelectState
> {
  constructor(props: ModalSyncSourceSelectProps) {
    super(props);
    this.state = {
      filterText: "",
      availableSources: this.props.availableSources,
      selectedMediaAccountId: null,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleFilterTextChange(filterText: string) {
    const filteredAvailableSources: SyncSource[] = [];

    this.state.availableSources.forEach((availableSource) => {});

    this.setState({
      filterText: filterText,
      selectedMediaAccountId: null,
    });
  }

  handleSelectChange(mediaAccountId: number) {
    this.setState({
      selectedMediaAccountId: mediaAccountId,
    });
  }

  handleCloseButtonClick() {}

  public render() {
    return (
      <Modal show={true} onHide={this.handleCloseButtonClick} backdrop="static">
        <Modal.Header className="bg-navy-dark text-light">
          <Modal.Title>取り込み先選択</Modal.Title>
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
            placeholder={"媒体名又はログインIDで検索"}
            onFilterTextChange={this.handleFilterTextChange}
          ></SearchBar>
          <p className="fs-7 lh-1 mt-4">ご利用可能なアカウントリスト</p>
          <FilteredSelect
            filterText={this.state.filterText}
            source={this.props.source}
            availableSources={this.props.availableSources}
            onSelectChange={this.handleSelectChange}
            selectedMediaAccountId={this.state.selectedMediaAccountId}
          ></FilteredSelect>
          <div className="d-grid mt-3">
            <Button variant="secondary">確定</Button>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-navy-dark text-light"></Modal.Footer>
      </Modal>
    );
  }
}
