import Button from "../button/Button";
import "./ConfirmationModal.css";

function ConfirmationModal({
  data,
  isOpen,
  title = "Confirm",
  message,
  yes,
  no,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay">
      <div className="modal__confirm">
        <div className="confirm-header">{title}</div>
        <div className="confirm-body">
          <p>{message}</p>
          <div className="confirm-actions">
            <Button btnName={no} func={onCancel} />
            <Button btnName={yes} data={data} func={onConfirm} outline={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
