# User get all messages

Used for a user to get his own collection of all messages, no matter if the message is already read or unread.

**URL** : `/api/messages/all`

**Method** : `GET`

**Login required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "success": true,
    "result": [
        {
            "_id": "5a1f5138f5775473e4b5bc95",
            "data": "erweflknmweiofj2309rfomew0r2309rjkwef33f"
        },
        {
            "_id": "5a20a55d7394f85e5826ce15",
            "data": "Hello"
        },
        {
            "_id": "5a24814a980b555120c24906",
            "data": "we are going to update"
        }
    ]
}
```

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success": false
}
```