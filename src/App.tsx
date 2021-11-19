import ListPage from "./components/media-account/ListPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditPage from "./components/media-account/EditPage";
import CreatePage from "./components/media-account/CreatePage";
import SyncEditPage from "./components/work-schedule/SyncEditPage";
import SyncEditCompletePage from "./components/work-schedule/SyncEditCompletePage";

function App() {
  return (
    <div className="text-light bg-dark min-full-height">
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
          <Route
            exact
            path="/clients/:clientId/shops/:shopId/work-schedule-sync/edit"
            component={SyncEditPage}
          />
          <Route
            exact
            path="/clients/:clientId/shops/:shopId/work-schedule-sync/edit-complete"
            component={SyncEditCompletePage}
          />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
