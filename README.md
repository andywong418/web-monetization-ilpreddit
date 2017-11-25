Table of Contents
=================

![](./docs/En1ffM.gif)

This Reddit Clone has Postgres SQL schema that supports subreddits, posts and comments. Once a user is logged in, he/she can create a subreddit, submit a post and comment on posts. The comments of each posts are rendered recursively to show all replies to a comment.
![](./docs/up1hKX.gif)

Our clone also supports upvoting and downvoting of comments.
* [API Documentation](#api-documentation)
  * [Pull posts](#pull-posts)
    * [GET /api/post/all](#get-apipostall)
  * [Authentication](#authentication)
    * [POST /api/user/login](#post-apiuserlogin)
    * [POST /api/user/register](#post-apiuserregister)
  * [Making and Modifying Posts](#making-and-modifying-posts)
    * [POST /api/post/new](#post-apipostnew)

Created by [gh-md-toc](https://github.com/ekalinin/github-markdown-toc.go)

![SQL Table Diagram](./docs/horizons_reddit_clone.png)

# API Documentation

Any request that fails will be given a response as follows:

Response on failure
```
{
    success: false,
    error: <String>
}
```

## Pull posts
Example `<Post>`
```
{
    id: <Number>,
    title: <String>,
    content: <String>,
    createdAt: <Date>,
    updatedAt: <Date>,
    subredditId: <Number> [may be populated as <Subreddit>],
    op: <Number> [may be populated as <User>]
}
```

### GET /api/post/all
(login _not_ required)
Response on success
```
{
    success: true,
    posts: <Array of Post objects>
}
```

## Authentication
Example `<User>`
```
{
    id: <Number>,
    username: <String>,
    createdAt: <Date>,
    updatedAt: <Date>
}
```
### POST /api/user/login
`req.body`
```
{
    username: <text>,
    password: <text>
}
```
Response on success
```
{
    success: true,
    user: <User object (no password)>
}
```

### POST /api/user/register
`req.body`
```
{
    username: <text>,
    password: <text>
}
```
Response on success
```
{
    success: true,
    user: <User object (no password)>
}
```

## Making and Modifying Posts
### POST /api/post/new
Must be logged in to make a new post
`req.body`
```
{
    title: <String>,
    content: <String>,
    subredditId: <Number>
}
```
