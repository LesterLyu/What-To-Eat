# Delete User

Delete current logged in account

**URL** : `/api/user/`

**Method** : `DELETE`

**Login required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "success":true
}
```

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success":false,
    "msg": "error messages..."
}
```