import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from 'formik';
import {NotificationManager,NotificationContainer} from 'react-notifications/lib';
import { Container } from '@mui/system';
import { Button, TextField } from '@mui/material';
import classes from '../asset/Styles/_Login.module.css'
import images from '../asset/images/login.png'

export default  function Register({isRegister,setIsRegister,isUser,setIsUser}) {
    const navigate = useNavigate();
    const [register,setRegister] = useState(false);

    useEffect(()=>{
      if(register) {
        navigate("/login")
      }
    },[register,navigate])


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
                //Register user isteği
            }else {
              //register company isteği
            }
            
        }
    })

  return (
      <div>
      <img src={images} className={classes.container_img} />
        <Container maxWidth="sm" className={classes.container_login}>
          <div style={{padding: "25px"}}>
            <b className={classes.container_login_b}>{isUser ? 'Kullanıcı Kayıt' : 'Şirket Kayıt'}</b>
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
              style={{ width: "95%", marginTop: "20px" }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.errors.password}
              className={classes.container_login_input}
            />
          </form>
  
          <div className={classes.container_login_div}>
            <Button
              variant="contained"
              type="submit"
              className={classes.container_login_button}
            >
              Kayıt Ol
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/login");
                setIsRegister(false)
              }}
              className={classes.container_login_button}
            >
              Giriş Yap
            </Button>
          </div>
          <NotificationContainer/>
        </Container>
      </div>
)}

