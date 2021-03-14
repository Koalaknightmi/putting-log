import ROUTES from '../../static/routes';
import { Link, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {useState} from 'react';
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

import theme from '../../styles/theme'
import testperms from '../../utils/pathPermissions'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

const Nav = () => {
  const classes = useStyles()
  const [openSidbar,setOpenSidebar] = useState(false)
  const location = useLocation().pathname.replace("/","")
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)

  const toggleDrawer = (o) => (event) =>{
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenSidebar(o)
  }

  return (
      <AppBar>
        <Toolbar>
          <IconButton onClick = {toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           {location.charAt(0).toUpperCase()+location.slice(1)}
          </Typography>
          {isEmpty(auth) && (<Button color="inherit" to = "/Login" component = {Link}>
            Login
          </Button>)}
        </Toolbar>
        <Drawer
          anchor="left"
          open={openSidbar}
          onClose={toggleDrawer(false)}
        >
          <List>
            {
              Object.entries(ROUTES).map(r => ( 
              testperms(r[1],isLoaded(auth),isEmpty(auth),profile,auth,true)  && 
                <ListItem onClick = {toggleDrawer(false,r[0])} key={r[1].route} button to={r[1].route} component={Link}>
                  <ListItemText primary = {r[0]}/>
                </ListItem>
              ))
            }
          </List>
        </Drawer>
      </AppBar>
    );
}

export default Nav