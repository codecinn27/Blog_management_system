# Get all users
## Get all users with id, username and email
query{
    users{
        id
        username
        email
    }
}

## Get all users with profile and posts
query{
    users{
        id 
        username

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

# Get specific users information
query {
  getUser(id: 1) {
    id
    username
    email
  }
}

query {
  getUser(id: 1) {
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


