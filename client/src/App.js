import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from './components/UserLisr/Home';
import Details from './components/UserLisr/Details';
import AddUser from './components/UserLisr/AddUser';
import Edit from './components/UserLisr/Edit';


function App() {
  return (
   <>
  
  <Home/>
  <AddUser/>
  <Edit/>
  <Details/>
   
   </>
  );
}

export default App;

