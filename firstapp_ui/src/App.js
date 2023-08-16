import './App.css';
import {Routes, Route} from 'react-router-dom';
import Sample_1 from './sample/Sample_1';
import Sample_1_Post from './sample/Sample_1_Post';
import Welcome from './authentication/Welcome';
import Login from './authentication/Login';
import Register from './authentication/Register';


function App() {
  return (
    <div className="App">
      <h1>App Page</h1>
      <Routes>
        <Route path='' element={<Welcome />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/sample_1' element={<Sample_1 />} />
        <Route path='/sample_1/:pk' element={<Sample_1 />} />
        <Route path='/sample_1_post' element={<Sample_1_Post />} />
      </Routes>
    </div>
  );
}

export default App;
