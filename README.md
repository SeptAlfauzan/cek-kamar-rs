## Welcome To [cek-kamar-rs](https://cek-kamar-rs.herokuapp.com) API Documentation

This is side project to re-learn express js. The data that I used data is from [SIRANAP APP](https://yankes.kemkes.go.id/app/siranap/). I hope you can create some impactfull program using this API 😊
____

Request to Get All Provinces Data

```
https://cek-kamar-rs.herokuapp.com/provinsi
```
___
Example Request to Get All Cities Data From Province

```
https://cek-kamar-rs.herokuapp.com/kabupaten?prov=11prop
```
##### change value of <i>kode</i> to exact province code you need.
___
Example request to get all hospital's data from specific city.

```
https://cek-kamar-rs.herokuapp.com/rumahsakit?prov=35prop&city=3505
```
___