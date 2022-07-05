import { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import LikeButton from '../likebutton/likebutton.component';
import DeleteButton from '../deletebutton/deletebutton.component';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
  
const SinglePost = () => {
    const params = useParams();
    const history = useNavigate(); 
    const { postId } = params;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);
    
    const [comment, setComment] = useState("");
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
           postId 
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
      update(){
        setComment("");
        commentInputRef.current.blur();
      },
      variables: {
        postId,
        body: comment
      }
    })

    function deletePostCallback(){
      history('/')
    }

    const handleChange = (e) => {
      setComment(e.target.value)
    }
 
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
              <LikeButton id={data.getPost.id} likes={data.getPost.likes} user={user} />
               {user && user.username === data.getPost.username && (
                <DeleteButton postId={data.getPost.id} callback={deletePostCallback} />
               )}
              </CardActions>
            </Card>
              {user && (
                <Card> 
                  <p>Post a Comment</p>
                  <form>
                  <div className="input-form">
                    <TextField 
                    className="text-field"
                    label="comment"
                    name="comment"
                    type="text"
                    value={comment}
                    onChange={handleChange}
                    ref={commentInputRef}
                    variant="outlined" 
                    />
                    <button type='submit' onClick={submitComment}>Post</button>
                   </div>
                  </form>
                </Card>
              )}
              {data.getPost.comments.map(comment => (
                <Card key={comment.id}>
                  <CardContent>
                    <Typography>
                      {comment.username}
                    </Typography>
                    <Typography>
                      {comment.body}
                    </Typography>
                    <Typography>
                       {moment(comment.createdAt).fromNow()}
                    </Typography>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={comment.id} commentId={comment.id} />
                    )}
                  </CardContent>
                </Card>
              ))} 
            </div>
          }
      </div>
    )
}

const SUBMIT_COMMENT_MUTATION = gql `
   mutation($postId: String!, $body: String!){
      createComment(postId: $postId, body: $body){
        id
        comments {
          id
          body
          createdAt
          username
        }
      }
   }
`

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
            comments {
              id
              username
              createdAt
              body
            }
        }
    }
`
export default SinglePost