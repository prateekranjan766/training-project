function Dish(name, price, description, image, isVeg, isBestseller) {
  this.name = name;
  this.price = price;
  this.description = description;
  this.image = image;
  this.isVeg = isVeg;
  this.isBestseller = isBestseller;
}

function DishBuilder() {
  let name = "";
  let price = 0;
  let description = "";
  let image = "";
  let isVeg = true;
  let isBestseller = false;

  return {
    setName: function (name) {
      this.name = name;
      return this;
    },
    setPrice: function (price) {
      this.price = price;
      return this;
    },
    setDescription: function (description) {
      this.description = description;
      return this;
    },
    setImage: function (image) {
      this.image = image;
      return this;
    },
    setNonVeg: function () {
      this.isVeg = false;
      return this;
    },
    setBestseller: function () {
      this.isBestseller = true;
      return this;
    },
    build: function () {
      return new Dish(name, price, description, image, isVeg, isBestseller);
    },
  };
}

const menuDishItems = {
  recommended: [
    new DishBuilder()
      .setNonVeg()
      .setName("Premium Butter Chicken Roti Thali")
      .setPrice(289)
      .setDescription(
        "Butter Chicken , 2 nos roti served with pickle , raita ,gulab jamun, 2 Pcs Chicken Tikka"
      )
      .setImage("./images/dishes/premium-butter-chicken-roti-thali.jpeg"),
    new DishBuilder()
      .setName("Veg Platter")
      .setPrice(699)
      .setDescription(
        "An authentic veg platter with 3 pieces of Paneer Achari, 3 pieces of Hara Bhara, 3 pieces of Veg Seekh and 3 pieces of Malai Chaap."
      )
      .setImage("./images/dishes/veg-platter.jpeg"),
    new DishBuilder()
      .setNonVeg()
      .setName("Non Veg Platter")
      .setPrice(899)
      .setDescription(
        "An authentic non veg platter with 3 pieces of Barnala Mathi Chicken Tikka, 3 pieces of Dhaniya Chicken, 3 pieces of Tawa Chicken and 3 pieces of Chicken Kebab."
      )
      .setImage("./images/dishes/non-veg-platter.jpeg"),
  ],
  platters: [
    new DishBuilder()
      .setNonVeg()
      .setName("Mixed Platter")
      .setPrice(799)
      .setDescription(
        "An authentic mixed platter with 3 pieces of Barnala Methi Chicken, 3 pieces of Chicken Kebab, 3 pieces of Hara Bhara and 3 pieces of Paneer Tikka."
      )
      .setImage("./images/dishes/mixed-platter.jpeg"),
    new DishBuilder()
      .setName("Veg Platter")
      .setPrice(699)
      .setDescription(
        "An authentic veg platter with 3 pieces of Paneer Achari, 3 pieces of Hara Bhara, 3 pieces of Veg Seekh and 3 pieces of Malai Chaap."
      )
      .setImage("./images/dishes/veg-platter.jpeg"),
  ],
  starters: [
    new DishBuilder()
      .setName("Paneer Malai Tikka")
      .setPrice(239)
      .setDescription(
        "Slow-cooked Paneer Tikka mildly flavoured with rich cream."
      )
      .setImage("./images/dishes/paneer-malai-tikka.jpeg"),
    new DishBuilder()
      .setNonVeg()
      .setName("Dhaniya Chicken Tikka")
      .setPrice(249)
      .setDescription(
        "Succulent chicken marinated & flavoured with fresh coriander, grilled to perfection."
      )
      .setImage("./images/dishes/dhaniya-chicken-tikka.jpeg"),
  ],
  "family binge packs": [
    new DishBuilder()
      .setNonVeg()
      .setName("Dhaniya Chicken Tikka")
      .setPrice(249)
      .setDescription(
        "Succulent chicken marinated & flavoured with fresh coriander, grilled to perfection."
      )
      .setImage("./images/dishes/dhaniya-chicken-tikka.jpeg"),
    new DishBuilder()
      .setName("Kadai Paneer Binge Pack For 4")
      .setPrice(999)
      .setDescription(
        "A surprising binge pack of Kadai Paneer, Naan (4Pcs) & Gulab Jamun (4 Pcs) that serves 4."
      )
      .setImage("./images/dishes/kadai-paneer.jpeg"),
  ],
  "main course": [
    new DishBuilder()
      .setNonVeg()
      .setName("Butter Chicken")
      .setPrice(249)
      .setDescription(
        "A classic chicken dish prepared in a rich sauce of tomato, butter and cream."
      )
      .setImage("./images/dishes/butter-chicken.jpeg"),
    new DishBuilder()
      .setNonVeg()
      .setName("Punjbai Chicken Curry")
      .setPrice(249)
      .setDescription(
        "Delectable chicken dish prepared in a thick and rich flavourful gravy."
      )
      .setImage("./images/dishes/punjabi-chicken-curry.jpeg"),
  ],
  "rice & indian breads": [
    new DishBuilder()
      .setName("Naan")
      .setPrice(40)
      .setDescription("A leavened flatbread cooked in a tandoor (clay oven).")
      .setImage("./images/dishes/naan.jpeg"),
    new DishBuilder()
      .setName("Lachha Paratha")
      .setPrice(50)
      .setDescription("A layered Indian flatbread made with unleavened dough")
      .setImage("./images/dishes/lachha-paratha.jpeg"),
  ],
  "premium thalis": [
    new DishBuilder()
      .setNonVeg()
      .setName("Premium Butter Chicken Roti Thali")
      .setPrice(289)
      .setDescription(
        "Butter Chicken , 2 nos roti served with pickle , raita ,gulab jamun, 2 Pcs Chicken Tikka"
      )
      .setImage("./images/dishes/premium-butter-chicken-roti-thali.jpeg"),
    new DishBuilder()
      .setNonVeg()
      .setName("Premium Kadhai Chicken Pulao Thali")
      .setPrice(289)
      .setDescription(
        "Kadhai Chicken , Pulao served with pickle , raita ,gulab jamun ,2 Pcs Chicken Tikka"
      )
      .setImage("./images/dishes/premium-kadhai-chicken-pulao-thali.jpeg"),
  ],
  "deserts & beverages": [
    new DishBuilder()
      .setName("Gulab Jamun")
      .setPrice(99)
      .setDescription(
        "Sweet and sumptuous dough balls soaked in cinnamon flavoured sugar syrup."
      )
      .setImage("./images/dishes/gulab-jamun.jpeg"),
    new DishBuilder()
      .setName("Baked Gajar Halwa")
      .setPrice(99)
      .setDescription(
        "Melt-in-mouth delight made with fresh carrots and pure ghee."
      )
      .setImage("./images/dishes/baked-gajar-halwa.jpeg"),
  ],
  accomniments: [
    new DishBuilder()
      .setName("Raita")
      .setPrice(69)
      .setDescription("A delish side dish made with fresh curd and vegetables.")
      .setImage("./images/dishes/raita.jpeg"),
    new DishBuilder()
      .setName("Green Chutney")
      .setPrice(49)
      .setDescription(
        "A flavourful condiment made with mint and corriander leaves."
      )
      .setImage("./images/dishes/green-chutney.jpeg"),
  ],
};

export default function getDishByMenu(menu) {
  return menuDishItems[menu];
}
