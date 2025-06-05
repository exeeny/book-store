import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function Table({ books, fetchMoreBooks, hasMore,}) {
  return ( <>
      <table className="table table-bordered" style={{tableLayout: 'fixed'}}>
            <thead>
              <tr className="table-primary">
                <th className="col-1" scope="col">#</th>
                <th scope="col">ISBN</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Publisher</th>
              </tr>
            </thead>
            </table>
      <div class="scrollable-table" style={{ height: 700, overflowY: 'auto', position: 'relative' }} id="scrollableTable">
        <InfiniteScroll
          dataLength={books.length}
          next={fetchMoreBooks}
          hasMore={hasMore}
          scrollableTarget="scrollableTable"
          loader={<div style={{ textAlign: 'center' }}><Loader />
          </div>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>}>
          <table className="table table-bordered table-hover " style={{tableLayout: 'fixed'}}>  
            <tbody >
              {books.map((book, index) =>
                <>
                  <tr data-bs-toggle="collapse" data-bs-target={`#${index}`} aria-expanded="false" aria-controls={index}>
                    <td className="col-1"><button className='btn' data-bs-toggle="collapse" data-bs-target={`#${index}`} aria-expanded="false" aria-controls={index}>{index + 1}</button></td>
                    <td>{book.isbn}</td>
                    <td>"{book.title}"</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                  </tr>
                  <tr className="collapse" id={index}>
                    <td colSpan="5">
                      <div class="card mb-3">
                        <div class="row g-0">
                          <div class="col-md-4">
                            <img src={`https://placehold.co/500x600?text=${book.title}%0Aby%0A${book.author}`} class="img-fluid rounded-start" alt="..." />
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">"{book.title}"</h5>
                              <p class="card-text">by {book.author}</p>
                              <p class="card-text">Reviews:</p>
                              {book.reviews.map((review) =>
                                <p class="card-text"><small class="text-body-secondary">— "{review}"</small></p>
                              )}
                              <p>🤍 {book.likes}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr></>
              )}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
      </>
  )
}

export default Table