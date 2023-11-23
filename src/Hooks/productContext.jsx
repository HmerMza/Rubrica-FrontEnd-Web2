import { createContext, useState } from "react";
import { obtenerToken } from "./useToken";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Aquí podrías almacenar datos del usuario si es necesario

  return (
    <ProductContext.Provider value={{ user, setUser }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
