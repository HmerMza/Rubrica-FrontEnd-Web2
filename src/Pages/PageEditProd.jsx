import { Button, Input, Slider, Textarea } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { obtenerToken, useActiveUser } from "../Hooks/useToken";
import { useParams } from "react-router-dom";
import axios from "axios";

const PageEditProd = () => {
  //aqui guardare los datos del obtjeto entrante
  const [datos, setDatos] = useState({});
  //estos son los datos de los inputs
  const [nombre, setNombre] = useState("datos.nombre");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad_en_stock, setStock] = useState(1);
  const [imagen_url, setImagen] = useState("");

  //traigo el codigo del producto a modificar
  const { codigo } = useParams();
  //obtengo el token que se verificara
  const token = obtenerToken();
  //funcion encargada de traer el producto
  const productoEditar = () => {
    const endpoint = `http://localhost:1005/api/products/${codigo}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(endpoint, config)
      .then((response) => {
        setDatos(response.data);
      })
      .catch((error) => {
        console.error("Error producto no encontrado", error);
        // Manejar errores aquí
      });
  };

  //para que se obtenga 1 sola vez los productos
  useEffect(() => {
    productoEditar();
  }, []);
  //para que se carguen los datos en los inputs
  useEffect(() => {
    setPrecio(datos.precio);
    setStock(datos.cantidad_en_stock);
    setNombre(datos.nombre);
    setDescripcion(datos.descripcion);
    setImagen(datos.imagen_url);
  }, [datos]);
  //los nuevos datos del producto
  const datosProducto = {
    nombre,
    descripcion,
    precio,
    cantidad_en_stock,
    imagen_url,
  };

  const handleClick = (e) => {
    e.preventDefault();
    const endpoint = `http://localhost:1005/api/products/${codigo}`;

    // Configurar la cabecera con el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Realizar la solicitud POST usando Axios
    axios
      .patch(endpoint, datosProducto, config)
      .then((response) => {
        // Manejar la respuesta si es necesario
        console.log("Respuesta del servidor:", response.data);
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
      });
  };

  useActiveUser();
  return (
    <div className="m-auto flex justify-center">
      <div className="border border-color_borde rounded-xl w-[450px] h-[650px] mt-11 flex flex-col items-center p-8">
        <h4 className="font-poppins text-3xl mb-4">Editar Producto</h4>
        <form className="w-full" onSubmit={handleClick}>
          <Input
            isClearable
            type="text"
            label="Nombre"
            placeholder="Ingrese el nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onClear={() => setNombre("")}
            className="my-4"
          />
          <Input
            type="number"
            label="Precio"
            placeholder="0.00"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            className="mb-4"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <Input
            type="text"
            label="Imagen"
            placeholder="Ingrese url de la imagen"
            className="mb-4"
            value={imagen_url}
            onChange={(e) => setImagen(e.target.value)}
          />
          <Slider
            label="Stock"
            size="sm"
            step={1}
            maxValue={100}
            minValue={1}
            defaultValue={1}
            className="max-w-md mb-4"
            value={cantidad_en_stock}
            onChange={(e) => setStock(e)}
          />
          <Textarea
            minRows={5}
            label="Descripcion"
            placeholder="Ingrese una breve descripcion del producto"
            fullWidth
            className="mb-4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <Button fullWidth color="primary" type="submit">
            Guardar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PageEditProd;
