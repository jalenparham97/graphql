import { GraphQLServer } from 'graphql-yoga'

const demoData = {
  users: [
    { id: '1', name: 'Jalen', email: 'jalen@gmail.com' },
    { id: '2', name: 'Mike', email: 'mike@gmail.com' },
    { id: '3', name: 'Sarah', email: 'sarah@gmail.com' },
    { id: '4', name: 'Jason', email: 'jason@gmail.com' },
    { id: '5', name: 'Kim', email: 'kim@gmail.com' }
  ],
  posts: [
    {
      id: '1',
      title: 'New Post',
      body: 'A new post',
      published: true
    },
    {
      id: '2',
      title: 'New Post',
      body: 'A new post',
      published: true
    },
    {
      id: '3',
      title: 'New Post',
      body: 'A new post',
      published: true
    }
  ]
}

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts: [Post!]!
    user: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

const resolvers = {
  Query: {
    users(_, { query }) {
      if (!query) {
        return demoData.users
      }

      return demoData.users.filter(user => {
        return user.name.toLowerCase().includes(query.toLowerCase())
      })
    },

    user() {
      return {
        id: 'abc123',
        name: 'Jalen Parham',
        email: 'jparham@gmail.com'
      }
    },

    post() {
      return {
        id: 'some-new-post',
        title: 'Some new post',
        body: 'A brand new post!',
        published: true
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => console.log('Server started'))
