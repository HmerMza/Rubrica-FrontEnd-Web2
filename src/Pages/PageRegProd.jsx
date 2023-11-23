import { Button, Input, Slider, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { obtenerToken } from "../Hooks/useToken";
import axios from "axios";

const PageRegProd = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [cantidad_en_stock, setStock] = useState(1);
  const [imagen_url, setImagen] = useState("");

  const token = obtenerToken();
  const datosProducto = {
    nombre,
    descripcion,
    precio,
    cantidad_en_stock,
    imagen_url,
  };

  const handleClick = (e) => {
    e.preventDefault();
    const endpoint = "http://localhost:1005/api/products";

    // Configurar la cabecera con el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Realizar la solicitud POST usando Axios
    axios
      .post(endpoint, datosProducto, config)
      .then((response) => {
        // Manejar la respuesta si es necesario
        console.log("Respuesta del servidor:", response.data);
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
      });
  };
  return (
    <div className="m-auto flex justify-center">
      <div className="border border-color_borde rounded-xl w-[450px] h-[650px] mt-11 flex flex-col items-center p-8">
        <h4 className="font-poppins text-3xl mb-4">Registrar Producto</h4>
        <form className="w-full" onSubmit={(e) => handleClick(e)}>
          <Input
            isClearable
            type="text"
            label="Nombre"
            placeholder="Ingrese el nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onClear={() => setNombre("")}
            className="my-4"
            variant="faded"
          />

          <Input
            type="number"
            label="Precio"
            placeholder="00"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            className="mb-4"
            variant="faded"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <Input
            type="text"
            label="Imagen"
            placeholder="Ingrese url de la imagen"
            className="mb-4"
            variant="faded"
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
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PageRegProd;
