import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Button, Icon, Label } from 'semantic-ui-react'

import { LIKE_POST_MUTATION } from '../utils/graphql'
import MyPopUp from '../utils/MyPopUp'

function LikeButton({ user, post: { id, likeCount, likes } }) {
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        console.log("user: ", user)
        console.log("likes: ", likes)
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {
            postId: id
        },
        onError(err) {
            console.error(err)
        }
    })

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ) : (
                <Button color='teal' basic>
                    <Icon name='heart' />
                </Button>
            )
    ) : (
        <Button as={Link} to='/login' color='teal' basic>
            <Icon name='heart' />
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            <MyPopUp content={`${liked ? 'Unlike' : 'Like'} the post`}>
                {likeButton}
            </MyPopUp>
            <Label color='teal' pointing='left' basic>
                {likeCount}
            </Label>
        </Button>
    )
}

export default LikeButton