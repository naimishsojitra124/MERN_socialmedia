import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { EditPost, NotFound, Notify } from './components/index';
import Login from './_auth/Forms/Login';
import Register from './_auth/Forms/Register';
import {
  Chat,
  CreatePost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from './_root/pages/index';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './redux/actions/authAction';
import PrivateRouter from './PrivateRouter';
import { getPosts } from './redux/actions/postAction';

function App() {
  const auth = useSelector((state) => state.auth);
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth?.token) {
      dispatch(getPosts(auth?.token));
    }
  }, [dispatch, auth?.token]);
  return (
    <>
      <Notify />
      {status.onEdit && <EditPost />}
      <input type='checkbox' id='theme' />
      <div className='App'>
        <div className='main'>
          <Routes>
            <Route element={<AuthLayout />}>
              {/* Public Routes */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>

            {/* Private Routes */}
            <Route element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path='/create-post' element={<CreatePost />} />
              <Route path='/explore' element={<Explore />} />
              <Route path='/post/:id' element={<PostDetails />} />
              <Route path='/profile/:userId' element={<Profile />} />
              <Route path='/saved' element={<Saved />} />
              <Route path='/account/edit' element={<UpdateProfile />} />
            </Route>

            <Route element={<PrivateRouter />}>
              <Route path='/inbox' element={<Chat />} />
            </Route>

            {/* Not found */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
