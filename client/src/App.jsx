import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import 'rsuite/dist/rsuite.min.css';
import Table from './Table';
import Album from './Album';
import { GalleryHorizontal, TableIcon } from 'lucide-react';

function App() {

  const [books, setBooks] = useState([])
  const [seed, setSeed] = useState(0)
  const [lang, setLang] = useState('en_US')
  const [likes, setLikes] = useState(0.0)
  const [reviews, setReviews] = useState(0.0)
  const [hasMore, setHasMore] = useState(true);
  const [batch, setBatch] = useState(0);
  const [tableView, setTableBiew] = useState(true)

  const fetchBooks = async () => {
    setBatch(0);
    const res = await axios.get(`https://main-bvxea6i-q5zhj4j74wp52.ch-1.platformsh.site/api/books?seed=${seed}&language=${lang}&likes=${likes}&reviews=${reviews}&batch=0`)
    setBooks(res.data.books)
    setBatch(1);
  }

  const fetchMoreBooks = () => {
    setTimeout(async () => {
      const res = await axios.get(`https://main-bvxea6i-q5zhj4j74wp52.ch-1.platformsh.site/api/books?seed=${seed}&language=${lang}&likes=${likes}&reviews=${reviews}&batch=${batch}`)
      setBooks(prev => [...prev, ...res.data.books]);
      setBatch(prev => prev + 1)
    }, 1500);

  }

  useEffect(() => {
    fetchBooks();
  }, [seed, lang, likes, reviews])

  const generateRandomSeed = () => {
    const buf = new Uint8Array(1);
    crypto.getRandomValues(buf);
    setSeed(buf[0])
  }

  return (
    <div className='p-3'>
      <div className='top-0 d-flex justify-content-center gap-3 mb-3'>
        <div>
          <label htmlFor="seed" className="form-label">Seed</label>
          <div className="input-group">
            <input type="number" className="form-control" placeholder='seed' value={seed} onChange={(e) => setSeed(e.target.value)} />
            <button onClick={generateRandomSeed} class="btn btn-outline-secondary" type="button" id="button-addon2">🔀</button>
          </div>
        </div>
        <div>
          <label htmlFor="seed" className="form-label">Language</label>
          <select className="form-select" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="en_US">English</option>
            <option value="fr_FR">French</option>
            <option value="it_IT">Italian</option>
          </select>
        </div>
        <div>
          <label htmlFor="likes" className="form-label">Likes: {likes}</label>
          <input value={likes} onChange={(e) => setLikes(e.target.value)} type="range" className="form-range" min="0" max="10" step="0.1" id="likes" />
        </div>
        <div>
          <label htmlFor="reviews" className="form-label">Reviews: {reviews}</label>
          <input value={reviews} onChange={(e) => setReviews(e.target.value)} type="range" className="form-range" min="0" max="10" step="0.1" id="reviews" />
        </div>
        <button className={`btn ${!tableView ? 'active' : ''}`}
    data-bs-toggle="button"
    aria-pressed={tableView}  onClick={() => setTableBiew(false)}><GalleryHorizontal /></button>
        <button className={`btn ${tableView ? 'active' : ''}`}
    data-bs-toggle="button"
    aria-pressed={tableView}  onClick={() => setTableBiew(true)}><TableIcon /></button>
      </div>
      {tableView ? <Table books={books}
      fetchMoreBooks={fetchMoreBooks}
      hasMore={hasMore}/> : <Album 
      books={books}
      fetchMoreBooks={fetchMoreBooks}
      hasMore={hasMore}
      />}
    </div>
  )
}

export default App
