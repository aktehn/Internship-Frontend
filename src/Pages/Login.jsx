import React, { useEffect, useState } from 'react';
import { LoginUser,LoginCompany } from '../Services/api';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Container } from '@mui/system';
import { Button, TextField } from '@mui/material';
import {useNavigate} from "react-router-dom"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

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
        <Container
        maxWidth="sm"
        style={{
          marginTop: "200px",
          textAlign: "center",
        }}
      >
        <b style={{ fontSize: "40px" }}>{isUser ? 'Kullanıcı Girişi' : 'Şirket Girişi'}</b>
        <p onClick={() => {
            navigate("/register") 
            setIsRegister(true)}
      
      }>
          Kayıtlı değilmisin{" "}
          <b style={{ color: "#8CC0DE", cursor: "pointer" }}>buraya</b> tıklayarak
          kayıt ol
        </p>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            style={{ width: "100%" }}
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
            variant="filled"
            style={{ width: "100%", marginTop: "20px" }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            helperText={formik.errors.password}
          />
          <Button
            variant="contained"
            style={{ width: "25%", marginTop: "20px" }}
            type="submit"
          >
            Giriş Yap
          </Button>
        </form>
  
        <Button
          variant="contained"
          style={{ width: "25%", marginTop: "20px", marginBottom: "20px" }}
          onClick={() =>{
            navigate("/register")
            setIsRegister(true)
          }}
        >
          Kayıt Ol
        </Button>
    <NotificationContainer/>

      </Container>

    );
}

