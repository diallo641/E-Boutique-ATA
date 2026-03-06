import Home from "./pages/Home";
import Service from "./pages/services";
import Activite from "./pages/activites";
export default function App() {
  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center">
      <Home />
      <Service />
      <Activite />
    </div> 
  );
}

