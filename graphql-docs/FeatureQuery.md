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
```

## 1.4) update their profile
```
mutation{
  
  updateUser(id:1){
    username:"Haha",
    email: "ahah@mgmail.com"
  }{
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

