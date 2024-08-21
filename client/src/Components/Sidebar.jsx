import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InboxIcon from '@mui/icons-material/Inbox';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [isOpen, setIsOpen] = useState(false); 

    const toggleSidebar = () => {
        setIsOpen(prev => !prev); 
    };

    return (
        <>

            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleSidebar}
                edge="start"
                sx={{ marginRight: 2, display: { xs: 'block', sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>

     
            <Drawer
                variant={isSmallScreen ? 'temporary' : 'permanent'}
                open={isOpen}
                onClose={toggleSidebar}
                ModalProps={{ keepMounted: true }} 
                sx={{
                    width: 130, // se puede ajustar.
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 160, 
                    },
                }}
            >

                <IconButton
                    edge="start"
                    onClick={toggleSidebar}
                    sx={{ margin: 1, display: { xs: 'block', sm: 'none' } }}
                >
                    <CloseIcon />
                </IconButton>


                <List>
                    <ListItem button component={Link} to="/home">
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} to="/profile">
                        <ListItemIcon>
                            <ProfileIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button component={Link} to="/faq">
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="FAQ" />
                    </ListItem>
                    <ListItem button component={Link} to="/all-comissions">
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Comission" />
                    </ListItem>
                    <ListItem button component={Link} to="/create-sale">
                        <ListItemIcon>
                        
                        </ListItemIcon>
                        <ListItemText primary="Create Sale" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export { SideBar };
