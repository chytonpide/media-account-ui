import ListPage from "./screens/media-account/ListPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditPage from "./screens/media-account/EditPage";
import CreatePage from "./screens/media-account/CreatePage";

function App() {
  return (
    <div className="text-light bg-dark">
      <Router>
        <Switch>
          <Route path="/" exact={true} component={ListPage}></Route>
          <Route
            exact
            path="/shops/:shopId/media-accounts/:mediaAccountId/edit"
            component={EditPage}
          />
          <Route
            exact
            path="/shops/:shopId/media-accounts"
            component={ListPage}
          />
          <Route
            exact
            path="/shops/:shopId/media-accounts/create"
            component={CreatePage}
          />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
