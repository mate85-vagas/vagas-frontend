/* eslint-disable */
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bulma/css/bulma.min.css'; 
import JobList from "./elements/JobList";
import AddJob from "./elements/AddJob";
import EditJob from "./elements/EditJob";

function App() {
  return (
    <Router>
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>
            <Route exact path="/" element={<JobList />}/>
            <Route exact path="/add" element={<AddJob />}/>
            <Route exact path="/edit/:id" element={<EditJob />}/>
          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}
 
export default App;