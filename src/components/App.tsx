import classes from "./App.module.css";
import { observer } from 'mobx-react';
import AvailableRoutes from '../routes/AvailableRoutes';

function App() {
  return (
    <div className="App">
      <div className={classes.authorize}>
        <AvailableRoutes />
      </div>
    </div>
  );
}

export default observer(App);
 