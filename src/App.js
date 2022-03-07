import "./styles.css";

import Header from "./components/header";
import UrlLocation from "./components/urlLocation";
import RestaurantSection from "./components/restaurantSection";
import ContentSection from "./components/contentSection";
import Footer from "./components/footer";
function App() {
  return (
    <>
      <Header />
      <main>
        <UrlLocation />
        <RestaurantSection />
        <ContentSection />
        <Footer />
      </main>
    </>
  );
}

export default App;
