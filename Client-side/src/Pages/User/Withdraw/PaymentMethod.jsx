import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function PaymentMethod({ active, name, number, icon, onClick }) {
  return (
    <Card onClick={onClick} className={`mt-6 w-full hover:border border-primary border border-transparent ${active && "border border-primary"}`} >
      <CardBody className="flex gap-5 items-start relative payment-method-card">
        <img
          src={icon}
          alt={name}
          className="w-[50px] h-[50px] rounded-full"
        />
        <div>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {name}
          </Typography>
          <Typography>
            Account: {number}
          </Typography>
        </div>
        <button className="absolute right-4 top-4 pencil">
          <FontAwesomeIcon icon={faPencil} />
        </button>
      </CardBody>
    </Card>
  );
}