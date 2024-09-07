import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import './App.css'
import "./index.css";
import {Provider} from 'react-redux'



import router from "./routes/router.jsx";
import { store } from "./redux/store.js";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);


