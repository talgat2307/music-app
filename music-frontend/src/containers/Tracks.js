import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrackList } from '../store/actions/trackActions';
import { Link } from 'react-router-dom';
import { fetchArtist } from '../store/actions/artistActions';

const Tracks = ({ location }) => {

  const dispatch = useDispatch();
  const tracks = useSelector(state => state.track.trackList);
  const artist = useSelector(state => state.artist.artist);

  const params = new URLSearchParams(location.search);
  const queryId = params.get('album');

  useEffect(() => {
    dispatch(fetchTrackList(queryId));
  }, [dispatch, queryId]);

  const album = tracks.find(track => track._id === tracks[0]._id );

  useEffect(() => {
    if (album) {
      dispatch(fetchArtist(album.album.artist));
    }
  }, [album, dispatch])

  return (
    <>
      <div className='trackHeader'>
        <h2>{artist.name}</h2>
        <h3>{album ? album.album.name : ''}</h3>
        <h3><Link to={`/albums?artist=${artist._id}`}>Go back to albums list</Link></h3>
      </div>
      <ul className='track'>
        {tracks.map(track => {
          return (
            <li key={track._id}>
              <p>{track.number}. <strong>{track.name}</strong> {track.length} min</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Tracks;