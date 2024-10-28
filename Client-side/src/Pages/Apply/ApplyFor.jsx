import React from 'react';
import { Button, Input, Option, Select, Textarea, Typography } from "@material-tailwind/react";
import toast from 'react-hot-toast';
import imageRunning from './image.png'
const ApplyFor = () => {
    const roles = [
        "Trainer",
        "Team Leader",
        "Senior Team Leader",
        "Teacher",
        "Checker",
        "Manager",
        "Accountant",
        "Senior Accountant",
        "Controler",
        "Senior Controler",
        "Telecaller",
        "Counselor",
        "Senior Counselor",
        "Lead Checker",
        "Audit",
        "Support",
    ]
    const [selected, setSelected] = React.useState("");
    const submit = (e) => {
        e.preventDefault()
        // const values = Object.fromEntries(new FormData(e.target));
        if (!selected) {
            toast.error("Please select a role")
            return
        }
        toast.success("Your application has been sent to the admin. We will contact you soon.")
    }
    console.log(selected)
    return (
        <section className="px-8 py-8 lg:py-16 lg:mt-20 bg-white">
            <div className="container mx-auto text-center">
                <Typography
                    variant="h1"
                    color="blue-gray"
                    className="mb-4 !text-3xl lg:!text-5xl"
                >
                    Apply For Sub Admin
                </Typography>
                <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto lg:max-w-3xl !text-gray-500">
                    Whether it&apos;s a question about our services, a request for
                    technical assistance, or suggestions for improvement, our team is
                    eager to hear from you.
                </Typography>
                <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-center">
                    <img
                        src={imageRunning}
                        alt="map"
                        className="w-full h-full rounded lg:max-h-[510px]"
                    />
                    <form
                        action="#"
                        className="flex flex-col gap-4 lg:max-w-full"
                        onSubmit={submit}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Typography
                                    variant="small"
                                    className="mb-2 text-left font-medium !text-gray-900"
                                >
                                    Name
                                </Typography>
                                <Input
                                    required
                                    color="gray"
                                    size="lg"
                                    placeholder="First Name"
                                    name="firstName"
                                    className="focus:border-t-gray-900"
                                    containerProps={{
                                        className: "min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                            </div>
                            <div className="col-span-2">
                                <Typography
                                    variant="small"
                                    className="mb-2 text-left font-medium !text-gray-900"
                                >
                                    Subject
                                </Typography>
                                <Input
                                    required
                                    color="gray"
                                    size="lg"
                                    placeholder="Last Name"
                                    name="subject"
                                    className="focus:border-t-gray-900"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <Select label="Select Department"
                                color="gray"
                                size="lg"
                                required
                                onChange={(e) => setSelected(e)}
                            >
                                {
                                    roles.map((role, index) => <Option value={index} key={index}>
                                        {role}
                                    </Option>
                                    )
                                }
                            </Select>
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                className="mb-2 text-left font-medium !text-gray-900"
                            >
                                Your Email
                            </Typography>
                            <Input
                                required
                                color="gray"
                                size="lg"
                                placeholder="name@email.com"
                                name="email"
                                className="focus:border-t-gray-900"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>

                        <Button className="w-full" color="gray" type='submit'>
                            Apply Now
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ApplyFor;