import React from 'react';


class BookItem extends React.Component {

    handleChange = (book, e) => {
        this.props.handleChange(book, e)
    }
    render() {
        return (
        <li>
            <div className="book">
            <div className="book-top">
                <div className="book-cover" 
                    style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ''})` }}></div>
                <div className="book-shelf-changer">
                <select bookid={this.props.book.id} onChange={(e) => this.handleChange(this.props.book, e)}>
                    <option value="move" selected disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors}</div>
            </div>
        </li>
        )
    }
}

export default BookItem