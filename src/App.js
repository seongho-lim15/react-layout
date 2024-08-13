import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './component/page/intro/Loading';
import Instructions from './component/page/intro/Instructions';
import Login from './component/page/join/Login';
import Join from './component/page/join/Join';
import FindId from './component/page/join/FindId';
import ResetPassword from './component/page/join/ResetPassword';
import MainTodolist from './component/page/main/MainTodolist';
import Matching from './component/page/main/Matching';
import Confirm from './component/page/main/Confirm';
import ConfirmList from './component/page/main/ConfirmList';
import { Layout } from './Layout';


function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Loading />} />
        <Route path="instructions" element={<Instructions />} />
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Join />} />
        <Route path="findid" element={<FindId />} />
        <Route path="reset" element={<ResetPassword />} />
        {/*<Route path="main" element ={<MainTodolist />}/>*/}
        {/*<Route path="matching" element ={<Matching />}/>*/}
        <Route path="confirm" element={<Confirm />} />
        <Route path="confirmList" element={<ConfirmList />} />


        <Route path="/" element={<Layout />}>
          <Route path="main" element={<MainTodolist />} />
          <Route path="matching" element={<Matching />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
