import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from '../likebutton/likebutton.component';

const CardComponent = ({ post : { body, id, username, createdAt, likes } }) => {
  const { user } = useContext(AuthContext);

  function commentOnPost(){
      console.log("comment on post")
  }
  function deletePost(id){
    console.log("Post has been deleted")
  }

  const history = useNavigate()

  const handleSinglePage = (id) => {
    history(`/posts/${id}`)
  }
 
  return (
    <div className='container'>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://react.semantic-ui.com/images/avatar/large/molly.png"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {moment(createdAt).fromNow()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {body}
        </Typography>
      </CardContent>
      <CardActions>
        <LikeButton id={id} likes={likes} user={user} />
        <button onClick={() => handleSinglePage(id)}>Comment On Post</button>
        {user && user.username === username && (
          <button onClick={() => deletePost()}>Delete Post</button>
        )}
      </CardActions>
    </Card>
    </div>
  );
}

export default CardComponent;