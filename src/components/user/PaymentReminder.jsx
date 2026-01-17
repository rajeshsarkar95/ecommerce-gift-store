import { useEffect, useState } from "react";

const PaymentReminder = () => {
  const [canClose, setCanClose] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanClose(true);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>⚠️ Payment Reminder</h2>

        <p style={styles.message}>
          Please pay due amount to developer
        </p>

        {!canClose && (
          <p style={styles.warning}>
            This message cannot be skipped for 5 minutes
          </p>
        )}

        <button
          disabled={!canClose}
          onClick={() => setVisible(false)}
          style={{
            ...styles.button,
            ...(canClose ? styles.buttonActive : styles.buttonDisabled),
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentReminder;
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "30px",
    width: "360px",
    borderRadius: "12px",
    textAlign: "center",
    position: "relative",
  },
  title: {
    marginBottom: "15px",
    color: "#d32f2f",
  },
  message: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  warning: {
    marginTop: "10px",
    color: "#ff0000",
    fontSize: "14px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 25px",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
  },
  buttonActive: {
    backgroundColor: "#1976d2",
    color: "#fff",
    cursor: "pointer",
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
    color: "#555",
    cursor: "not-allowed",
  },
};
