import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from 'formik';
import {NotificationManager,NotificationContainer} from 'react-notifications/lib';
import { Container } from '@mui/system';
import { Button, TextField } from '@mui/material';

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
        <Container
        maxWidth="sm"
        style={{
          marginTop: "200px",
          textAlign: "center",
        }}
      >
        <b style={{ fontSize: "40px" }}>{isUser ? 'Kullanıcı Kayıt' : 'Şirket Kayıt'}</b>
        <p onClick={() => {
            navigate("/login")
            setIsRegister(false)
        }}>
          Zaten bir kayıdın var mı {" "}
          <b style={{ color: "#8CC0DE", cursor: "pointer" }}>buraya</b> tıklayarak
          giriş yapabilirsin
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
            Kayıt Ol
          </Button>
        </form>
  
        <Button
          variant="contained"
          style={{ width: "25%", marginTop: "20px", marginBottom: "20px" }}
          onClick={() => {
            navigate("/login");
            setIsRegister(false)
          }}
        >
          Giriş Yap
        </Button>
    <NotificationContainer/>

      </Container>
)}

