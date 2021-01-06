const postsResolvers = require('@resolvers/posts')
const usersResolvers = require('@resolvers/users')
const commentsResolvers = require('@resolvers/comments')

module.exports = {
    Post: {
        likeCount(parent) {
            return parent.likes.length
        },
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}