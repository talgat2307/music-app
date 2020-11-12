import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistList } from '../store/actions/artistActions';

const Artists = props => {

  const dispatch = useDispatch();
  const artists = useSelector(state => state.artist.artistList);

  useEffect(() => {
    dispatch(fetchArtistList());
  }, [dispatch]);

  const artistClickHandler = (id) => {
    props.history.push(`/albums?artist=${id}`);
  };

  return (
    <>
      <h2>List of artists</h2>
      {artists.map(artist => {
        return (
          <div
            className='artist'
            onClick={() => artistClickHandler(artist._id)}
            key={artist._id}
          >
            <img
              src={`http://localhost:8000/uploads/${artist.image}`}
              alt="" width="150px"/>
            <h2>{artist.name}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Artists;