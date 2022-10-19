
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import './app.css';
import Admin from './pages/Admin';
import healthWorker from './pages/HealthWorker';
import Protect from './components/Protect';
import Doctor from './pages/Doctor';
import FamilyCardsView from './pages/FamilyCardsView';
import Room from './pages/Room'
function App() {
  return (
    <div className="App">
      <Route path='/Bind' component={Home} exact />
      <Protect>
        <Route path='/Bind/HealthWorker' component={healthWorker} exact />      
        <Route path='/Bind/admin' component={Admin} exact /> 
        <Route path='/Bind/doctor' component={Doctor} exact/>  
        <Route path='/Bind/info' component={FamilyCardsView} exact />
        <Route path='/Bind/room' component={Room}/>
      </Protect>

    </div>
  );
}

export default App;
