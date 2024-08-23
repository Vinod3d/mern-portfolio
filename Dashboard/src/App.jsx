/* eslint-disable react-hooks/exhaustive-deps */
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ManageSkills from './pages/ManageSkills'
import ManageTimeline from './pages/ManageTimeline'
import ViewProject from './pages/ViewProject'
import ManageProjects from './pages/ManageProjects'
import UpdateProject from './pages/UpdateProject'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './store/slices/userSlice'
import { getAllMessages } from './store/slices/messagesSlice'
import { getAllSkills } from './store/slices/skillSlice'
import { getAllTimeline } from './store/slices/timelineSlice'
import { getAllSoftwareApplications } from './store/slices/softwareApplicationSlice'
import { getAllProjects } from './store/slices/projectSlice'


const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser())
    dispatch(getAllSkills())
    dispatch(getAllMessages())
    dispatch(getAllTimeline())
    dispatch(getAllSoftwareApplications())
    dispatch(getAllProjects())
  },[]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/password/forgot' element={<ForgotPassword/>}/>
        <Route path='/password/reset/:token' element={<ResetPassword/>}/>
        <Route path='/manage/skills' element={<ManageSkills/>}/>
        <Route path='/manage/timeline' element={<ManageTimeline/>}/>
        <Route path='/manage/projects' element={<ManageProjects/>}/>
        <Route path='/view/project/:id' element={<ViewProject/>}/>
        <Route path='/update/project/:id' element={<UpdateProject/>}/>
      </Routes>
      <ToastContainer position='bottom-right' theme='dark'/>
    </BrowserRouter>
  )
}

export default App     