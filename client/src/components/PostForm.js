import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'

import { useForm } from '../utils/hooks'
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql'

function PostForm() {
    //const [errors, setErrors] = useState({})

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, results) {
          const data = proxy.readQuery({
              query: FETCH_POSTS_QUERY
          })
          let newPosts = [...data.getPosts]
          newPosts = [results.data.createPost, newPosts]
          proxy.writeQuery({
            query: FETCH_POSTS_QUERY,
            data: {
              getPosts: {
                newPosts
              }
            }
          })
          values.body = ''
        },
        onError(err) {
            console.error(err)
            // if (err.graphQLErrors && err.graphQLErrors.length > 0) {
            //     console.log(err.graphQLErrors)
            //     setErrors(err.graphQLErrors[0].extensions.errors)
            // } else {
            //     setErrors({ general: err.message })
            // }
        }
    })

    function createPostCallback() {
      createPost()
    }

    return (
      <>
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi World!"
                    name="body"
                    onChange={onChange}
                    error={error ? true: false}
                    value={values.body}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
        {error && (
          <div className="ui error message">
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>            
          </div>
        )}
      </>
    )
}

export default PostForm
