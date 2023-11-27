import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Button,
} from "@nextui-org/react";
import { EditIcon } from "../assets/EditIcon";
import { DeleteIcon } from "../assets/DeleteIcon";
import { obtenerToken } from "../Hooks/useToken";
import axios from "axios";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";

const CompTabla = ({ columns, users }) => {
  //para eliminar el registro
  const token = obtenerToken();
  //prueba
  const handleDeleteProduct = (codigo) => {
    toast.warning(
      "Estas seguro de eliminar el registro?",
      {
        cancel: {
          label: "NO",
          onClick: () => {
            console.log("Cancel!");
          },
        },
        action: {
          label: "SI",
          onClick: () => {
            eliminarVenta(codigo);
          },
        },
      },
      { duration: 3000 }
    );
  };
  const eliminarVenta = (codigo) => {
    const endpointEliminar = `http://localhost:1005/api/sales/${codigo}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(endpointEliminar, config)
      .then((response) => {
        console.log("Venta eliminada correctamente:", response);
        toast.success("Venta eliminada Exitosamente", { duration: 2500 });
      })
      .catch((error) => {
        console.error("Error al intentar eliminar el producto:", error);
        // Manejar errores aquí
      });
  };

  //esto viene de nextUI
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "nombre_cliente":
        return (
          <User
            avatarProps={{
              radius: "full",
              src: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png?ga=GA1.1.1991305859.1700527454",
            }}
            name={cellValue}
          ></User>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Button
              isIconOnly
              color="success"
              aria-label="Like"
              as={Link}
              to={`/editar-ventas/${user.codigo}`}
            >
              <EditIcon className="text-xl" />
            </Button>
            <Button
              isIconOnly
              color="danger"
              aria-label="Like"
              onClick={() => {
                handleDeleteProduct(user.codigo);
              }}
            >
              <DeleteIcon className="text-xl" />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table aria-label="Ventas Registradas">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.codigo}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CompTabla;
