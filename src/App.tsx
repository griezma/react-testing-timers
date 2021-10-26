import { count } from 'console';
import CountdownTimer from './components/Countdown/CountdownTimer';

function App() {

  return (
    <div className="App">
      <div>learn react</div>
      <CountdownTimer countdownSecs={5}>
        {c => ("Countdown " + c)}
      </CountdownTimer>
    </div>
  );
}

export default App;
