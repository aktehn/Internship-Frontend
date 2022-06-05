import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InternPost from '../Components/InternPost';
import { AllPost } from '../Services/api';

function HomePage({isUser}) {

    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        AllPost().then(resp=> {
            setPosts(resp.data.data)
        })
    },[])


    return (
    <Container>
        <p style={{ fontSize: "25px", textAlign:"center" , fontWeight:"700"}}>Ana Sayfa</p>
        <Grid container spacing={3} style={{marginTop:"30px"}}>
            {posts.map(post => (
               <Grid item key ={post.id} xs={12} md={12} lg={12}>
                     <InternPost post={post} isUser={isUser}/>
               </Grid>
            ))}
            <Grid item xs={12} md={12}>
              
            </Grid>
        </Grid>
    </Container>
    );
}

export default HomePage;