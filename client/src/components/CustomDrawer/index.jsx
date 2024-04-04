import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styles from './CustomDrawer.module.css';

const CustomDrawer = ({ openDrawer, toggleDrawer, drawerItems }) => {
    return (
        <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer} className={styles.drawerContainer}>
            <h5 className={styles.drawerHeading}>StoryStreamline</h5>
            <hr className={styles.horizontalRuleOfDrawer} />
            <List className={styles.drawerList}>
                {drawerItems?.map(({ icon: Icon, name }, index) => {
                    return (
                        <>
                            <ListItem key={index}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Icon />
                                    </ListItemIcon>
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </ListItem>
                            {name === 'Create Blog' && <hr className={styles.horizontalRuleOfDrawer} />}
                        </>
                    )
                })}
            </List>
        </Drawer>
    )
}

export default CustomDrawer;