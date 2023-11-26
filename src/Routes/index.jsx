import { createBrowserRouter } from "react-router-dom";

import LayoutPrincipal from "../Layouts/LayoutPrincipal";
import PageHome from "../Pages/PageHome";
import PageEditProd from "../Pages/PageEditProd";
import PageRegProd from "../Pages/PageRegProd";
import PageRegUser from "../Pages/PageRegUser";
import PageNewVentas from "../Pages/PageNewVentas";
import PageVentas from "../Pages/PageVentas";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPrincipal />,
    children: [
      {
        index: true,
        element: <PageHome />,
      },
      {
        path: "/Editar/:codigo",
        element: <PageEditProd />,
      },
      {
        path: "/Registrar",
        element: <PageRegProd />,
      },
      {
        path: "/registre-user",
        element: <PageRegUser />,
      },
      {
        path: "/ventas/:codigo",
        element: <PageNewVentas />,
      },
      {
        path: "/prueba",
        element: <PageVentas />,
      },
    ],
  },
]);
