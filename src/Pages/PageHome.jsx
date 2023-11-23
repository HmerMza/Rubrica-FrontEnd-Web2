import { useEffect, useState } from "react";
import CompCard from "../Components/CompCard";
import axios from "axios";

const PageHome = () => {
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get("http://localhost:1005/api/products");
        setProductos(response.data); // Guardar los productos en el estado
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <>
      <div className="flex justify-around items-center m-auto flex-wrap">
        {productos.map((producto, index) => (
          <CompCard producto={producto} key={index} />
        ))}
      </div>
    </>
  );
};

export default PageHome;
