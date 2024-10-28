import {
    Card
} from "@material-tailwind/react";

export function NormalCard({ className, children }) {
    return (
        <Card className={`${className} w-full border rounded`}>
            {children}
        </Card>
    );
}

