import Navbar from './components/Navbar';
import DarkModeToggle from './components/DarkModeToggle';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <DarkModeToggle />
      <Footer/>
      <Outlet />
    </div>
  );
}

export default App;