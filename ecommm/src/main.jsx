import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { loginUser } from "./redux/action";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import "../src/styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";


const verifiedUser = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null;

if(verifiedUser) store.dispatch(loginUser(verifiedUser));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop/>
      <ToastContainer position="top-center" autoClose={500} />
        <App />
        </BrowserRouter>
    </Provider>
  </StrictMode>
);