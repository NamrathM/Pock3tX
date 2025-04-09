const Toast = ({ message, show }) => {
    return show ? <div className="toast">{message}</div> : null;
  };
  
  export default Toast;
  