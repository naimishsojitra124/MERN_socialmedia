import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData';
import { TYPES } from '../../redux/actions/authAction';
import { Loader, SearchModel } from '../../components/index';

const Explore = () => {
  // State
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoading(true);
      const res = await getDataAPI(
        `user/searchUser?username=${search}`,
        auth.token
      );
      setUsers(res.data.users);
      setLoading(false);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  // Close handler
  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };

  // Handlers
  return (
    <>
      <Helmet>
        <title>Explore</title>
      </Helmet>
      <div className='Explore'>
        <div className='explore-top'>
          <form
            className='explore-top-search'
            onChange={handleSearch}
            onSubmit={(e) => e.preventDefault()}>
            <img
              src='/assets/icons/search.svg'
              alt='search'
              className='explore-top-search-icon'
            />
            <input
              type='text'
              placeholder='Search for Friends...'
              id='search'
              name='search'
              value={search}
              onChange={(e) =>
                setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
              }
              maxLength={20}
            />
            {loading ? (
              <Loader size='medium' stroke='black' />
            ) : (
              <span
                className='search-close-icon'
                onClick={handleClose}
                style={{
                  opacity: !search && users.length === 0 ? 0 : 1,
                }}>
                &times;
              </span>
            )}
            <div className='search-results'>
              {search &&
                users.length > 0 &&
                users.map((user) => (
                  <SearchModel
                    key={user._id}
                    user={user}
                    handleClose={handleClose}
                  />
                ))}
            </div>
          </form>
        </div>
        <div className='explore-bottom'>Bottom</div>
      </div>
    </>
  );
};

export default Explore;
