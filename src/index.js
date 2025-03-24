import express from 'express';

const app= express();

app.get("/", (req, res) =>{
    res.send("Wellcome to mi api")
});

app.listen(3000, ()=>{
    console.log('El server te escucha en el 3000')
})