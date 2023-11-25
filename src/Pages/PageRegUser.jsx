import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PageRegUser = () => {
  //datos de los inputs
  const [nombre, setNombre] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //para reedirigir
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    //creo el objeto que enviare
    const datosUsuario = {
      username,
      password,
      isAdmin: 0,
      nombre,
    };
    const endpoint = "http://localhost:1005/api/registrar";
    // Realizar la solicitud POST usando Axios
    axios
      .post(endpoint, datosUsuario)
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
      <div className="border border-color_borde rounded-xl w-[450px] h-[410px] mt-11 flex flex-col items-center p-8">
        <h4 className="font-poppins text-3xl mb-4">Registrar Usuario</h4>
        <form className="w-full" onSubmit={(e) => handleClick(e)}>
          <Input
            isClearable
            type="text"
            label="Nombre"
            placeholder="Ingrese su nombre"
            className="my-4"
            variant="faded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onClear={() => setNombre("")}
          />

          <Input
            type="email"
            placeholder="ingrese su email"
            label="Correo"
            className="mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="faded"
          />
          <Input
            type="password"
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            className="mb-4"
            variant="faded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button fullWidth color="primary" type="submit">
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PageRegUser;
