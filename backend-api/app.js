const express = require('express')
const cors = require('cors')

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

let movies = []

app.get('/movies', (req, res)=>{
    res.json(movies)
})

app.post('/movies', (req, res)=>{
    const newMovie = {
        id: movies.length + 2,
        title: req.body.title,
        director: req.body.director,
        category: req.body.category,
        urlVideo: req.body.urlVideo,
        image: req.body.image
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})

app.get('/movies/:id', (req, res)=>{
    const movieId = parseInt(req.params.id)
    const movie = movies.find(item=>item.id === movieId)
    if (movie) {
        res.json(movie)
    } else {
        res.status(404).send('No se encontró esa pelicula') 
    }
})

app.put('/movies/:id', (req, res)=>{
    const movieId = parseInt(req.params.id)
    const movie = movies.find(item=>item.id === movieId)
    if (movie) {
        movie.title = req.body.title || movie.title
        movie.director = req.body.director || movie.director
        movie.category = req.body.category || movie.category
        movie.urlVideo = req.body.urlVideo || movie.urlVideo
        movie.image = req.body.image || movie.image
        res.json(movie)
    } else {
        res.status(404).send('No se encontró esa pelicula') 
    }
})

app.delete('/movies/:id', (req, res)=>{
    const movieId = parseInt(req.params.id)
    const movie = movies.findIndex(item=>item.id === movieId)
    if (movie !== -1) {
        movies.splice(movie, 1)
        res.status(202).send('Pelicula eliminada correctamente')
    } else {
        res.status(404).send('No se eliminó esa pelicula') 
    }
})

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto: ${port} y en la url: http://localhost:${port}`);
})