import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { ProductContext } from "./productContext";
import { useNavigate } from "react-router-dom";

//para guardar el token
export const guardarToken = (token) => {
  let unaHora = 60 * 60 * 1000; // 60 minutos * 60 segundos * 1000 milisegundos
  // Establecer la cookie con el tiempo de expiración calculado
  Cookies.set("token", token, { expires: unaHora });
  //mostrar el token
  console.log(token);
};

//para obtener el token
export const obtenerToken = () => {
  const token = Cookies.get("token");
  if (token) {
    return token;
  } else {
    return false;
  }
};

export const useActiveUser = () => {
  const { user } = useContext(ProductContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      //en caso de estar el usuario activo, no debe ingresar, ni al register, ni al login
      navigate("/");
    }
  }, [user]);
};
