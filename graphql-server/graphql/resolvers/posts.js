const { UserInputError, AuthenticationError } = require('apollo-server')

const checkAuth = require('@utils/check-auth')
const Post = require('@models/Post')

module.exports =  {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 })
                return posts
            } catch(err) {
                throw new Error(err)
            }
        },
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId)
                if (post) {
                    return post
                } else {
                    throw new Error('Post not found')
                }
            } catch(err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context)

            if (body.trim() === '') {
                errors = {
                    body: 'Post body must not be empty'
                }
                throw new UserInputError('Empty post body')
            }

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save()

            context.pubsub.publish('NEW_POST', {
                newPost: post
            })

            return post
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)
            const post = await Post.findById(postId)
            if (post == null) {
                errors = {
                    general: 'Invalid post id passed'
                }
                throw new UserInputError('Invalid post id', errors)
            }

            if (user.username === post.username) {
                await post.delete()
                return post
                //'Post deleted successfully'
            } else {
                throw new AuthenticationError('Action not allowed')
            }
        },
        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context)

            const post = await Post.findById(postId)
            if (post) {
                if (post.likes.find(like => like.username === username)) {
                    post.likes = post.likes.filter(like => like.username !== username)
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save()
                return post
            } else {
                throw new UserInputError('Post not found')
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
}