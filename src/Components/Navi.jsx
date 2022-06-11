import { AppBar, Avatar, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React,{useState} from 'react';
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from 'react-router-dom';
import MenuIcon from "@mui/icons-material/Menu";
import classes from "../asset/Styles/_Navbar.module.css";
import images from "../asset/images/STAJ.png";

export default function Navi({isUser,setIsUser,login,setLogin,isRegister}) {

    const pages = [{ link: "/", name: "Ana Sayfa" }];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {

        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };


    return (
      <div>
        <AppBar position="static" className={classes.container_navbar}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                className={classes.container_typography}
                // sx={{
                //   mr: 2,
                //   display: { xs: "none", md: "flex" },
                //   fontFamily: "monospace",
                //   fontWeight: 700,
                //   letterSpacing: ".3rem",
                //   color: "inherit",
                //   textDecoration: "none",
                //   cursor: "auto",
                // }}
                
              >
                <img src={images} />
              </Typography>
  
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" }}}
                >
                  {login && pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography onClick={() => navigate(page.link)} textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {login && pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => {handleCloseNavMenu(); navigate(page.link)}}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
  
              <Box sx={{ flexGrow: 0 }}>
                {!login && !isRegister && (
                  <Button variant="contained" className={classes.container_typography_btn} onClick={() => setIsUser(!isUser)}>
                    {isUser === true ? 'Şirket Girişi' : 'Kullanıcı Girişi'}
                  </Button>
                )}

                {!login && isRegister && (
                  <Button
                    variant="contained"
                    style={{ marginRight: "10px" }}
                    onClick={() => setIsUser(!isUser)}
                  >
                    {isUser === true ? 'Şirket Kayıt Ekranı' : 'Kullanıcı Kayıt Ekranı'}
                  </Button>
                )}
                {login && (
                  <>
                    <Tooltip title="Şeçenekleri Gör">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                     
                      { isUser === true && (
                         <MenuItem
                         onClick={() => {         
                             handleCloseUserMenu();                
                           navigate("/myapppost")
                         }}
                       >
                         <Typography textAlign="center">Başvurduğum ilanlar</Typography>
                       </MenuItem>
                      )}

                      {isUser === false && (
                         <MenuItem
                         onClick={() => {         
                             handleCloseUserMenu();                
                           navigate("/mycompanypost")
                         }}
                       >
                         <Typography textAlign="center">Oluşturduğum ilanlar</Typography>
                       </MenuItem>
                      )}

                      {isUser === false && (
                         <MenuItem
                         onClick={() => {         
                             handleCloseUserMenu();                
                           navigate("/addpost")
                         }}
                       >
                         <Typography textAlign="center">İlan Oluştur</Typography>
                       </MenuItem>
                      )}
                     
                      <MenuItem
                        onClick={() => {         
                            handleCloseUserMenu();                
                          localStorage.removeItem("token");
                          localStorage.setItem("login",false);
                          setLogin(false);
                          navigate("/login")
                        }}
                      >
                        <Typography textAlign="center">Çıkış Yap</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    );
}
