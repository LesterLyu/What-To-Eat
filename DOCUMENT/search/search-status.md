# Get current searching status

Get the current searching status, each session is identified by `express-sesion`.
This api will be used when server is searching, front-end request the current 
searching progress for this session.

**URL** : `/api/search/status/`

**Method** : `GET`

**Login required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "size":-1,
    "curr":0,
    "msg":"Gathering data from Yelp..."
}
```
OR
```json
{
    "size":50,
    "curr":36,
    "msg":"Gathering data from Google..."
}
```
OR
```json
{
    "size":-1,
    "curr":0,
    "msg":"You are not searching..."
}
```