import "./contentSection.styles.css";
export const ContentSection = () => {
  return (
    <section class="content-section">
      <div class="sidebar">
        <ul class="sidebar__list"></ul>
      </div>

      <div class="content">
        <div class="content__heading"></div>
        <ul class="content__list"></ul>
      </div>

      <div class="cart">
        <div class="cart__heading">
          <h1 class="cart__heading--big">Cart</h1>
          <p class="cart__heading--small"></p>
        </div>
        <ul class="cart__list"></ul>
        <div class="cart__summary"></div>

        <button class="cart__btn cart__btn--red">
          Empty Cart &nbsp;<i class="fa fa-trash" aria-hidden="true"></i>
        </button>
        <button class="cart__btn cart__btn__checkout">Checkout &#8594;</button>
      </div>
    </section>
  );
};
