import React, { useEffect, useState } from 'react';
import { LoginUser,LoginCompany } from '../Services/api';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Container } from '@mui/system';
import { Button, TextField } from '@mui/material';
import {useNavigate} from "react-router-dom"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import classes from '../asset/Styles/_Login.module.css'
import images from '../asset/images/login.png'

export default function Login({isUser,setIsUser,login,setLogin,isRegister,setIsRegister}) {

    const navigate = useNavigate();

    useEffect(()=>{
      if(login) {
        navigate("/")
      }
    },[login,navigate])


    const loginSchema = Yup.object().shape({
        email:Yup.string().required("Email alanı boş bırakılamaz!"),
        password : Yup.string().required("Password alanı boş bırakılamaz!")
    });

    const formik = useFormik({
        initialValues: {
            email :"",
            password:""
        },
        validationSchema:loginSchema,
        onSubmit:(values) => {
            if(isUser) {
                LoginUser(values).then(resp =>{
                    localStorage.setItem("token",resp.data.data);
                    localStorage.setItem("type","user");
                    localStorage.setItem("login",true)
                    setLogin(true)
                }).catch(resp=>{
                  NotificationManager.warning(resp.response.data.message);
                })
            }else {
              console.log(values);
                LoginCompany(values).then(resp =>{
                    localStorage.setItem("token",resp.data.data);
                    localStorage.setItem("type","admin");
                    localStorage.setItem("login",true)
                    setLogin(true)

                }).catch(resp=>{
                  NotificationManager.warning(resp.response.data.message);
                })
            }
            
        }
    })

  return (
    <div>
      <img src={images} className={classes.container_img} />
      <Container className={classes.container_login} maxWidth="sm">
        <div style={{padding: "25px"}}>
          <b className={classes.container_login_b}>{isUser ? 'Kullanıcı Girişi' : 'Şirket Girişi'}</b>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            label="Email"
            style={{ width: "95%" }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            helperText={formik.errors.email}
          />
          <TextField
            id="password"
            label="Şifre"
            type="password"
            style={{ width: "95%", marginTop: "20px"}}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.errors.password}
            className={classes.container_login_input}
          />
        </form>
        <div className={classes.container_login_div}>
          <Button variant="contained" type="submit" className={classes.container_login_button}>
            Giriş Yap
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/register")
              setIsRegister(true)
            }}
            className={classes.container_login_button}
          >
            Kayıt Ol
          </Button>
        </div>
        <NotificationContainer/>
      </Container>
    </div>
  );
}

