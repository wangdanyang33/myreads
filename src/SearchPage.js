import React from 'react'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchPage extends React.Component {
    state = {
        searchResult: []
    }
    handleBookMove = (book, e) => {
        this.props.handleBookMove(book, e)
        BooksAPI.update(book, e.target.value).then(() => {
            alert(`Added ${book.title}.`)
        })
      }
    handleInput = (e) => {
        const query = e.target.value.trim();
        if (query.length === 0) {
            this.setState({
                searchResult: []
            })
            return;
        }
        BooksAPI.search(query).then((result) => {
            if ('error' in result) {
                this.setState({
                    searchResult: []
                })
                return;
            }
            if (result.length && result.length > 0) {
                this.setState({
                    searchResult: result
                })
            }
        })
    }

    render() {
        return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleInput}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
              this.state.searchResult.map((book) => {
                return (
                <BookItem key={book.id}
                          book={book}
                          handleChange={this.handleBookMove} />
                )
            })
          }
          </ol>
        </div>
      </div>
      )
    }
}

export default SearchPage