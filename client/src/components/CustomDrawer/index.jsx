import React, { Fragment } from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styles from './CustomDrawer.module.css';

const CustomDrawer = ({ openDrawer, toggleDrawer, drawerTitle, drawerItems }) => {
    const pathname = useLocation().pathname;

    return (
        <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer} className={styles.drawerContainer}>
            <h5 className={styles.drawerHeading}>{drawerTitle}</h5>
            <hr className={styles.horizontalRuleOfDrawer} />
            <List className={styles.drawerList}>
                {drawerItems?.map(({ icon: Icon, name, navigateTo }, index) => {
                    return (
                        <Fragment key={index}>
                            <Link to={navigateTo} onClick={() => toggleDrawer(name)}>
                                <ListItem className={styles.drawerListItem}>
                                    <ListItemButton className={[pathname === navigateTo && styles.activeLink].join('')}>
                                        <ListItemIcon>
                                            <Icon />
                                        </ListItemIcon>
                                        <ListItemText primary={name} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                            {name === 'Create Blog' && <hr className={styles.horizontalRuleOfDrawer} />}
                        </Fragment>
                    )
                })}
            </List>
        </Drawer>
    )
}

export default CustomDrawer;