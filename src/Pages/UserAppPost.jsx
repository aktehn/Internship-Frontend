import { Grid } from '@mui/material';
import { Container, fontSize, textAlign } from '@mui/system';
import React, { useEffect, useState } from 'react';
import InternPost from '../Components/InternPost';
import {GetUserAppPost} from "../Services/api"

function UserAppPost() {

    var value = {
        token : localStorage.getItem("token")
    }
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        GetUserAppPost(value).then(resp =>{
            setPosts(resp.data.data)
        })
    },[])

    return (
        <Container>
            <p style={{ fontSize: "25px", textAlign:"center" , fontWeight:"700"}}>Başvurduğum İlanlar</p>
        <Grid container spacing={3} style={{marginTop:"30px"}}>
            {posts.map(post => (
               <Grid item key ={post.id} xs={12} md={12} lg={12}>
                     <InternPost post={post}/>
               </Grid>
            ))}
            <Grid item xs={12} md={12}>
              
            </Grid>
        </Grid>
    </Container>
    );
}

export default UserAppPost;