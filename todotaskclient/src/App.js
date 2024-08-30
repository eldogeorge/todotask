import './App.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Add from './Component/Add';
import View from './Component/View';
import Edit from './Component/Edit';
import Pnf from './Component/Pnf'
function App() {
  return (
    <div style={{backgroundColor:'#6E6E6E'}}>
      <Header></Header>
      <Routes>
          <Route path='/' element={<Home></Home>}/>
          <Route path='/add' element={<Add></Add>}/>
          <Route path='/edit/:id' element={<Edit></Edit>}/>
          <Route path='/view/:id' element={<View></View>}/>
          {/* pnfStep2 */}
          <Route path='*' element={<Pnf></Pnf>}/>
      </Routes>
      <Footer></Footer>

    </div>
  );
}

export default App;
