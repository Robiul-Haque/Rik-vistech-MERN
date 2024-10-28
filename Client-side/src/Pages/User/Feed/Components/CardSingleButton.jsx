import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

export function CardSingleButton({ className, title, onClick, button, link }) {
    return (
        <Card className={`${className} w-full border rounded`}>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                    {title}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-center">
                {
                    link?.length == 0 ? (
                        <Button
                            className="bg-primary"
                            variant="filled"
                        >
                            {button}
                        </Button>
                    )
                        :
                        (
                            <a href={link} target="_blank" rel="noreferrer">
                                <Button
                                    className="bg-primary"
                                    onClick={onClick}
                                    variant="filled"
                                >
                                    {button}
                                </Button>
                            </a>
                        )
                }
            </CardFooter>
        </Card>
    );
}

