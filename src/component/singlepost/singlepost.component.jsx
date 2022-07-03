import { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../likebutton/likebutton.component';
import DeleteButton from '../deletebutton/deletebutton.component';
import { useParams } from 'react-router-dom'
  
const SinglePost = () => {
    const params = useParams();
    const { postId } = params;
    const { user } = useContext(AuthContext)
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
           postId 
        }
    })
 
    return (
       <div>
          {
            !data ? 
            <h1>LOADING...</h1> 
            :
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
                    {data.getPost.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {moment(data.getPost.createdAt).fromNow()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.getPost.body}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <LikeButton id={data.getPost.id} likes={data.getPostlikes} user={user} />
                <button>Comment On Post</button>
                {user && user.username === data.getPost.username && (
                  <button>Delete Post</button>
                )}  */}
              </CardActions>
            </Card>
            </div>
          }
      </div>
    )
}

const FETCH_POST_QUERY = gql` 
    query($postId: ID!){
        getPost(postId: $postId){
            id 
            body
            createdAt
            username 
            likes {
              username
            }
        }
    }
`
export default SinglePost