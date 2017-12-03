# What To Eat Backend APIs

#### BASE HTTP URL: `http://309.lesterlyu.com:3000`
#### BASE HTTPS URL: `https://309.lesterlyu.com:8443`

## Open Endpoints

Open endpoints that does not require login

#### Account related
* [Registration](user/register.md) : `POST /api/register/`
* [Authenticate](user/authenticate.md) : `POST /api/authenticate/`

#### Search related
* [Search restaurant](search/search.md) : `POST /api/search/`
* [Get current searching status](search/search-status.md) : `POST /api/search/status/`

#### Messages related
* [Post message](messages/messages-post.md) : `POST /api/messages/`

## Endpoints that require Authentication

Closed endpoints require a valid Token cookie.
The cookie will be set after authenticate.

> i.e. Cookie: 
> ```json
> {
>     "token": "TOKEN_HERE"
> }
> ```

### Account related

Endpoints for basic account operations

* [Logout](user/logout.md) : `GET /api/logout/` 
* [Edit username](user/user-post.md) : `PUT /api/user/` 

### Messages related

* [Get message](messages/message-get.md) : `GET /api/messages/`
* [Delete message](messages/message-delete.md) : `DELETE /api/messages/`



