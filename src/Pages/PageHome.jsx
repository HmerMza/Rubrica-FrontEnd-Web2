import CompCard from "../Components/CompCard";
import Productos from "../Data/listPrueba";

const PageHome = () => {
  const productos = Productos;
  return (
    <>
      <div className="flex justify-around items-center m-auto flex-wrap">
        {productos.map((producto, index) => (
          <CompCard producto={producto} key={index} />
        ))}
      </div>
    </>
  );
};

export default PageHome;
