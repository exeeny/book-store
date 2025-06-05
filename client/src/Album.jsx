import './App.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

function Album({ books, fetchMoreBooks, hasMore }) {
    return (<InfiniteScroll
        dataLength={books.length}
        next={fetchMoreBooks}
        hasMore={hasMore}
        loader={<div style={{ textAlign: 'center' }}><Loader />
        </div>}
        endMessage={
            <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
            </p>}>
        <div class="row row-cols-1 row-cols-md-2">
            {books.map((book, index) =>
                <div class="card mb-3 p-2">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src={`https://placehold.co/500x600?text=${book.title}%0Aby%0A${book.author}`} class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">"{book.title}"</h5>
                                <p class="card-text">by {book.author}</p>
                                <p className="card-text"><strong>Publisher:</strong> {book.publisher}</p>  {/* Added here */}
                                <p className="card-text"><strong>ISBN:</strong> {book.isbn}</p>
                                <p>🤍 {book.likes}</p>
                                <p class="card-text">Reviews:</p>
                                <div style={{ maxHeight: '140px', overflowY: 'auto', paddingRight: '8px' }}>
                                    {book.reviews.map((review) =>
                                        <p class="card-text"><small class="text-body-secondary">— "{review}"</small></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </InfiniteScroll>
    )
}

export default Album