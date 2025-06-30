import React, { useEffect, useLayoutEffect, useState } from "react";
import { Box, Typography, Badge } from "@mui/material";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../store/store";
import { lgoinuser, setuser, signout } from "../store/user/userSlice";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Payment from "./Payment";
import { IconButton } from "@mui/material"
import CustomizedDialogs from "./Dialoglogin";
import { Usedialogcontext } from "./contextdialog/Createcontexdialog";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const n = createSelector(
  (state: RootState) => state.cart.products,
  (products) => products.reduce((acu, cur) => acu + cur.n, 0)
);
const HeaderIcons: React.FC = () => {
  const username = useAppSelector((state) => state.user.username);
  const loading = useAppSelector((state) => state.user.loading);
  const numberofallproducts = useAppSelector(n);

  const { handleClickOpen = () => {}, opendialog = false } =
    Usedialogcontext() || {};

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handlefav = () => {
    if (username) {
      navigate("/fav");
    } else {
      handleClickOpen();
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    if (username) {
      setOpen(newOpen);
    } else {
      handleClickOpen();
    }
  };

  const loginstate = () => {
    if (username) {
      signOut(auth)
        .then(() => dispatch(signout()))
        .catch(() => {});
    } else {
      navigate("/login");
    }
  };

  if (loading === "pending") return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: "#000",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Box
          onClick={loginstate}
          sx={{ display: "flex", textDecoration: "none", alignItems: "center" }}
        >
          <AccountCircleIcon sx={{ fontSize: "37px", color: "black" }} />
          <Typography
            sx={{ fontSize: "18px", color: "black", fontWeight: "bold" }}
          >
            {username ? "Logout" : "Login"}
          </Typography>
        </Box>
        <Box>
          <IconButton disabled={opendialog}>
            <FavoriteBorderIcon
              sx={{ fontSize: "27px", color: "black" }}
              onClick={handlefav}
            />
          </IconButton>
        </Box>
      </Box>

      <Box display="flex" alignItems="center">
        <IconButton onClick={toggleDrawer(true)} disabled={opendialog}>
          <Badge
            badgeContent={username ? numberofallproducts : null}
            color="error"
            sx={{ mr: 0.5 }}
          >
            <AddShoppingCartRoundedIcon sx={{ fontSize: "30px" }} />
          </Badge>
        </IconButton>
      </Box>

      <Payment toggleDrawer={toggleDrawer} open={open} />
    </Box>
  );
};

export default React.memo(HeaderIcons);

