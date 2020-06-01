import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { List, ListItemIcon, ListItemText, ListItem } from '@material-ui/core';
import { MoveToInbox, Mail } from '@material-ui/icons';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

export default function ButtonAppBar({ children }) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
        bottom: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        setState({ ...state, [anchor]: open });
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer("left", true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {"Calendario"}
                    </Typography>
                    <Button color="inherit">salir</Button>
                </Toolbar>
            </AppBar>
            <CssBaseline />
            <Container fixed>
                {/* <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} /> */}
                {children}
                <SwipeableDrawer
                    anchor={"left"}
                    open={state.left}
                    onClose={toggleDrawer("left", false)}
                    onOpen={toggleDrawer("left", true)}
                >
                    <div
                        className={classes.list}
                        role="presentation"
                        onClick={toggleDrawer("left", false)}
                        onKeyDown={toggleDrawer("left", false)}
                    >
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                    {/* {list(anchor)} */}
                </SwipeableDrawer>
            </Container>
        </div>
    );
}
