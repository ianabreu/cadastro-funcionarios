import React, { ReactNode } from "react";

import styles from "./modal.module.css";
import { Close } from "@mui/icons-material";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  const outsideRef = React.useRef(null);

  function handleCloseOnOverlay(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (e.target === outsideRef.current) {
      onClose();
    }
  }

  return isOpen ? (
    <div className={styles.modal}>
      <div
        ref={outsideRef}
        className={styles.modal__overlay}
        onClick={handleCloseOnOverlay}
      />
      <div className={styles.modal__box}>
        <div className={styles.modal__header}>
          <button className={styles.modal__close} onClick={onClose}>
            <Close />
          </button>
          <h6 className={styles.modal__title}>{title}</h6>
        </div>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </div>
  ) : null;
};
