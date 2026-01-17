import AppRoutes from "./routes/AppRoutes";
import PaymentReminder from "./components/user/PaymentReminder";

export default function App() {
  return (
    <>
      <PaymentReminder />
      <AppRoutes />
    </>
  );
}
