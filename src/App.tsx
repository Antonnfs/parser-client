import React from "react";
import AppRouter from "./routes/AppRouter";
import ThemeWrapper from "./components/wrappers/ThemeWrapper";

function App() {
   return (
      <ThemeWrapper>
         <AppRouter />
      </ThemeWrapper>
   );
}

export default App;
