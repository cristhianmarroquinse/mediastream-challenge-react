import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MovieStore from './components/pages/Exercise01';
import MovieLibrary from './components/pages/Exercise02';
import Home from './components/pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/01" component={MovieStore} exact />
        <Route path="/02" component={MovieLibrary} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
