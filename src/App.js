import "./App.css";
import AgeGroupPriceList from "./container/ageGroupPriceList";
import Navbar from "./container/navBar";

function App() {
  return (
    <div>
      <Navbar />
      <AgeGroupPriceList onChange={(result) => console.log(result)} />
    </div>
  );
}

export default App;
