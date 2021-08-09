import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {ReviewsType} from "../../../redux/reviewsReducer";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}
type PropsTypes = {
    reviews: Array<ReviewsType>
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            style={{width: '70vw', zIndex: 3, color: 'white'}}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography variant='h6' component='p'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(4),
        backgroundColor: `rgba(80, 80, 69, 0.7)`,
        display: 'flex',
        minHeight: '70vh',
        width: '80vw'
    },
    tabs: {
        zIndex: 3,
        borderRight: `1px solid ${theme.palette.divider}`,
        color: 'white',
        width: '30vh'
    },
}));

export const ReviewsTabs:React.FC<PropsTypes> = ({reviews}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {reviews.map((item, index) => {
                    return (
                        <Tab key={item.id} label={item.author} {...a11yProps(index)} />
                    )
                })}
            </Tabs>

            {reviews.map((item, index) => {
                return (
                    <TabPanel key={item.id} value={value} index={index}>
                        {item.content}
                    </TabPanel>
                )
            })}

        </div>
    );
}