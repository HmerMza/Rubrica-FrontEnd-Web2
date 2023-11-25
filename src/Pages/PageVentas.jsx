import { Button, Input, Slider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerToken, useActiveUser } from "../Hooks/useToken";
import axios from "axios";

const PageVentas = () => {
  useActiveUser();
  //pare redirigir
  const navigate = useNavigate();
  //aqui guardare los datos del obtjeto entrante
  const [datos, setDatos] = useState({});
  //traigo el codigo del producto a modificar
  const { codigo } = useParams();
  //obtengo el token que se verificara
  const token = obtenerToken();
  //los datos del producto que necesito
  const [nombreP, setNombreP] = useState("");
  const [valorP, setValorP] = useState("");

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
    setValorP(datos.precio);
    setNombreP(datos.nombre);
  }, [datos]);
  //datos que enviaremos en el cuerpo
  const [nombre_cliente, setNombre] = useState("");
  const [telefono_cliente, setTelefono] = useState("");
  const [fecha_venta, setFecha] = useState("");
  const [cantidad_vendida, setCantidad] = useState(1);
  const [total_venta, setTotal] = useState("");

  //funcion para registrar venta
  const handleClick = (e) => {
    e.preventDefault();
    //codigo
    const codigo_producto = parseInt(codigo);
    //para la fecha
    const fechaActual = new Date().toISOString().slice(0, 10);
    setFecha(fechaActual);
    //total
    setTotal(cantidad_vendida * valorP);

    //objeto a enviar
    const datosVenta = {
      codigo_producto,
      nombre_cliente,
      telefono_cliente,
      fecha_venta,
      cantidad_vendida,
      total_venta,
    };

    const endpoint = `http://localhost:1005/api/sales`;

    // Configurar la cabecera con el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Realizar la solicitud POST usando Axios
    axios
      .post(endpoint, datosVenta, config)
      .then((response) => {
        // Manejar la respuesta si es necesario
        console.log("Respuesta del servidor:", response.data);
        navigate("/");
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
      });
  };
  return (
    <div className="m-auto flex justify-center">
      <div className="border border-color_borde rounded-xl w-[450px] h-[610px] mt-11 flex flex-col items-center p-8">
        <h4 className="font-poppins text-3xl mb-4">Registrar Venta</h4>
        <form className="w-full" onSubmit={(e) => handleClick(e)}>
          <Input
            type="text"
            label="Nombre"
            placeholder="Ingrese el nombre del cliente"
            className="my-4"
            variant="faded"
            value={nombre_cliente}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            type="number"
            label="Telefono"
            placeholder="000 000 0000"
            className="mb-4"
            variant="faded"
            value={telefono_cliente}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <Slider
            label="Cantidad"
            size="sm"
            step={1}
            maxValue={100}
            minValue={1}
            defaultValue={1}
            className="max-w-md mb-4"
            value={cantidad_vendida}
            onChange={(e) => setCantidad(e)}
          />
          <Input
            isDisabled
            type="text"
            label="Nombre del Producto"
            className="mb-4"
            variant="faded"
            value={nombreP}
          />
          <Input
            isDisabled
            type="text"
            label="Valor del Producto"
            className="mb-4"
            variant="faded"
            value={valorP}
          />
          <Input
            isDisabled
            type="text"
            label="Total"
            className="mb-4"
            variant="faded"
            value={cantidad_vendida * valorP}
          />

          <Button fullWidth color="primary" type="submit">
            Vender
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PageVentas;
