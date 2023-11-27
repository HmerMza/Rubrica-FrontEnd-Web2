import { Button, Input, Slider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { obtenerToken } from "../Hooks/useToken";
import axios from "axios";

const PageEditVentas = () => {
  //para direccionar
  const navigate = useNavigate();
  //los datos del producto que necesito
  const [nombreP, setNombreP] = useState("");
  const [valorP, setValorP] = useState("");
  //los datos de los inputs
  const [codigo_producto, setCodigo] = useState(0);
  const [nombre_cliente, setNombre] = useState("");
  const [telefono_cliente, setTelefono] = useState("");
  const [fecha_venta, setFecha] = useState("");
  const [cantidad_vendida, setCantidad] = useState(1);
  const [total_venta, setTotal] = useState("");
  //traigo el codigo de la venta a modificar
  const { codigo } = useParams();
  //obtengo el token que se verificara
  const token = obtenerToken();
  //aqui guardare los datos de la venta entrante
  const [datos, setDatos] = useState({});
  //funcion que me traera la venta a editar
  //funcion encargada de traer la venta
  const ventaEditar = () => {
    const endpoint = `http://localhost:1005/api/sales/${codigo}`;
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
  //funcion encargada de traer el producto
  const productoEditar = () => {
    const endpoint = `http://localhost:1005/api/products/${codigo_producto}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(endpoint, config)
      .then((response) => {
        setNombreP(response.data.nombre);
        setValorP(response.data.precio);
      })
      .catch((error) => {
        console.error("Error producto no encontrado", error);
        // Manejar errores aquí
      });
  };

  useEffect(() => {
    ventaEditar();
  }, []);

  useEffect(() => {
    setNombre(datos.nombre_cliente);
    setTelefono(datos.telefono_cliente);
    setCantidad(datos.cantidad_vendida);
    setCodigo(datos.codigo_producto);
  }, [datos]);

  useEffect(() => {
    productoEditar();
  }, [codigo_producto]);

  //funcion para actualizar una venta
  const actualizarVenta = (e) => {
    e.preventDefault();
    //el codigo
    setCodigo(parseInt(codigo_producto));
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

    const endpoint = `http://localhost:1005/api/sales/${codigo}`;
    // Configurar la cabecera con el token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // Realizar la solicitud POST usando Axios
    axios
      .patch(endpoint, datosVenta, config)
      .then((response) => {
        // Manejar la respuesta si es necesario
        console.log("Respuesta del servidor:", response.data);
        navigate("/ventas");
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error al enviar la solicitud:", error);
      });
  };

  return (
    <div className="m-auto flex justify-center">
      <div className="border border-color_borde rounded-xl w-[450px] h-[610px] mt-11 flex flex-col items-center p-8">
        <h4 className="font-poppins text-3xl mb-4">Editar Venta</h4>
        <form className="w-full" onSubmit={(e) => actualizarVenta(e)}>
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
            Actualizar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PageEditVentas;
