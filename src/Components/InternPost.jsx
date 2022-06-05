import { Button, Card, CardActions, CardContent, CardMedia, Grid, Paper, Typography,GridContainer } from '@mui/material';
import React,{useState,useEffect} from 'react';
import {AllPost, AppIntern} from "../Services/api"

function InternPost({post,isUser}) {

  const handleAppClick = () => {
    AppIntern({token:localStorage.getItem("token"),postId:post.id}).then((res) => {
      alert(res.data.message);
    })
  }

    return (
       <Paper>
           
    <Card sx={{ maxWidth: "100%" }} >
       <Grid container spacing={3} item xs={12} md={12}>
       <Grid item xs={12} md={3}>
        <CardMedia
          component="img"
          height="200"
          image="https://secure.gravatar.com/avatar/af84d222e95b95cfe269e7477cfdf876?s=250&d=mm&r=pg"
          alt="png"
    />
        </Grid>

        <Grid item xs={12} md={9} style={{marginTop:"50px"}}>
       <CardContent>
          <Typography gutterBottom variant="h5" component="animate" color={"#F47C7C"}>
            {post.company.companyName}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="body1" style={{marginRight:"50px"}}>{post.city.name}</Typography>
          <Typography variant="body1" style={{marginLeft:"50px"}}>{post.position.name}</Typography>
          {isUser && (
          <Button onClick={handleAppClick} size="small" style={{marginLeft:"auto"}}>Başvur</Button>
          )}
        </CardActions>
       </Grid>
       </Grid>
      </Card>
       </Paper>
   
    );
}

export default InternPost;