import Header from "./components/header";
import UrlLocation from "./components/urlLocation";
import RestaurantSection from "./components/restaurantSection";
import ContentSection from "./components/contentSection";
import Footer from "./components/footer";
import { useState } from "react";
function App() {
  const [vegOnly, setVegOnly] = useState(false);

  const vegOnlyFilter = () => {
    setVegOnly(!vegOnly);
  };

  return (
    <>
      <Header />
      <main>
        <UrlLocation />
        <RestaurantSection onClick={vegOnlyFilter} />
        <ContentSection isVegOnly={vegOnly} />
        <Footer />
      </main>
    </>
  );
}

export default App;
