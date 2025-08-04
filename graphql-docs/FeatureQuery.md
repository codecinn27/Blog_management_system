# 1) Account Management
## 1.1) register a new account
```
mutation {
  signUp(input:{
    username: "Cinn",
    email:"codecinn@gmail.com",
    password:"1234"
  }){
    id 
    username
    email
  }
}
```


## 1.2) log-in 
```
mutation{
  signIn(input:{
    username:"Cinn",
    password: "1234"
  })
  {
    userId
    accessToken
  }
}
```

## 1.3) view their own profile
```
<!--  to view must get the access token from login then paste it at the http header-->
<!--  the id will be automatically pass to the function by using @Context in the nestjs function based on the userId store in the HTTP header -->
HTTP header example: 
{"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcklkIjo5fSwiaWF0IjoxNzU0MzIwMDg1LCJleHAiOjE3NTQzMjM2ODV9.6DLwvX1ekqMm2rHMcjS_N7DWJBXk3IaCLjdFz-oq8xY"}

query {
  getUser{
    id
    username
    email
    profile{
        id 
        bio
        avatar
    }
    posts{
        id
        title
        content
    }
  }
}


```

## 1.4) update their profile
```
<!-- to update sign in and get the accessToken -->
<!-- sign in -->
mutation{
  signIn(input:{
    username:"Cinn",
    password: "1234"
  })
  {
    userId
    accessToken
  }
}

<!-- once log in get the accessToken then paste it into the header to login, the user id will be automatically extracted from the http header by using function @Context from nestjs  -->
<!-- {"authorization": "Bearer "}-->
<!-- eg: {"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsidXNlcklkIjo5fSwiaWF0IjoxNzU0MzIwMDg1LCJleHAiOjE3NTQzMjM2ODV9.6DLwvX1ekqMm2rHMcjS_N7DWJBXk3IaCLjdFz-oq8xY"} -->

mutation{
  updateUser(updateUserInput:{
    username:"Haha3",
  })
  {
    id
    username
    email
  }
}
```


# 2) Post Management
## 2.1) user can create a post with one or more tags
```
```
## 2.2) view a list of their own posts
```
```
## 2.3) update a post they created 
```
```
## 2.4) delete a post they created 
```
```

# 3) Tag Management

## 3.1) Create new tag
```
mutation {
  createTag(createTagInput: { name: "Webby" }) {
    id
    name
  }
}
```

## 3.2) List all tags
### 3.2.1) Load based on information in tag only
```
query{
    tag{
        id
        name
    }
}
```

### 3.2.2) Load tag together with the post attach to it
```
query {
  tag {
    id
    name
    posts {
      id
      title
      content
    }
  }
}
```

## 3.3) List specific tag
```
query {
  getTag(id:1){
    id
    name
    posts {
        id
        title 
        content
    }
  }
}
```

