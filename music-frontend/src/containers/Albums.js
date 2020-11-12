import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumList } from '../store/actions/albumActions';
import { Link } from 'react-router-dom';

const Albums = ({ location, history }) => {

  const dispatch = useDispatch();
  const albums = useSelector(state => state.album.albumList);

  const params = new URLSearchParams(location.search);
  const queryId = params.get('artist');

  useEffect(() => {
    dispatch(fetchAlbumList(queryId));
  }, [dispatch, queryId]);

  const artist = albums.find(album => album._id === albums[0]._id);

  const albumClickHandler = (id) => {
    history.push(`/tracks?album=${id}`);
  };

  return (
    <>
      <div className='albumHeader'>
        <h2>{artist? artist.artist.name : ''}'s albums</h2>
        <h3><Link to={'/'}>Go back to artists list</Link></h3>
      </div>
      {albums.map(album => {
        return (
          <div
            className='album'
            onClick={() => albumClickHandler(album._id)}
            key={album._id}
          >
            <img
              src={`http://localhost:8000/uploads/${album.image}`}
              alt="" width="150px"/>
            <div>
              <h2>{album.name}</h2>
              <p>Released in <strong>{album.released_date}</strong></p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Albums;