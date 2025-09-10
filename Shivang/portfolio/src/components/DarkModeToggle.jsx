import { useState } from 'react';
import './DarkMode.css'

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className='dark-mode' >
 <i className={darkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} onClick={toggleDarkMode}><p>{darkMode? 'Light Mode': 'Dark Mode'}</p></i>

    </div>
   
  );
}

export default DarkModeToggle;