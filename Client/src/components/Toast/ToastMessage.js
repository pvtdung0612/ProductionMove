import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "../../utils/constant";
import "../../assets/css/toastmsg.scss";
class ToastMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      message: this.props.message,
      open: true,
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return this.state.open ? (
      <div className={`toast toast-${this.state.type}`}>
        <div className="toast-icon">{toast[this.state.type].icon}</div>
        <div className="toast-body">
          <div className="toast-title">{toast[this.state.type].title}</div>
          <div className="toast-msg">{this.state.message}</div>
        </div>
        <div className="toast-close">
          <FontAwesomeIcon icon={faXmark} onClick={this.props.onClose} />
        </div>
      </div>
    ) : null;
  }
}
export default ToastMessage;
