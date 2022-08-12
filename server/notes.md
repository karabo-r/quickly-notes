# SERVER NOTES

__RL__ - Requires login.
__RA__ - Requries authorization (token)

Please note that all routes with the __RL__ signature would automatically require authorization (__RA__) to process any methods sent to it.

## API

__api/notes__ - __RL__

- create a note
- delete a note
- update a note
- get all notes

__api/login__

- get token for existing user

__api/user__

- create user
    - signup from frontend will access this api to create a new user
- delete user (__RA__)

## Models
__Notes__
```
    {
        heading: ...
        content: ...
    }
```

__Users__
```
    {
        username: ...
        name: ...
        password: ...
    }
```
