# Admin delete a message

Used to collect a Token for a registered User.

**URL** : `/api/messages/:id`

**Method** : `DELETE`

**URL Params**：
    ```
    Required :
        id=[integer]
    ```

**URL example**
```
/api/messages/12345
```

**Login required** : NO

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "success": true,
    "msg": "message with id 12345 deleted successfully"
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