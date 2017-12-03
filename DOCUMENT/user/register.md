# Registration

Used to register a User.

**URL** : `/api/register/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "username": "[username in plain text (required))]",
    "password": "[password in plain text (required)]",
    "admin": "[is admin? (required, true/false)]",
    "email": "[valid email address]"
}
```

**Data example**

```json
{
    "username": "lesterlyu",
    "password": "abcd1234",
    "admin": true,
    "email": "lvds2000@gmail.com"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "success":true
}
```

## Error Response

**Condition** : If 'username' is undefined or occupied.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success":false,
    "msg": "Username cannot be empty."
}
```
OR
```json
{
    "success":false,
    "msg": "User exists."
}
```