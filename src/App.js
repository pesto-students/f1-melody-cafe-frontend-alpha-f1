import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes />
      </Router>
      {/* header -> constant */}
      {/* Search */}
      {/* Auth */}

      {/* sidebar */}
      {/* Banner ->constant */}
      {/* Filter Bar */}
      {/* Footer */}
      {/* Music Mini Player -> constant */}
    </div>
  );
}

export default App;
