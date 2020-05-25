import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import './App.css';
import MovieList from './components/movie-list'
import MovieDetails from './components/movie-details'
import MovieForm from './components/movie-form'
var FontAwesome = require('react-fontawesome')


class App extends Component {

  state = {
    movies: [],
    selectedMovie: null,
    editedMovie: null,
    token: this.props.cookies.get('mr-token')
  }
  
  componentDidMount(){
    if(this.state.token){
        fetch (`http://localhost:8000/api/movies/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.state.token}`
        } // headers
        }).then ( resp =>  resp.json())
        .then ( res =>  this.setState({ movies: res})) // res
        .catch( error => console.log(error))
    } else {
        window.location.href = "/"
    }
     
  } // componentDidMount

loadMovie = movie => {
  // console.log(movie);
  this.setState({selectedMovie: movie, editedMovie: null});
}

movieDeleted = selMovie => {
  // console.log(movie);
  const movies = this.state.movies.filter( movie => movie.id !== selMovie.id);
  this.setState({movies: movies, selectedMovie: null})
}
editClicked = selMovie => {
  this.setState({editedMovie: selMovie});
}
newMovie = () => {
  this.setState({editedMovie: {title: '', description: ''}});
}
cancelForm = () => {
  this.setState({editedMovie: null});
}
addMovie = movie => {
  this.setState({movies: [...this.state.movies, movie]});
}

  render() {
  return (
    <div className="App">
        <h1><FontAwesome name="film"/><span>Movie Rater 0.1</span></h1>
        <div className="layout">
              <MovieList movies={this.state.movies} movieClicked={this.loadMovie} movieDeleted={this.movieDeleted} editClicked={this.editClicked} newMovie={this.newMovie} />
          <div>
            {!this.state.editedMovie ? 
                <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>
               : <MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm} newMovie={this.addMovie} editedMovie={this.loadMovie}/> }             
          </div>       
        </div>
      </div>
    ); // return
  } // render 
} // Component

export default withCookies(App);