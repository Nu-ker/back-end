# back-end
Nu-ker Back end

#### Users
https://us-central1-nu-ker-fox.cloudfunctions.net/User

| Router                     | HTTP | Header       |Description |
|-----------------------    |:----:|:-------------------:|-----|
|/         |GET  |     | Menamplikan semua User
|/         |GET  |  uid   | Menamplikan data User berdasarkan uid
|/          |POST | uid |  menambah data User dengan uid dari google sign  |
|/        |PUT  | uid | mengedit data User berdasarkan uid   |
|/         |DELETE  | uid |  menghapusUser sesuai uid  |


#### UserLogin
https://us-central1-nu-ker-fox.cloudfunctions.net/UserLogin

| Router                     | HTTP | Header       |Description |
|-----------------------    |:----:|:-------------------:|-----|
|/         |GET  |  uid   | Mengecek apakah data uid dari google apakah ada di database return status: true / false

### DateCheck

https://us-central1-nu-ker-fox.cloudfunctions.net/DateCheck

| Router                     | HTTP | Header       |Description |
|-----------------------    |:----:|:-------------------:|-----|
|/         |GET  |  uid , date   | Mengecek apakah data date dari uid itu apakah ada atau tidak/ jika tidak ada akan membuat data baru dengan tanggal tersebut beserta calories data user

#### Food
https://us-central1-nu-ker-fox.cloudfunctions.net/Food

| Router                     | HTTP | Header       |Description |
|-----------------------    |:----:|:-------------------:|-----|
|/         |GET  |     | Menamplikan semua User
|/         |GET  |  uid   | Menamplikan data User berdasarkan uid
|/          |POST | uid |  menambah data food untuk tanggal pembuatan  |
|/        |PUT  | uid , foodid | mengedit data User berdasarkan uid   |
|/         |DELETE  | uid , foodid |  menghapusUser sesuai uid  |
