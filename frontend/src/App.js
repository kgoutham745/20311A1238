import NavBar from './components/NavBar';
import Schedule from './components/Schedule';


function App() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="m-5">
        <Schedule></Schedule>
      </div>
    </div>
  );
}

export default App;
