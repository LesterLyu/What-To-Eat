# Search Restaurants

Used to collect a Token for a registered User.

**URL** : `/api/search/`

**Method** : `POST`

**Login required** : NO

**Query String Parameters**

| Name        | Type           | Description  |
| ------------- |:-------------:| -----|
| latitude      | Number | Latitude of the location you want to search nearby. |
| longitude      | Number      | Longitude of the location you want to search nearby. |
| radius | Number      |  Search radius in meters. |
| workload | Number      | 0 = No wait, 1 = Up to 15 mins, 2 = Up to 15 mins, 3 = Up to 30 mins, 4 = Up to 45 mins, 5 = Up to 60 mins, 10 = Greater than 60 mins.  |
| day | Number      | **-1: current server day**, 0: Sun, 1: Mon, ... , 6: Sat. |
| hour | Number      |  hour in 24, e.g. 10 = 10am, 22 = 10pm; **-1 = current server hour** |
| price | String      | Pricing levels to filter the search result with: 1 = $, 2 = $$, 3 = $$$, 4 = $$$$. The price filter can be a list of comma delimited pricing levels. For example, "1, 2, 3" will filter the results to show the ones that are $, $$, or $$$. |


**Query String Parameters example**

 - latitude:43.66569856044182
 - longitude:-79.34845447540283
 - radius:800
 - workload:2
 - day:-1
 - hour:13
 - price:2,1

## Success Response

**Code** : `200 OK`

**Content example**

```json
{  
   "success":true,
   "total_number":50,
   "has_popularity":35,
   "result_size":15,
   "result":[  
      {  
         "id":"mi-mi-restaurant-toronto",
         "name":"Mi Mi Restaurant",
         "image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/G328y6xz67M3hLIZ-BLFsw/o.jpg",
         "url":"https://www.yelp.com/biz/mi-mi-restaurant-toronto?adjust_creative=_V3w2Wpx-W022v99yGAYYA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=_V3w2Wpx-W022v99yGAYYA",
         "review_count":97,
         "rating":"4",
         "price":"$",
         "phone":"+1 416-778-5948",
         "popularity":[  
            "Up to 15 mins"
         ],
         "address":[  
            "688 Gerrard Street E",
            "Toronto, ON M4M 1Y3",
            "Canada"
         ],
         "coordinates":{  
            "latitude":43.666376338824,
            "longitude":-79.348772658905
         },
         "categories":[  
            {  
               "alias":"vietnamese",
               "title":"Vietnamese"
            }
         ]
      },
      ...
   ]
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "success": false,
    "msg": "Error message..."
}