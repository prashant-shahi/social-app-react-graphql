import gql from 'graphql-tag'

export const FETCH_POSTS_QUERY = gql`
  query {
    getPosts{
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
          id
          username
          createdAt
      }
      comments {
          id
          body
          username
          createdAt
      }
    }
  } 
`

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`

export const REGISTER_USER = gql`
mutation register(
  $username: String!
  $email: String!
  $password: String!
  $confirmPassword: String!
) {
  register(
    registerInput: {
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    }
  ) {
    id
    email
    username
    createdAt
  }
}
`

export const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
        username: $username
        password: $password
    ) {
      id
      username
  	  email
      createdAt
      token
    }
  }
`

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`

export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  } 
`

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;
