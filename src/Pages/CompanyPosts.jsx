import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import InternPost from '../Components/InternPost';
import { GetCompanyPosts } from '../Services/api';

export default function CompanyPosts(props) {
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        GetCompanyPosts({Token:localStorage.getItem("token")}).then(resp=> {
            setPosts(resp.data.data)
        })
    },[])


    return (
    <Container>
        <p style={{ fontSize: "25px", textAlign:"center" , fontWeight:"700"}}>İlanlarım</p>
        <Grid container spacing={3} style={{marginTop:"30px"}}>
            {posts.map(post => (
               <Grid item key ={post.id} xs={12} md={12} lg={12}>
                     <InternPost post={post} isUser={false}/>
               </Grid>
            ))}
            <Grid item xs={12} md={12}>
              
            </Grid>
        </Grid>
    </Container>
    );
}