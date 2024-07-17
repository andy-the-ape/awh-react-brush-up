import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBattleCard from './pages/CreateBattleCard';
import EditBattleCard from './pages/EditBattleCard';
import DeleteBattleCard from './pages/DeleteBattleCard';
import ShowBattleCard from './pages/ShowBattleCard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/battle-cards/create' element={<CreateBattleCard/>} />
      <Route path='/battle-cards/details/:id' element={<ShowBattleCard/>} />
      <Route path='/battle-cards/edit/:id' element={<EditBattleCard/>} />
      <Route path='/battle-cards/delete/:id' element={<DeleteBattleCard/>} />
    </Routes>
  );
};

export default App;