import React from "react";
import ReactDOM from "react-dom/client";

import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/index.jsx";
import ProductProvider from "./Hooks/productContext.jsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <NextUIProvider>
      <ProductProvider>
        <RouterProvider router={router} />
      </ProductProvider>
    </NextUIProvider>
  </React.StrictMode>
);
