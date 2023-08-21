import { BeaconProvider } from './beaconProvider';
import Login from './Login';

function App() {
  return (
    <BeaconProvider>
      <Login/>
    </BeaconProvider>
  );
}

export default App;
