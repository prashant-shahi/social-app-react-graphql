import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Confirm, Icon } from 'semantic-ui-react'
import { FETCH_POSTS_QUERY, DELETE_POST_MUTATION } from '../utils/graphql';
import MyPopUp from '../utils/MyPopUp';



function DeleteButton({ postId, callback}) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);
            
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            let newPosts = [...data.getPosts]
            newPosts = newPosts.filter(post => post.id !== postId)
            proxy.writeQuery({
              query: FETCH_POSTS_QUERY,
              data: {
                getPosts: {
                  newPosts
                }
              }
            })

            if (callback) callback();
        },
        variables: {
            postId
        },
        onError(err) {
            console.error(err)
        }
    })

    // change as per content for deletion
    const message = "Delete post"

    return (
        <>
            <MyPopUp content={message}>
                <Button
                    as='div'
                    color='red'
                    floated='right'
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name='trash' style={{ margin: 0 }} />
                </Button>
            </MyPopUp>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </>
    )
}

export default DeleteButton