# Post a message

Used to collect a Token for a registered User.

**URL** : `/api/message/`

**Method** : `POST`

**Login required** : NO

**Data constraints**

```json
{
    "title": "[title in plain text], OPTIONAL",
    "content": "[content in plain text]"
}
```

**Data example**

```json
{
    "title": "update version",
    "content": "we are going to update"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "success": true,
    "newMessage": {
        "title": "update version",
        "content": "we are going to update",
        "date": "12/3/2017",
        "_id": "5a24814a980b555120c24906"
    }
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