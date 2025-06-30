import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import { createTheme, ThemeProvider } from "@mui/material";
import { green, grey, purple, red } from "@mui/material/colors";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Products from "./pages/Products/Products";
import Searchpage from "./pages/Searchpage/Searchpage";
import Fav from "./pages/fav/Fav";
import Productdetails from "./pages/productdetails/Productdetails";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Checkout from "./pages/Checkout";
import Cat from "./pages/cat/Cat";
import ForgotPassword from "./pages/Resetpassword";
import StripeWrapper from "./StripeWrapper";
import ProductFilterSidebar from "./components/Filter"
import Arwa from "./Arwa";
import AboutUs from "./pages/About";
import InfoPagesLayout from "./InfoPagesLayout";
import PrivacyPolicy from "./pages/Privcy";
import TermsConditions from "./pages/Terms";
import OurServices from "./pages/Services";
import ReturnPolicy from "./pages/Policy";
import FAQ from "./pages/Fqa1";
import StoreLocator from "./pages/Locater";
import ContactUs from "./pages/Contactus";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    text: {
      primary: grey[900],
    },
    error: {
      main: red[300],
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products/:cateogry",
        element: <Products />,
      },
      {
        path: "/search",
        element: <Searchpage />,
      },
      {
        path: "/fav",
        element: <Fav />,
      },
      {
        path: "/products/:cat/:id",
        element: <Productdetails />,
      },
      {
        path: "/cat",
        element: <Cat />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/checkout",
    element: <StripeWrapper />,
  },
  {
    path: "/forgetpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/arwa",
    element: <Arwa />,
  },
  {
    path: "/filter",
    element: <ProductFilterSidebar />,
  },

  {
    path: "/",
    element: <InfoPagesLayout />,
    children: [
      { path: "aboutus", element: <AboutUs /> },
      { path: "privcy", element: <PrivacyPolicy /> },
      { path: "terms", element: <TermsConditions /> },
      { path: "services", element: <OurServices /> },
      { path: "policy", element: <ReturnPolicy /> },
      { path: "fqa", element: <FAQ /> },
      { path: "locator", element: <StoreLocator /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "ContactUs", element: <ContactUs /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <PrimeReactProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Provider>
  </PrimeReactProvider>
);
