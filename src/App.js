import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Root from './pages/Root';
import Home from './pages/Home';
import Visit from './pages/Visit';
import Curriculum from './pages/Curriculum';
import Gallery from './pages/Gallery';
// import Review from './pages/Review';
import NotFound from './pages/NotFound';
import Inquire from './pages/Inquire';
import GalleryDetail from './pages/GalleryDetail.js'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Home/>},
        {path: '/visit', element: <Visit/>},
        {path: '/curriculum', element: <Curriculum/>},
        {path: '/gallery', element: <Gallery/>},
        {path: '/gallery/:productId', element: <GalleryDetail/>},
        {path: '/inquire', element: <Inquire/>}
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
