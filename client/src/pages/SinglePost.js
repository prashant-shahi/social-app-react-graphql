import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import moment from 'moment'

import { FETCH_POST_QUERY } from '../utils/graphql'
import { Card, Grid, Image } from 'semantic-ui-react'
import LikeButton from '../components/LikeButton'
import { AuthContext } from '../context/auth'
import DeleteButton from '../components/DeleteButton'
import CommentButton from '../components/CommentButton'

function SinglePost(props) {
    const { user } = useContext(AuthContext)

    const postId = props.match.params.postId
    console.log(postId)

    const {
        loading,
        data: { getPost } = {}
    } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    let postMarkup
    if (loading && !getPost) {
        postMarkup = <p>Loading post...</p>
    } else {
        console.log("getPost:", getPost)
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src='https://www.w3schools.com/howto/img_avatar.png'
                            size='small'
                            float='right'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <CommentButton user={user} post={{ id, comments, commentCount }} />
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
}

export default SinglePost
