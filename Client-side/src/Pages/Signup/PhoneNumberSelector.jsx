import React, { useEffect, useState } from "react";
import { useCountries } from "use-react-countries";
import {
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";

export function PhoneNumberSelector({ state, setState, countrySelected, placeholder }) {

    const [country, setCountry] = React.useState(1);
    const { name, flags, countryCallingCode } = countries[country];
    const [value, setValue] = useState("");
    useEffect(() => {
        if (countrySelected) {
            setCountry(countries.findIndex((item) => item.name === countrySelected))
        }
    }, [countrySelected])
    useEffect(() => {
        setState(value.includes(countryCallingCode) ? value : `${countryCallingCode}${value}`)
    }, [value, countryCallingCode, setState])
    return (
        <div className="">
            <label className="text-xs mb-1">{placeholder}</label>
            <div className="relative flex w-full">
                <Menu placement="bottom-start">
                    <MenuHandler>
                        <Button
                            ripple={false}
                            variant="text"
                            color="blue-gray"
                            className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                        >
                            <img
                                src={flags.svg}
                                alt={name}
                                className="h-4 w-4 rounded-full object-cover"
                            />
                            {countryCallingCode}
                        </Button>
                    </MenuHandler>
                    <MenuList className="max-h-[20rem] max-w-[18rem]">
                        {countries.map(({ name, flags, countryCallingCode }, index) => {
                            return (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    className="flex items-center gap-2"
                                    onClick={() => setCountry(index)}
                                >
                                    <img
                                        src={flags.svg}
                                        alt={name}
                                        className="h-5 w-5 rounded-full object-cover"
                                    />
                                    {name} <span className="ml-auto">{countryCallingCode}</span>
                                </MenuItem>
                            );
                        })}
                    </MenuList>
                </Menu>
                <Input
                    type="number"
                    name="phone"
                    placeholder={placeholder}
                    className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    containerProps={{
                        className: "min-w-0",
                    }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    );
}

const countries = [
    {
        name: 'Bangladesh',
        capital: 'Dhaka',
        currencies: [{
            name: 'Bangladeshi taka',
            symbol: '৳'
        }],
        languages: ['Bengali'],
        coordinates: [24, 90],
        area: 147570,
        maps: {
            googleMaps: 'https://goo.gl/maps/op6gmLbHcvv6rLhH6',
            openStreetMaps: 'https://www.openstreetmap.org/relation/184640'
        },
        population: 164689383,
        postalCode: {
            format: '####',
            regex: '^(\\d{4})$'
        },
        flags: {
            png: 'https://flagcdn.com/w320/bd.png',
            svg: 'https://flagcdn.com/bd.svg'
        },
        emoji: '🇧🇩',
        countryCallingCode: '+88'
    },
    {
        name: 'Pakistan',
        capital: 'Islamabad',
        currencies: [{
            name: 'Pakistani rupee',
            symbol: '₨'
        }],
        languages: ['English', 'Urdu'],
        coordinates: [30, 70],
        area: 881912,
        maps: {
            googleMaps: 'https://goo.gl/maps/5LYujdfR5yLUXoERA',
            openStreetMaps: 'https://www.openstreetmap.org/relation/307573'
        },
        population: 220892331,
        postalCode: {
            format: '#####',
            regex: '^(\\d{5})$'
        },
        flags: {
            png: 'https://flagcdn.com/w320/pk.png',
            svg: 'https://flagcdn.com/pk.svg'
        },
        emoji: '🇵🇰',
        countryCallingCode: '+92'
    },
    {
        name: 'India',
        capital: 'New Delhi',
        currencies: [{
            name: 'Indian rupee',
            symbol: '₹'
        }],
        languages: ['English', 'Hindi', 'Tamil'],
        coordinates: [20, 77],
        area: 3287590,
        maps: {
            googleMaps: 'https://goo.gl/maps/WSk3fLwG4vtPQetp7',
            openStreetMaps: 'https://www.openstreetmap.org/relation/304716'
        },
        population: 1380004385,
        postalCode: {
            format: '######',
            regex: '^(\\d{6})$'
        },
        flags: {
            png: 'https://flagcdn.com/w320/in.png',
            svg: 'https://flagcdn.com/in.svg'
        },
        emoji: '🇮🇳',
        countryCallingCode: '+91'
    },
    {
        name: 'Saudi Arabia',
        capital: 'Riyadh',
        currencies: [{
            name: 'Saudi riyal',
            symbol: 'ر.س'
        }],
        languages: ['Arabic'],
        coordinates: [25, 45],
        area: 2149690,
        maps: {
            googleMaps: 'https://goo.gl/maps/5PSjvdJ1AyaLFRrG9',
            openStreetMaps: 'https://www.openstreetmap.org/relation/307584'
        },
        population: 34813867,
        postalCode: {
            format: '#####',
            regex: '^(\\d{5})$'
        },
        flags: {
            png: 'https://flagcdn.com/w320/sa.png',
            svg: 'https://flagcdn.com/sa.svg'
        },
        emoji: '🇸🇦',
        countryCallingCode: '+966'
    },
    {
        name: 'United Arab Emirates',
        capital: 'Abu Dhabi',
        currencies: [{
            name: 'United Arab Emirates dirham',
            symbol: 'د.إ'
        }],
        languages: ['Arabic'],
        coordinates: [24, 54],
        area: 83600,
        maps: {
            googleMaps: 'https://goo.gl/maps/AZZTDA6GzVAnKMVd8',
            openStreetMaps: 'https://www.openstreetmap.org/relation/307763'
        },
        population: 9890400,
        flags: {
            png: 'https://flagcdn.com/w320/ae.png',
            svg: 'https://flagcdn.com/ae.svg'
        },
        emoji: '🇦🇪',
        countryCallingCode: '+971'
    },
    {
        name: 'Malaysia',
        capital: 'Kuala Lumpur',
        currencies: [{
            name: 'Malaysian ringgit',
            symbol: 'RM'
        }],
        languages: ['English', 'Malay'],
        coordinates: [2.5, 112.5],
        area: 330803,
        maps: {
            googleMaps: 'https://goo.gl/maps/qrY1PNeUXGyXDcPy6',
            openStreetMaps: 'https://www.openstreetmap.org/relation/2108121'
        },
        population: 32365998,
        postalCode: {
            format: '#####',
            regex: '^(\\d{5})$'
        },
        flags: {
            png: 'https://flagcdn.com/w320/my.png',
            svg: 'https://flagcdn.com/my.svg'
        },
        emoji: '🇲🇾',
        countryCallingCode: '+60'
    },
    {
        name: 'Nepal',
        capital: 'Kathmandu',
        currencies: [{
            name: 'Nepalese rupee',
            symbol: '₨'
        }],
        languages: ['Nepali'],
        coordinates: [28, 84],
        area: 147181,
        maps: {
            googleMaps: 'https://goo.gl/maps/UMj2zpbQp7B5c3yT7',
            openStreetMaps: 'https://www.openstreetmap.org/relation/184633'
        },
        population: 29136808,
        postalCode: {
            format: '#####',
            regex: '^(\\d{5})$'
        },
        flags: {
            png: 'https://flagcdn.com/w320/np.png',
            svg: 'https://flagcdn.com/np.svg'
        },
        emoji: '🇳🇵',
        countryCallingCode: '+977'
    }];