/* eslint-disable */
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import VagaList from "./elements/VagaList";
import AddVaga from "./elements/AddVaga";
import EditVaga from "./elements/EditVaga";
import 'bulma/css/bulma.min.css'; 

function App() {
  return (
    <Router>
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>
            <Route exact path="/" element={<VagaList />}/>
            <Route exact path="/add" element={<AddVaga />}/>
            <Route exact path="/edit/:id" element={<EditVaga />}/>
          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}
 
export default App;