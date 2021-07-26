import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export interface Message {
  body: string;
  id: number;
  color: string;
}

export interface MessageBoxProps {
  message: Message;
}

export interface MessageBoxState {
  isOpen: boolean;
}

export default class MessageBox extends React.Component<
  MessageBoxProps,
  MessageBoxState
> {
  private thisRef: React.RefObject<HTMLDivElement>;
  constructor(props: MessageBoxProps) {
    super(props);
    this.thisRef = React.createRef();
    this.state = {
      isOpen: true,
    };

    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    this.thisRef.current?.scrollIntoView();
  }

  componentDidUpdate(prevProps: MessageBoxProps) {
    if (this.props.message.id !== prevProps.message.id) {
      this.thisRef.current?.scrollIntoView();
      this.setState({ isOpen: true });
    }
  }

  hide() {
    this.setState({ isOpen: false });
  }

  public render() {
    const className =
      "alert alert-" +
      this.props.message.color +
      " alert-dismissible fade show";

    let icon: React.ReactElement | null = null;

    if (this.props.message.color === "danger") {
      icon = <FontAwesomeIcon icon={faExclamationCircle} />;
    } else {
      icon = <FontAwesomeIcon icon={faCheckCircle} />;
    }

    return (
      <div ref={this.thisRef} className="mt-1">
        <div className={className} role="alert">
          {icon}&nbsp;{this.props.message.body}
        </div>
      </div>
    );
  }
}
