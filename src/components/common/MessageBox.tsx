import * as React from "react";

export interface MessageBoxProps {
  messageId: number;
  message: string;
  color: string;
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
    if (this.props.messageId !== prevProps.messageId) {
      this.thisRef.current?.scrollIntoView();
      this.setState({ isOpen: true });
    }
  }

  hide() {
    this.setState({ isOpen: false });
  }

  public render() {
    const className =
      "alert alert-" + this.props.color + " alert-dismissible fade show";
    /*
    const messages: string[] = this.props.messages;

    const dispMessages: React.ReactElement[] = [];

    messages.map((message, index) => {
      dispMessages.push(
        <div key={index} className={className} role="alert">
          {message}
        </div>
      );
    });
    */

    return (
      <div ref={this.thisRef} className="mt-1">
        <div className={className} role="alert">
          {this.props.message}
        </div>
      </div>
    );
  }
}
