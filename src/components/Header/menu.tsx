import { Fragment, useContext, useState } from "react";
import styles from "./header.module.css";
import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItem,
  Divider,
  Drawer,
  Button,
  List,
  Box,
} from "@mui/material";
import { Person, AssignmentInd, Logout, Menu } from "@mui/icons-material";
import { Logo } from "../Logo";
import { AuthContext } from "../../contexts/auth";

type Anchor = "top" | "left" | "bottom" | "right";
interface MenuDrawerProps {
  handleLogout: () => void;
  navigate: (path: string) => void;
}

export default function MenuDrawer({
  handleLogout,
  navigate,
}: MenuDrawerProps) {
  const { user } = useContext(AuthContext);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Logo horizontal />
      <Divider />
      {user && (
        <>
          <p className={styles.user}>{user.email}</p>
          <p className={styles.userMessage}>Seja bem vindo!</p>
          <Divider />
        </>
      )}
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={"Funcionários"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/setores")}>
            <ListItemIcon>
              <AssignmentInd />
            </ListItemIcon>
            <ListItemText primary={"Setores"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Sair"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className={styles.menuDrawwer}>
      <Fragment key={"right"}>
        <Button onClick={toggleDrawer("right", true)}>
          <Menu />
        </Button>
        <Drawer
          closeAfterTransition={true}
          variant="temporary"
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </Fragment>
    </div>
  );
}
