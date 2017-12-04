# User delete its own message

Used for a user to delete a message from his own collection of messages

**URL** : `/api/messages/user/:id`

**Method** : `DELETE`

**URL Params**：
    Required :
    ```
        id=[string]
    ```

**URL example**
```
/api/messages/user/1234
```

**Login required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "success": true
    "msg": "message with id 1234 deleted successfully"
}
```

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success" : false,
    "msg" : "Error message..."
}
```