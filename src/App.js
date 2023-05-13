import Home from './Component/Home';
import Navbar from './Component/Navbar';
import About from './Component/About';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/noteState';
import AlertState from './context/alert/alertState';
import Alert from './Component/Alert';
import Login from './Component/Login';
import Signup from './Component/Signup';


function App() {

  return (
    <>        <AlertState>

      <NoteState>
          <Router>
            <Navbar />
            <Alert alert={alert} />

            <div className='container'>
              <Routes >
                <Route path="/" element={
                  <Home />}>
                </Route>
                <Route exact path="About/*" element={<About />}>
                </Route>
                <Route exact path="login/*" element={<Login />}>
                </Route>
                <Route exact path="signup/*" element={<Signup />}>
                </Route>
              </Routes >
            </div>
          </Router>
       
      </NoteState>
    </AlertState>
    </>
  );
}

export default App;
