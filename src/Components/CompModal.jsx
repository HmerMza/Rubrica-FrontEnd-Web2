import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { MailIcon } from "../assets/MailIcon.jsx";
import { LockIcon } from "../assets/LockIcon.jsx";
import { useContext, useState } from "react";
import axios from "axios";
import { ProductContext } from "../Hooks/productContext.jsx";
import { guardarToken } from "../Hooks/useToken.jsx";
import { Link } from "react-router-dom";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(ProductContext);

  const iniciarSesion = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:1005/api/login", {
        username,
        password,
      });
      const token = response.data.token;
      setUser(response.data.isAdmin);
      guardarToken(token);
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Hubo un error al iniciar sesión:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Iniciar Sesion
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Correo"
                  placeholder="Ingresa tu correo"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Contraseña"
                  placeholder="Ingresa tu Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Link
                    color="primary"
                    to={"/registre-user"}
                    size="sm"
                    onClick={onClose}
                  >
                    Registrarse
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={iniciarSesion}
                  onPress={onClose}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
