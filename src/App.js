import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Root from './pages/Root';
import Home from './pages/Home';
import Visit from './pages/Visit';
import Curriculum from './pages/Curriculum';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';
import Inquire from './pages/Inquire';
import GalleryDetail from './pages/GalleryDetail.js'
import { isMobile } from 'react-device-detect';
import MobileRoot from './mobile/pages/MobileRoot';
import MobileHome from './mobile/pages/MobileHome';
import MobileVisit from './mobile/pages/MobileVisit';
import MobileCurriculum from './mobile/pages/MobileCurriculum';
import MobileGallery from './mobile/pages/MobileGallery';
import MobileGalleryDetail from './mobile/pages/MobileGalleryDetail.js'
import MobileInquire from './mobile/pages/MobileInquire';
import { useEffect, useState } from 'react';
import { AuthContextProvider } from './context/AuthContext';


function App() {

  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowInnerWidth(window.innerWidth);
  }
  useEffect(()=>{
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  let router = null;

  if(isMobile || windowInnerWidth < 768) {
    router = createBrowserRouter([
      {
        path: '/',
        element: <MobileRoot/>,
        errorElement: <NotFound/>,
        children: [
          {index: true, element: <MobileHome/>},
          {path: '/mobilevisit/:placeId', element: <MobileVisit/>},
          {path: '/mobilecurriculum', element: <MobileCurriculum/>},
          {path: '/mobilegallery', element: <MobileGallery/>},
          {path: '/mobilegallery/:productId', element: <MobileGalleryDetail/>},
          {path: '/mobileinquire', element: <MobileInquire/>}
        ]
      }
    ])
  } else {
    router = createBrowserRouter([
      {
        path: '/',
        element: <Root/>,
        errorElement: <NotFound/>,
        children: [
          {index: true, element: <Home/>},
          {path: '/visit/:placeId', element: <Visit/>},
          {path: '/curriculum', element: <Curriculum/>},
          {path: '/gallery', element: <Gallery/>},
          {path: '/gallery/:productId', element: <GalleryDetail/>},
          {path: '/inquire', element: <Inquire/>}
        ]
      }
    ])
  }
  return (
    <div className="App">
      <AuthContextProvider>
        <RouterProvider router={router}/>
      </AuthContextProvider>
    </div>
  );
}

export default App;
