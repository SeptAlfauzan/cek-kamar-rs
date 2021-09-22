## Welcome To [cek-kamar-rs]() API Documentation

This is side project to re-learn express js. The data that I used data is from [SIRANAP APP](https://yankes.kemkes.go.id/app/siranap/). I hope you can create some impactfull program using this API 😊
____

Request to Get All Provinces Data

```
domain.com/provinsi
```
___
Example Request to Get All Cities Data From Province

```
domain.com/kabupaten?prov=11prop
```
##### change value of <i>kode</i> to exact province code you need.
___
Example request to get all hospital's data from specific city.

```
domain.com/rumahsakit?prov=35prop&city=3505
```
___
Example request to get all hospital's data from specific province.

```
domain.com/rumahsakit?prov=35prop
```