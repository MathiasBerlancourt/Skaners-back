# skaners-back

-------------- AUTHENTIFICATION --------------

Route : /signin

- Method: POST
- Body Parameters :
  - email
  - password

//////////////////////////////

Route : /signup

- Method: POST
- Body Parameters :
  - username
  - email
  - password
  - pictureUrl (not required)

-------------- SNEAKERS --------------

Route : /sneakers (list of available sneakers)

- Method: GET

//////////////////////////////

Route : /sneakers/:id (specific sneaker by his id)

- Method: GET

-------------- PICTURES --------------

Route : /pictures

- Method: GET (list of pictures of lifestyle sneakers like Pinterest)
