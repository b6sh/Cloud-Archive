import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './book.css'
import { Col, Row } from 'react-bootstrap';
import { Avatar, Textarea, Spacer } from "@nextui-org/react";
import axios from 'axios';
export default function Book() {
    // const [id, setId] = useState(null);
    const [book, setBook] = useState([]);// useState([]) to fetch a book detail of this book id
    const [comments, setComments] = useState([]) // fetch all comments of this book id
    const params = useParams();
    // console.log(params.id)

    // To fetch book detail for this _id from Backend works
    useEffect(() => {
        axios.get(`/book/${params.id}`)
            .then(res => {
                // console.log(res.data)
                setBook(res.data)
            })
            .catch(err => console.log(err))
    }, [])


    // To fetch all comments from Backend for this book id
    useEffect(() => {
        axios.get(`/comment/${params.id}`)
            .then(res => {
                console.log("Comments array ", res.data)
                setComments(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const [commnetVal, setCommentVal] = useState({
        bookId: params.id,
        comment: "",
    });

    function handleComment(e) {
        const newComment = { ...commnetVal };
        newComment[e.target.id] = e.target.value;
        console.log(newComment);
        setCommentVal(newComment);
    }

    // Add coment
    function addComment(e) {
        // e.preventDefault();
        // console.log("Message of submmition")
        // console.log(commnetVal)
        const body = JSON.stringify(commnetVal);
        axios.post(`/comment`, body, {
            headers: { "Content-Type": 'application/json' }
        })
            .then(res => console.log("JSON comment is sent"))
            .catch(err => console.log(err))
    }
    const [favoriteBook, setFavoriteBook] = useState({ bookId: params.id })
    // Add book to the favorite list
    function addToFavorite() {
        console.log(" Favorite BooK ID", favoriteBook) // BookID
        // alert('Book is added to the favaorite books');
        const body = JSON.stringify(favoriteBook);
        axios.post(`/favorite`, body, {
            headers: { "Content-Type": 'application/json' }
        })
            .then(res => alert('Book is added to the favaorite books'))
            .catch(err => console.log(err))
    }


    return (
        <div className='row'>
            <Row>
                <Col></Col>

                <Col lg={5} sm={5} md={5} xs={5} className="imgCol">
                    <img
                        src='https://w0.peakpx.com/wallpaper/972/48/HD-wallpaper-stack-of-books-blue-background-education-concepts-books-library-school-learning-concepts.jpg'
                        className='img-fluid imgBook'
                    />
                </Col>
                <Col lg={5} sm={5} md={5} xs={5} key={book._id}>
                    <h4 style={{ marginTop: "3rem" }}>{book.title}</h4>
                    <div style={{ marginTop: "3rem" }} >
                        <p>Author: {book.authors}</p>
                        <p>average_rating: {book.avg_rating}</p>
                        <p>Book language: {book.lang_code}</p>
                        <p>Pages Number: {book.pages}</p>
                        <p>Publication Date: {String(book.publication_date).substring(0, 10)}</p>
                        <p>Publisher: {book.publisher}</p>
                    </div>
                    <button className='btn btn-info text-white' onClick={() => addToFavorite()} style={{ borderRadius: "10px" }}>Add to favorite</button>
                    {/* onClick={() => addToFavorite()} */}
                </Col>
                <Col lg={1} sm={1} md={1} xs={1} ></Col>
                <Col lg={1} sm={1} md={1} xs={1}></Col>
                <Col lg={11} sm={11} md={11} xs={11}>
                    <h3>Comments</h3>
                    <form onSubmit={(e) => addComment(e)}>
                        <div className='d-flex mt-5'>
                            <Avatar
                                size="lg"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAANlBMVEWVu9////+QuN6Mtt3K3O7j7Pby9vvE2OyavuCvy+akxOPY5fLp8Pj6/P260umqyOWFstvR4PDphOmSAAADqElEQVR4nO1b27KiMBCECbkCgfz/zy43dT0HyTRmdGuLfrJKyzSTuXZIVV24cOFCARCpGURfWVy54G3TzmisD059lMb00LE19d8wOlafs8UY2noPbRg/sj45vbv+DO0+YAayL9efYcUp0GsDbGYQpqBMhsDkk0qSAHVZAnXdCVqB9mPgJ1oxChRZBOo6ilHomQx6ofVVYhKo6yTjjcQmUNci20ANwKARoZBPBQ8YCQIDQKCuh/IEoE0Q2YZsQXiGQHlwiBtMjuCKM8DcQMIRPMjAlyZAKIPitSHTGn2CARaMAuF4MTjhB8WbZnZ/dEN5T4TzQfG0/P2cGLhN4oo+FGfw/crEGlYeEBhbFG9auUGX75bBcJQYWgLEoLwjVvyJaYbI1AQ1iiIqwj8wsSCOIOIG1QgwkBHVCJidhQQEfnESmNkWMGSsFWJiFrtPEhQVeUYQqIs3KJ4RRHVVjhFE1IsbWAVSTsubMeb7lE5Y4ne5CtnLueGK7D7I7sFC4dvnC1NIHlXpRlTav1N4vRFRnMBqYvL7acFsk5rcRlBl1fZhr1CnbWllZTiQctPE0G5mVi49h2Wf3PbVOP+s+AEoqSquueh+fkI0JG1mGr3RaXicdq6TTRerciSmp/f6vvOde3Ag50IIztF9fXL3pGm0L2OJ6VnbJ4P3/rXDq/j803Z4+ySYyP72ex32Oajwe6Qw9j07kN8vA3r49b+TrfZHmv4dNeVgSOma4GZPWFG50LyumufHl8zRltGtjd77aFt93LmcPfiCBbzXOFmvsHH9GKeaBvBQ5RinZmlUvjvGiSlKlTTBKV0J1A9zwPXFgoGwAg6HERMw8zBoE+8KE4ADEhbz8wDbeEAv4QLUVUAVmQNQaUbeduACY1A2Ia6A0mLxbDADygiglM9DCyXm8o44uSJCADzS4QESuEo2Jw8AxQk+XOQBaJpFQgEKBpFQgIJBSYTCFAx8BiQRClMw8HchK9mdAyD0Fe4R7wz44SgTjMAbQkLpAEgIAi3aCnajJpSQgJQEv3fDBVtIEEqJQFK8GEAvJmNgqznfj8ay8skDkJCSyleGPgHrz9r5jpb6Dox1qIpCozsQKTF0jRtP6XlEzma0yjyMtu4deZuUG5ruLAvTNUMJhZ9UNfy8wsVYvY1DwUOO5Q5dsElzQqTXyQaZ+3aLij7EpDuzx6Q3nU7TgxMJX3AjtZzuDD42KS13+1Jqoh+W056P3vCbH1Wp7YLjd644Xrhw4T/DHzhTKer8tGZTAAAAAElFTkSuQmCC"
                                zoomed
                            />
                            <Spacer x={2} />

                            <Textarea
                                bordered
                                color="primary"
                                labelPlaceholder="Add a comment"
                                width='100%'
                                required={true}
                                onChange={e => { handleComment(e) }}
                                id='comment'
                            />
                        </div>
                        <button type='submit' className='btn btn-info text-white mt-4 mb-3 float-end' style={{ borderRadius: "10px" }}>Submit</button>
                    </form>
                </Col>

                {/* Comments box map starts here by fetch all comments*/}

                {
                    comments.filter((comment) => {
                        if (params.id == comment.bookId) {
                            return book;
                        }
                    }).map((comment, k) => (
                        <div className="commentBox" key={k}>
                            <Col lg={10} sm={10} md={10} xs={10} className='mt-5 mb-2 d-flex'>
                                <Avatar
                                    size="lg"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAANlBMVEWVu9////+QuN6Mtt3K3O7j7Pby9vvE2OyavuCvy+akxOPY5fLp8Pj6/P260umqyOWFstvR4PDphOmSAAADqElEQVR4nO1b27KiMBCECbkCgfz/zy43dT0HyTRmdGuLfrJKyzSTuXZIVV24cOFCARCpGURfWVy54G3TzmisD059lMb00LE19d8wOlafs8UY2noPbRg/sj45vbv+DO0+YAayL9efYcUp0GsDbGYQpqBMhsDkk0qSAHVZAnXdCVqB9mPgJ1oxChRZBOo6ilHomQx6ofVVYhKo6yTjjcQmUNci20ANwKARoZBPBQ8YCQIDQKCuh/IEoE0Q2YZsQXiGQHlwiBtMjuCKM8DcQMIRPMjAlyZAKIPitSHTGn2CARaMAuF4MTjhB8WbZnZ/dEN5T4TzQfG0/P2cGLhN4oo+FGfw/crEGlYeEBhbFG9auUGX75bBcJQYWgLEoLwjVvyJaYbI1AQ1iiIqwj8wsSCOIOIG1QgwkBHVCJidhQQEfnESmNkWMGSsFWJiFrtPEhQVeUYQqIs3KJ4RRHVVjhFE1IsbWAVSTsubMeb7lE5Y4ne5CtnLueGK7D7I7sFC4dvnC1NIHlXpRlTav1N4vRFRnMBqYvL7acFsk5rcRlBl1fZhr1CnbWllZTiQctPE0G5mVi49h2Wf3PbVOP+s+AEoqSquueh+fkI0JG1mGr3RaXicdq6TTRerciSmp/f6vvOde3Ag50IIztF9fXL3pGm0L2OJ6VnbJ4P3/rXDq/j803Z4+ySYyP72ex32Oajwe6Qw9j07kN8vA3r49b+TrfZHmv4dNeVgSOma4GZPWFG50LyumufHl8zRltGtjd77aFt93LmcPfiCBbzXOFmvsHH9GKeaBvBQ5RinZmlUvjvGiSlKlTTBKV0J1A9zwPXFgoGwAg6HERMw8zBoE+8KE4ADEhbz8wDbeEAv4QLUVUAVmQNQaUbeduACY1A2Ia6A0mLxbDADygiglM9DCyXm8o44uSJCADzS4QESuEo2Jw8AxQk+XOQBaJpFQgEKBpFQgIJBSYTCFAx8BiQRClMw8HchK9mdAyD0Fe4R7wz44SgTjMAbQkLpAEgIAi3aCnajJpSQgJQEv3fDBVtIEEqJQFK8GEAvJmNgqznfj8ay8skDkJCSyleGPgHrz9r5jpb6Dox1qIpCozsQKTF0jRtP6XlEzma0yjyMtu4deZuUG5ruLAvTNUMJhZ9UNfy8wsVYvY1DwUOO5Q5dsElzQqTXyQaZ+3aLij7EpDuzx6Q3nU7TgxMJX3AjtZzuDD42KS13+1Jqoh+W056P3vCbH1Wp7YLjd644Xrhw4T/DHzhTKer8tGZTAAAAAElFTkSuQmCC"
                                    zoomed
                                />
                                <Spacer x={2} />
                                {comment.comment}
                            </Col>
                            <p className='d-none'>{k + 1}</p>
                        </div>
                    ))
                }
            </Row>
        </div>
    )
}
