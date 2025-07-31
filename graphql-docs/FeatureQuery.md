# 1 Account Management
## register a new account
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


## log-in 
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

## view their own profile


## update their profile
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


# 2 Post Management
## user can create a post with one or more tags

## view a list of their own posts

## update a post they created 

## delete a post they created 

# 3 Tag Management
## Create new tag
mutation {
  createTag(createTagInput: { name: "Webby" }) {
    id
    name
  }
}


## List all tags
### Load based on information in tag only
query{
    tag{
        id
        name
    }
}

### Load tag together with the post attach to it
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

## List specific tag
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

