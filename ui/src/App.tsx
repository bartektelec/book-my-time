import React from 'react';
import Home from './pages/Home/';
import SuccessInit from './pages/SuccessInit/';
import Calendar from './pages/Calendar';
import GlobalStyle from './common/globalStyles';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <SuccessInit userId="asd" />
    </div>
  );
}

export default App;
