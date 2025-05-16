import ReactDOM from "react-dom";
import "../styles/components/Modal.css";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  type = "info", // info | delete | confirm | create | UPDATE
  onConfirm,
  styleUnique = ""
}) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-backdrop") {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={handleOutsideClick}>
      <div className={`modal-content modal-${type}`}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className={"modal-body" + styleUnique}>{children}</div>
        <div className="modal-footer">
          {(type === "delete" || type === "confirm" || type === "create" || type === "update") && (
            <>
              <button onClick={onClose} className="btn --danger">
                Cancelar
              </button>
              <button onClick={onConfirm} className="btn">
                Confirmar
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
