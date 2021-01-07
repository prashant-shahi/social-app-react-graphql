import React, { useContext } from 'react'
import { Card, Button, Icon, Label, Image, Popup } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import MyPopUp from '../utils/MyPopUp'
import CommentButton from './CommentButton'

function PostCard({ post: { body, createdAt, id, username, likeCount, comments, commentCount, likes } }) {
    const { user } = useContext(AuthContext)

    function deletePostCallback() {
        window.history.push('/')
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://www.w3schools.com/howto/img_avatar.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <CommentButton user={user} post={{ id, comments, commentCount }} />
                {user && user.username === username && (
                    <DeleteButton postId={id} />
                )}
            </Card.Content> 
        </Card>
    )
}

export default PostCard