import React from 'react'
import { useState } from 'react'
import './MovieApp.css'


export const MovieApp = () => {
    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState([])

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'YOUR_API_KEY'

    const handleInputChange = ({ target }) => {
        setSearch(target.value)
        console.log(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async () => {
        const url = `${urlBase}?query=${search}&api_key=${API_KEY}`
        try {
            const response = await fetch(url)
            const data = await response.json()
            setMovieList(data.results)
            console.log(data.results) 
        } catch (error) {
            console.error('Ha ocurrido el siguiente error:', error)
        } 
    }

  return (
    <div className='container'>
        <h1 className= 'title'>Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder='Busca una película'
                value= {search}
                onChange={handleInputChange}
            />
            <button className='search-button'>Buscar</button>
        </form>
            {movieList &&
                <div className='movie-list'>
               
                    {movieList.map((movie) => (
                        <div key={movie.id} className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt= {movie.title}></img>
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                        </div>
                    ))}
            </div>
        } 
    </div>
  )
}



