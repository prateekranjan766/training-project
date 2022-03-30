import React, { useState } from "react";
import { ThemeContext } from "./context/themeContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./components/homeScreen";
import NotFound from "./components/notFound";
import ThankYouScreen from "./components/thankYouScreen/ThankYouScreen";

function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const changeTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <Router>
      <ThemeContext.Provider value={isLightTheme}>
        <Switch>
          <Route exact path="/thank-you" component={ThankYouScreen} />
          <Route
            exact
            path="/"
            render={() => <HomeScreen changeTheme={changeTheme} />}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;
