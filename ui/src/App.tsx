import React from 'react';
import Home from './pages/Home/';
import Calendar from './pages/Calendar';
import GlobalStyle from './common/globalStyles';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Home />
    </div>
  );
}

export default App;
