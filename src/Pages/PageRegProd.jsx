import { Button, Input, Slider, Textarea } from "@nextui-org/react";
import { useState } from "react";

const PageRegProd = () => {
  const [nombre, setNombre] = useState("");
  return (
    <div className="m-auto flex justify-center">
      <div className="border border-color_borde rounded-xl w-[450px] h-[650px] mt-11 flex flex-col items-center p-8">
        <h4 className="font-poppins text-3xl mb-4">Registrar Producto</h4>
        <form className="w-full">
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
            placeholder="0.00"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            className="mb-4"
            variant="faded"
          />
          <Input
            type="text"
            label="Imagen"
            placeholder="Ingrese url de la imagen"
            className="mb-4"
            variant="faded"
          />
          <Slider
            label="Stock"
            size="sm"
            step={1}
            maxValue={100}
            minValue={1}
            defaultValue={1}
            className="max-w-md mb-4"
          />
          <Textarea
            minRows={5}
            label="Descripcion"
            placeholder="Ingrese una breve descripcion del producto"
            fullWidth
            className="mb-4"
            variant="faded"
          />
          <Button fullWidth color="primary">
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PageRegProd;