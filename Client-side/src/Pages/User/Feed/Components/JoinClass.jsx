import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

export function JoinClass({ className, title, link }) {
    return (
        <Card
            className={`${className} w-full border rounded shadow-blue-blue-100 hover:shadow-lg`}
        >
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                    {title}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
                {
                    link ?
                        <a className="btn btn-primary"
                            target="_blank"
                            rel="noreferrer"
                            href={link}>Join Class</a>
                        :
                        <button className="btn">Join Class</button>
                }
            </CardFooter>
        </Card>
    );
}

