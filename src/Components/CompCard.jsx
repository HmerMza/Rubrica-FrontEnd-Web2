import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { DeleteIcon } from "../assets/DeleteIcon";
import { EditIcon } from "../assets/EditIcon";

import PropTypes from "prop-types";
import { useContext } from "react";
import { ProductContext } from "../Hooks/productContext";
import { obtenerToken } from "../Hooks/useToken";
import axios from "axios";
import { Link } from "react-router-dom";

const CompCard = ({ producto }) => {
  const { user } = useContext(ProductContext);
  const { nombre, imagen_url, descripcion, codigo } = producto;
  const token = obtenerToken();
  const probarnumero = (codigo) => {
    const endpointEliminar = `http://localhost:1005/api/products/${codigo}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(endpointEliminar, config)
      .then((response) => {
        console.log("Producto eliminado correctamente:", response);
        // Puedes hacer algo después de eliminar el producto si es necesario
      })
      .catch((error) => {
        console.error("Error al intentar eliminar el producto:", error);
        // Manejar errores aquí
      });
  };

  return (
    <div className="w-[240px]">
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4 className="text-white font-medium text-2xl">{nombre}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={imagen_url}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div className="w-[50%]">
            <p className="text-black text-tiny">{descripcion}</p>
          </div>
          {user ? (
            <>
              <Button
                isIconOnly
                color="success"
                aria-label="Like"
                as={Link}
                to={`/editar/${codigo}`}
              >
                <EditIcon />
              </Button>
              <Button
                isIconOnly
                color="danger"
                aria-label="Like"
                onClick={() => probarnumero(codigo)}
              >
                <DeleteIcon />
              </Button>
            </>
          ) : (
            <Button
              className="text-tiny"
              color="primary"
              radius="full"
              size="sm"
            >
              Comprar
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

CompCard.propTypes = {
  producto: PropTypes.object.isRequired,
};

export default CompCard;
