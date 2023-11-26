import { useEffect, useState } from "react";
import CompTabla from "../Components/CompTabla";
import axios from "axios";
import { obtenerToken } from "../Hooks/useToken";

const PageVentas = () => {
  const columns = [
    { name: "NOMBRE", uid: "nombre_cliente" },
    { name: "PRODUCTO", uid: "codigo_producto" },
    { name: "CANTIDAD", uid: "cantidad_vendida" },
    { name: "TOTAL", uid: "total_venta" },
    { name: "ACTIONS", uid: "actions" },
  ];
  //token
  const token = obtenerToken();
  // Configurar la cabecera con el token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //peticiones de axios
  const [ventas, setVentas] = useState([]);
  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1005/api/sales",
          config
        );
        setVentas(response.data); // Guardar las ventas
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };
    obtenerVentas();
  }, [ventas]);
  return (
    <div className="container mx-auto my-7">
      <CompTabla columns={columns} users={ventas} />
    </div>
  );
};

export default PageVentas;
