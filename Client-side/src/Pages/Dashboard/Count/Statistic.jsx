import {
    List,
    ListItem,
    ListItemSuffix,
    Chip,
    Card,
} from "@material-tailwind/react";

export function Statistic({ data }) {
    return (
        <Card className="w-96 mb-3">
            <List>
                <SigleItem
                    title={"Total Result"}
                    value={data?.count}
                />
                <SigleItem
                    title={"Active"}
                    value={data?.active}
                />
                <SigleItem
                    title={"Inactive"}
                    value={data?.inactive}
                />
                <SigleItem
                    title={"Active Today"}
                    value={data?.todayActive}
                />
                <SigleItem
                    title={"Active This Month"}
                    value={data?.monthActive}
                />
                <SigleItem
                    title={"Form Fillup Today"}
                    value={data?.today}
                />
                <SigleItem
                    title={"Form Fillup This Month"}
                    value={data?.month}
                />
            </List>
        </Card>
    );
}

const SigleItem = ({ title, value }) => {
    return (
        <ListItem>
            {title}
            <ListItemSuffix>
                <Chip
                    value={value}
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    color="orange"
                />
            </ListItemSuffix>
        </ListItem>
    )
}