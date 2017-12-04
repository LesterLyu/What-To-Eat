# when the user read a message, it will update in the database

Used to update the condition of is_read of a certain message for a user

**URL** : `/api/messages/:id/readed`

**Method** : `PUT`

**Login required** : YES

**URL Params**：
    Required :
    ```
        id=[integer]
    ```

**URL example**
```json
/api/messages/1234/readed
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "success": true,
}
```

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success": false,
    "msg": "Error message..."
}
```