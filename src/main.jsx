import React from "react";
import ReactDOM from "react-dom/client";

import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
