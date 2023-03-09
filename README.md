# 👟 skaners-back 
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)  ![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)  ![mongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) 

# 🔐 AUTHENTIFICATION 

## Route : /signin

- Method: POST
- Body Parameters :
  - email
  - password

## Route : /signup

- Method: POST
- Body Parameters :
  - email
  - userName
  - password
  - firstName
  - dateOfBirth
  - phoneNumber
  - sex
  - favoriteBrand
  - shoeSize
  - pictureUrl
  
# 👨‍💻 USER 

## Route : /user/info/:id (information of specific user)

- Method: GET

## Route : /user/update/:id (update specific user by his id)

- Method: PUT
- Body Parameters :
  - userName,
  - email
  - phoneNumber
  - shoeSize
  - favoriteBrand

## Route : /user/delete/:id (delete specific user by his id)

- Method: DELETE

# 👟 SNEAKERS 

## Route : /sneakers?name=&brand&price=&color (list of available sneakers)

- Method: GET
- Query Parameters :
  - name
  - brand
  - color

## Route : /sneakers/:id (specific sneaker by his id)

- Method: GET

## Route : /user/likeSneaker

- Method: PUT
- Body Parameters :
  - userId
  - sneakerId

## Route : /user/unlikeSneaker

- Method: PUT
- Body Parameters :
  - userId
  - sneakerId

# 🏞️ PICTURES

## Route : /pictures

- Method: GET (list of pictures of lifestyle sneakers like Pinterest)

## Route : /user/likePicture (to like a skan)

- Method: PUT
- Body Parameters :
  - userId
  - pictureId
  
## Route : /user/unlikePicture (to unlike a skan)

- Method: PUT
- Body Parameters :
  - userId
  - pictureId

# 🤳 SKANS

## Route : /allSkans (list of available skans)

- Method: GET

## Route : /checkSkan (to check a skan)

- Method: PUT
- Body Parameters :
  - skanId
  - sneakerName
  - description
  - linkUrl

## Route : /deleteSkan/:id (delete a skan)

- Method: DELETE

## Route : /user/addSkan (to make a skan request)

- Method: POST
- Body Parameters :
  - picture
  - userId

## Route : /user/likeSkan (to like a skan)

- Method: PUT
- Body Parameters :
  - userId
  - skanId
  
## Route : /user/unlikeSkan (to unlike a skan)

- Method: PUT
- Body Parameters :
  - userId
  - skanId
