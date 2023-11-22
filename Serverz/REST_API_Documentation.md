# Lodging App server
This Lodging App is an application to manage lodgings! This app has : 
* RESTful endpoint for lodging's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /lodgings

> Get all lodgings with it's author

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "message": "OK",
    "data": [
        ...,
        {
            "id": <integer>,
            "name": <string>,
            "facility": <string>,
            "roomCapacity": <integer>,
            "imgUrl": <URL string>,
            "authorId": <integer>,
            "location": <string>,
            "price": <integer>,
            "typeId": <integer>,
            "createdAt": <date object>,
            "updatedAt": <date object>,
            "User": {
                "id": <integer>,
                "username": <string>
                "email": <email string>,
                "role": <string>,
                "phoneNumber": <integer>,
                "address": <string>,
                "createdAt": <date object>,
                "updatedAt": <date object>
            }
        },
        ...
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /lodgings

> Create new lodging

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "name": <string>,
    "facility": <string>,
    "roomCapacity": <integer>,
    "imgUrl": <URL string>,
    "location": <string>,
    "price": <integer>,
    "typeId": <integer>,
}
```

_Response (201 - Created)_
```
{
    "message": "Succeeded add new Lodging <created lodging name>",
    "data": {
        "id": <integer>,
        "name": <string>,
        "facility": <string>,
        "roomCapacity": <integer>,
        "imgUrl": <URL string>,
        "location": <string>,
        "price": <integer>,
        "typeId": <integer>,
        "authorId": <integer>,
        "createdAt": <date object>,
        "updatedAt": <date object>,
    }
}
```

_Response (400 - Bad Request)_
```
[
    ...,
    {
        "inputName": "location",
        "message": "Please fill in location input"
    }
    ...,
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /lodgings/:id

> Get a single lodging that matches the id path parameter

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "message": "OK",
    "data": {
        "id": <integer>,
        "name": <string>,
        "facility": <string>,
        "roomCapacity": <integer>,
        "imgUrl": <URL string>,
        "location": <string>,
        "price": <integer>,
        "typeId": <integer>,
        "authorId": <integer>,
        "createdAt": <date object>,
        "updatedAt": <date object>,
    }
}
```

_Response (404 - Not Found)_
```
{
    "message": "Lodging with id '<id path parameter>' is not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### DELETE /lodgings/:id
> Deletes a single lodging that matches the id path parameter

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "message": "Loding with name '<deleted lodging name>' has successfully been deleted",
    "data": {
        "id": <integer>,
        "name": <string>,
        "facility": <string>,
        "roomCapacity": <integer>,
        "imgUrl": <URL string>,
        "location": <string>,
        "price": <integer>,
        "typeId": <integer>,
        "authorId": <integer>,
        "createdAt": <date object>,
        "updatedAt": <date object>,
    }
}
```

_Response (403 - Forbidden)_

```
{
    "message": "You are not the owner of this lodging!"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Lodging with id '<id path parameter>' is not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### GET /types
> Get all registered lodging types

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "message": "OK",
    "data": [
        ...,
        {
            "id": 1,
            "name": "hotel",
            "createdAt": "2023-10-04T08:27:21.785Z",
            "updatedAt": "2023-10-04T08:27:21.785Z"
        },
        ...
    ]
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /register
> Registers a new admin

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": <email string>,
    "password": <string>
}
```

_Response (201 - Created)_
```
{
    "message": "<created user email> has successfully been registered",
    "data": {
        "id": <integer>,
        "email": <created user email>
    }
}
```
_Response (400 - Bad Request)_
```
[
    {
        "inputName": "password",
        "message": "Please fill in password input"
    }
    ...,
]
```
_Response (409 - Conflict)_
```
[
    {
        "inputName": "email",
        "message": "Email has already been taken!"
    }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### POST /login
> Login with email and password

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": <email string>,
    "password": <string>
}
```

_Response (200 - OK)_
```
{
    "access_token": <JWT string>
}
```
_Response (400 - Bad Request)_
```
[
    {
        "message": "Email and password cannot be empty"
    }
    ...,
]
```
_Response (401 - Unauthorized)_
```
[
    {
        "message": "Invalid email or password"
    }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---