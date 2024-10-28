import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../../Components/axios/axios.instance";

export function SupportTeamCard({ className, settings }) {
    const { user } = useSelector((state) => state.user);
    const [tl, setTl] = useState(null);
    const [trainer, setTrainer] = useState(null);
    const [sgl, setStl] = useState(null);
    useEffect(() => {
        (
            async () => {
                if (user?.settings?.gl) {
                    const res = await api.get("/users/" + user?.settings?.gl);
                    setTl(res.data);
                }
                if (user?.settings?.trainer) {
                    const res = await api.get("/users/" + user?.settings?.trainer);
                    setTrainer(res.data);
                }
                if (user?.settings?.sgl) {
                    const res = await api.get("/users/" + user?.settings?.sgl);
                    setStl(res.data);
                }
            }
        )()
    }, [user])
    return (
        <Card className={`${className} w-full border rounded`}>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                    Dynamic Skillbase Support Team
                </Typography>
            </CardBody>
            <CardFooter>
                <div className=" flex justify-between items-center">
                    <Typography className="text-base font-semibold">
                        My Team Leader
                    </Typography>
                    <Button
                        variant="filled"
                        className="bg-primary gap-2 flex items-center"
                        disabled={!tl}
                    >
                        <a href={`https://wa.me/${tl?.whatsapp}`} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} />
                            Contact
                        </a>
                    </Button>
                </div>
                <div className="mt-5 flex justify-between items-center">
                    <Typography className="text-base font-semibold">
                        My Trainer
                    </Typography>
                    <Button
                        variant="filled"
                        className="bg-primary gap-2 flex items-center"
                        disabled={!trainer}
                    >
                        <a href={`https://wa.me/${trainer?.whatsapp}`} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} />
                            Contact
                        </a>
                    </Button>
                </div>
                <div className="mt-5 flex justify-between items-center">
                    <Typography className="text-base font-semibold">
                        Senior Team Leader
                    </Typography>
                    <Button
                        variant="filled"
                        className="bg-primary gap-2 flex items-center"
                        disabled={!sgl}
                    >
                        <a href={`https://wa.me/${sgl?.whatsapp}`} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} />
                            Contact
                        </a>
                    </Button>
                </div>
            </CardFooter>

        </Card>
    );
}

