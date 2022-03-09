import Header from "./components/header";
import UrlLocation from "./components/urlLocation";
import RestaurantSection from "./components/restaurantSection";
import ContentSection from "./components/contentSection";
import Footer from "./components/footer";
import menuList from "./models/menuModel";
import { useState } from "react";
import { getDishByMenu } from "./models/dishModel";
function App() {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const [vegOnly, setVegOnly] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const vegOnlyFilter = () => {
    setVegOnly(!vegOnly);
  };

  const setIndex = (index) => {
    setActiveMenuIndex(index);
  };

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Header />
      <main>
        <UrlLocation />
        <RestaurantSection onClick={vegOnlyFilter} onChange={onInputChange} />
        <ContentSection
          isVegOnly={vegOnly}
          activeMenuIndex={activeMenuIndex}
          setActiveMenuIndex={setIndex}
          searchKeyword={inputValue}
        />
        <Footer />
      </main>
    </>
  );
}

export default App;
