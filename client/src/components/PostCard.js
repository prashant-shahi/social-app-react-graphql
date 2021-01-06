import React, { useContext } from 'react'
import { Card, Button, Icon, Label, Image } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
    const { user } = useContext(AuthContext)

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
                <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label as='a' color='blue' pointing='left' basic>
                        { commentCount }
                    </Label>
                </Button>
                {user && user.username === username && (
                    <Button as='div' color="red" floated="right" onClick={() => console.log('Delete post')}>
                        <Icon name='trash' style={{ margin: 0 }} />
                    </Button>
                )}
            </Card.Content> 
        </Card>
    )
}

export default PostCard