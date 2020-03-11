const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const DBURL = "mongodb://127.0.0.1:27017/";
const DBName = "arkademy";

let dbo = null;
MongoClient.connect(DBURL, { useNewUrlParser : true}, (err, db)=>{
  if(err) throw err;
  dbo = db.db(DBName);
})

app.use(bodyParser.urlencoded({ extended: false}))

app.get('/siswa',(request,response)=>{
  dbo.collection("siswa").find().toArray((err,res)=>{
    if(err) throw err;
    response.json(res);
  })
})

app.get('/siswa/:id',(request,response)=>{
  let id = request.params.id;
  let ido = new ObjectID(id);
  dbo.collection("siswa").findOne({"_id" : ido},(err, res)=>{
    if(err) throw err;
    response.json(res);
  })
  // response.end("Menampilkan siswa dengan nama: " + namaSiswa);
})

app.post('/siswa',(request,response)=>{
let namaSiswa = request.body.nama;
let alamatSiswa = request.body.alamat;

dbo.collection("siswa").insertOne({
  nama : namaSiswa,
  alamat : alamatSiswa
}, (err,res)=>{
  if(!err){
    response.end("Data berhasil ditambah!");
  }else{
    throw err;
  }})
})

app.delete('/siswa/:id',(request,response)=>{
  let id = request.params.id;
  let ido = new ObjectID(id);

  dbo.collection("siswa").deleteOne({
    _id : ido
  },(err,res)=>{
    if(err) throw err;
    response.end("Data berhasil dihapus!");
  })
})

app.put('/siswa/:id',(request,response)=>{
  let id = request.params.id;
  let ido = new ObjectID(id);
  let namaSiswa = request.body.nama;
  let alamatSiswa = request.body.alamat;

  dbo.collection("siswa").updateOne({
    "_id": ido
  },{$set:{
    nama: namaSiswa,
    alamat: alamatSiswa
  }
  },(err,res)=>{
    if(err) throw err;
    response.end("Data telah diperbarui!");
  })
  })
  app.listen(8080, () => {
    console.log('asiap');
  });