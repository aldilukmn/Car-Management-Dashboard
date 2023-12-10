import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage, Register, EditCar, ListCarPage, AddNewCarPage, NotFoundPage, LandingPage, SearchCarPage, ProfilePage } from '../../pages';
import {ProtectedRoute} from '..';
import HiddenSideBar from '../../context/SideBar/HiddenSideBar';
import { MessageProvider, SearchProvider, User } from '../../context';

function Router() {
  return (
    <>
      <BrowserRouter>
        <MessageProvider>
          <SearchProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path='/' element={<LandingPage />} />
              <Route path='/search-car' element={<SearchCarPage />} />
              <Route
                path="*"
                element={
                  <User>
                    <HiddenSideBar>
                      <ProtectedRoute>
                        <Route path='*' element={<NotFoundPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/list-car" element={<ListCarPage />} />
                        <Route path="/add-new-car" element={<AddNewCarPage/>} />
                        <Route path="/edit-car/:id" element={<EditCar />} />
                      </ProtectedRoute>
                    </HiddenSideBar>
                  </User>
                }
              />
            </Routes>
          </SearchProvider>
        </MessageProvider>
      </BrowserRouter>
    </>
  );
}

export default Router;
