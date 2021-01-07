import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'
import MyPopUp from '../utils/MyPopUp'

function CommentButton({ user, post: { id, comments, commentCount } }) {
    console.log(id)
    console.log(commentCount)

    return (
        <Button
            as='div'
            labelPosition='right'
            onClick={() => console.log('Comment on post')}
        >
            <MyPopUp content="Comment on post">
                <Button color='blue' basic>
                    <Icon name='comments' />
                </Button>
            </MyPopUp>
            <Label color='blue' pointing='left' basic>
                {commentCount}
            </Label>
        </Button>
    )
}

export default CommentButton