import React from "react";
import {
    Button,
    Dialog,
    DialogFooter,
} from "@material-tailwind/react";

export function BlankDialog({ open, setOpen, children, size }) {

    const handleOpen = () => setOpen(!open);

    return (
        <Dialog open={open} handler={handleOpen} className="w-full overflow-y-auto max-h-[90vh]" size={size ? size : "md"}>
            {children}
            <DialogFooter>

                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}