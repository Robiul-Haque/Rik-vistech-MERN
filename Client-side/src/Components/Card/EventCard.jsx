import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardBody,
} from "@material-tailwind/react";

export default function EventCard({ title, desc }) {
  return (
    <Card className="mt-6  w-full shadow-lg border">
      <CardBody className="flex flex-col justify-between">
        <h1 className="text-lg text-center font-semibold">{title}</h1>
        <div className="flex justify-center gap-3 mt-2">
          <div className="flex items-center gap-2" >
            <FontAwesomeIcon icon={faClock} className="text-primary" />
            <p className="text-sm">10:00 AM - 11:00 AM</p>
          </div>

          <div className="flex items-center gap-2" >
            <FontAwesomeIcon icon={faLocationDot} className="text-primary" />
            <p className="text-sm">Bangladesh</p>
          </div>
        </div>
        <p className="text-sm text-center mt-2">
          {desc}
        </p>
        <img src="/images/upcoming.jpg" alt="" />
      </CardBody>
    </Card>
  );
}