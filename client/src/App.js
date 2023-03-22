import './App.css';
import CreatePatient from './Components/CreatePatient';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Investigation from './Components/Investigation';
import Search from './Components/Search';

function App() {
  return (
    <BrowserRouter>
    <Search />
      <Routes>
        <Route exact path='/' element={<CreatePatient />} />
        <Route path='/updateVisit/:pId' element ={<Investigation />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;