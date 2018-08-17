import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchPage from './SearchPage'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((result) => {
      this.setState({books: result});
    })
  }
  
  handleBookMove = (book, e) => {
    let found = false
    const destinationShelf = e.target.value;
    const currentBooks = [...this.state.books];
    for (let i = 0; i < currentBooks.length; i ++) {
      if (currentBooks[i].id === book.id) {
        currentBooks[i].shelf = destinationShelf
        found = true
      }
    }
    if (!found) {
      currentBooks.push({
        id: book.id,
        shelf: destinationShelf,
        title: book.title,
        authors: book.authors,
        imageLinks: {
          thumbnail: book.imageLinks.thumbnail || ''
        }
      })
    }
    this.setState({books: currentBooks})
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookShelf handleBookMove={this.handleBookMove} 
                    books={this.state.books} />
        )} />

        <Route path='/add' render={() => (
          <SearchPage handleBookMove={this.handleBookMove} />
        )} />
      </div>
    )
  }
}

export default BooksApp
