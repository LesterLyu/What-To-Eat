# Update User

Edit username and email address

**URL** : `/api/user/`

**Method** : `PUT`

**Login required** : YES

**Data constraints (Only provide needed attributes)**

```json
{
    "username": "[username in plain text]",
    "email": "[valid email addres]"
}
```

**Data example**

```json
{
    "username": "lesterlyu",
    "email": "lester@mail.com"
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

**Condition** : 'username' is occupied or email format error

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success":false,
    "msg": "Failed: Same name!"
}
```
OR
```json
{
    "success":false,
    "msg": "Failed: User exists!"
}
```
OR
```json
{
    "success":false,
    "msg": "Email format error."
}
```