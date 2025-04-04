
import './App.css'
import RegisterUser from './Usercontrols/RegisterUser'
import Getvideo from './Getvideos/Getvideo'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import GetvideobyId from './Getvideos/GetvideobyId';
import LoginUser from './Usercontrols/LoginUser';
import Homepage from './Homepage/Homepage';
import ChannelVideos from './ChannelPage/ChannelVideos';
import Dashboard from './Dasboard/Dashboard';
import SubscribersPage from './Dasboard/SubscribersPage';
import SubscriberCard from './Dasboard/SubscriberCard';
import UploadVideo from './Dasboard/UploadVideo';
import PlaylistButton from './Playlist/PlaylistButton';
import PlaylistPage from './Playlist/PlaylistPage';
import PlaylistVideos from './Playlist/PlaylistVideos';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element ={<Homepage/>}>
        <Route path='/' element = {<Getvideo/>}></Route>
        <Route path='/channel/:user_id' element={<ChannelVideos/>}></Route>
        <Route path='playlist/:playlist_id' element={<PlaylistVideos/>}></Route>
      </Route>
      <Route path='/:video_id' element ={<GetvideobyId/>}> 
        <Route index element={<PlaylistButton/>}></Route>
        <Route path='playlist-page' element={<PlaylistPage/>}></Route>
      </Route>
      <Route path='/register' element={<RegisterUser/>}></Route>
      <Route path='login' element={<LoginUser/>}></Route>
      <Route path='/account-dashboard' element={<Dashboard/>}>
        <Route index element={<SubscriberCard />} />
        <Route path='subscriber-list' element={<SubscribersPage/>}></Route>
      </Route>
      <Route path='upload-video' element={<UploadVideo/>}></Route>
      
    </>
  )
)
function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
