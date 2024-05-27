import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [category, setCategory] = useState('')
  const [urlVideo, setUrlVideo] = useState('')
  const [image, setImage] = useState('')

  const urlApi = 'http://localhost:4000/movies'

  useEffect(()=>{
    fetchMovies()
  }, [])

  function cleanState(){
    setTitle('')
    setDirector('')
    setCategory('')
    setUrlVideo('')
    setImage('')
  }

  const fetchMovies = async() => {
    try {
      const response = await axios.get(urlApi)
      setMovies(response.data)
    } catch (error) {
      console.error('Error al recuperar las tareas', error);
    }
  }

  const createMovie = async() => {
    try {
      const newMovie = { title, director, category, urlVideo, image }
      const response = await axios.post(urlApi, newMovie)
      setMovies([...movies, response.data])
      cleanState()
    } catch (error) {
      console.error('Error al crear una tarea', error);
    }
  }
  const updateMovie = async(id, updateMovie) => {
    try {
      const response = await axios.put(`${urlApi}/${id}`, updateMovie)
      setMovies(movies.map(movie => (movie.id === id ? response.data : movie)))
      cleanState()
    } catch (error) {
      console.error('Error al modificar una tarea', error);
    }
  }
  const deleteMovie = async(id) => {
    try {
      const response = await axios.delete(`${urlApi}/${id}`)
      setMovies(movies.filter(task => task.id !== id ))
      cleanState()
    } catch (error) {
      console.error('Error al eliminar una tarea', error);
    }
  }

  return (
    <main className=''>
      <section className=' flex flex-col gap-5 h-full w-full px-6'>
        <h1 className=' w-full font-Bebas text-7xl text-left'>Admin Movies</h1>
        <section className='flex flex-col gap-5 w-2/3'>
          <form className='flex flex-col gap-2' action="">
            <label htmlFor="" className='text-left'>Titulo de la pelicula</label>
            <input className='p-3 border rounded-lg w-2/3' type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='Escribe el titulo pelicula'/>
            <label htmlFor="" className='text-left'>Director de la pelicula</label>
            <input className='p-3 border rounded-lg w-2/3' type="text" value={director} onChange={(e)=> setDirector(e.target.value)} placeholder='Director'/>
            <label htmlFor="" className='text-left'>Categoria de la pelicula</label>
            <input className='p-3 border rounded-lg w-2/3' type="text" value={category} onChange={(e)=> setCategory(e.target.value)} placeholder='Categoria de la pelicula'/>
            <label htmlFor="" className='text-left'>Url de la pelicula</label>
            <input className='p-3 border rounded-lg w-2/3' type="text" value={urlVideo} onChange={(e)=> setUrlVideo(e.target.value)} placeholder='Url video'/>
            <label htmlFor="" className='text-left'>Imagen de la pelicula</label>
            <input className='p-3 border rounded-lg w-2/3' type="text" value={image} onChange={(e)=> setImage(e.target.value)} placeholder='Imagen de la pelicula'/>
          </form>
          <button className='bg-[#b8b7b7] border rounded-lg p-3 w-1/3 text-black font-bold' onClick={createMovie}>Agregar tarea</button>
        </section>
        <section className='flex flex-col justify-center items-center mt-10 gap-6 w-full'>
            <div className='w-full flex justify-between items-center text-backgroundColor'>
                <h2 className='font-Inter font-bold text-4xl'>Trending</h2>
                <h3 className='font-Inter font-normal hover:font-semibold'>See More</h3>
            </div>
            <ul className='flex w-full gap-6'>
              {movies.map(movie =>
                  <li className='flex flex-col gap-4 w-[500px]' key={movie.id}>
                    <input className='p-2 border rounded-lg w-full bg-[#a585f4] text-white font-semibold' type="text" value={movie.title} onChange={(e) => updateMovie(movie.id, { title: e.target.value})}/>
                    <input className='p-2 border rounded-lg w-full bg-[#a585f4] text-white font-semibold' type="text" value={movie.director} onChange={(e) => updateMovie(movie.id, { director: e.target.value})}/>
                    <input className='p-2 border rounded-lg w-full bg-[#a585f4] text-white font-semibold' type="text" value={movie.category} onChange={(e) => updateMovie(movie.id, { category: e.target.value})}/>
                    <input className='p-2 border rounded-lg w-full bg-[#a585f4] text-white font-semibold' type="text" value={movie.urlVideo} onChange={(e) => updateMovie(movie.id, { urlVideo: e.target.value})}/>
                    <input className='p-2 border rounded-lg w-full bg-[#a585f4] text-white font-semibold' type="text" value={movie.image} onChange={(e) => updateMovie(movie.id, { image: e.target.value})}/>
                    <button className='hover:bg-[#a585f4] p-2 rounded font-semibold' onClick={() => deleteMovie(movie.id)}>Eliminar</button>
                  </li>
              )}
            </ul>
        </section>
      </section>
    </main>
  )
}

export default App
