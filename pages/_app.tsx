import Footer from "../components/Footer";
import Header from "../components/Header";
import { AppProvider } from "../context/AppContext";
import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <AppProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ToastContainer />
    </AppProvider>
  );
}

export default MyApp;
