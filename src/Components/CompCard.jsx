import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { DeleteIcon } from "../assets/DeleteIcon";

import PropTypes from "prop-types";

const CompCard = ({ producto }) => {
  const { title, img, descripcion } = producto;
  return (
    <div className="w-[240px]">
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4 className="text-white font-medium text-2xl">{title}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={img}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">Available soon.</p>
            <p className="text-black text-tiny">Get notified.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Comprar
          </Button>
          <Button isIconOnly color="danger" aria-label="Like">
            <DeleteIcon />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

CompCard.propTypes = {
  producto: PropTypes.object.isRequired,
};

export default CompCard;
