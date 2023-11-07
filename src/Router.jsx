import { Suspense, lazy } from "react"
import { BrowserRouter as ReactRouter, Routes, Route, Outlet } from 'react-router-dom'
import "./Styles.css"
import "./App.css"
// import Home from './pages/Home'
// import Quran from './pages/Quran'
// import Read from './pages/Read'
// import Read_Juz from './pages/Read_Juz'
// import Schedule from './pages/Schedule'
import Loading from './partials/Loading'
import CookieConsent from './partials/CookieConsent'
import { GlobalThemeProvider } from './hooks/useTheme'

const Home = lazy(() => import("./pages/Home"));
const Quran = lazy(() => import("./pages/Quran"));
const Read = lazy(() => import("./pages/Read"));
const Read_Juz = lazy(() => import("./pages/Read_Juz"));
const Schedule = lazy(() => import("./pages/Schedule"));

const SuspenseLayout = () => (
  <Suspense fallback={<Loading />}>
    <Outlet />
    <CookieConsent />
  </Suspense>
);

export default function Router () {
  return (
      <GlobalThemeProvider>
      <ReactRouter>
       <Routes>
        <Route element={ <SuspenseLayout /> }>
          <Route path="/" element={ <Home /> } />
          <Route path="/alquran" element={ <Quran /> } />
          <Route path="/schedule" element={ <Schedule /> } />
          <Route path="/surah/:surahid" element={ <Read /> } />
          <Route path="/juz/:juzid" element={ <Read_Juz /> } />
          <Route path="*" element={ <Home /> } />
        </Route>
       </Routes>
      </ReactRouter>
      </GlobalThemeProvider>
    )
}