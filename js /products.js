let aProducts = []; //empty array,i will hold the information abotu the products
//check if the array is empty
if (aProducts.length == 0) {
  productFetch();
}

//gets the products from the api
function productFetch() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      //sets the products from the apí to the local array
      aProducts = json;
      console.log(aProducts);
      inputGenerator();
      readProductData(aProducts);
    });
}

//this func is concatinating our objet into one single string
function readProductData(aProductsRead) {
  let sAllHtmlProduct = ""; // <-- this empy string is to convert all our object data into a single string
  aProductsRead.forEach((oProductLoop) => {
    let sOneProductHtml = createHtmlProduct(oProductLoop); // <--when funcs ARE BEING CALLED THEY ARE SENDING TO THE FUNC
    sAllHtmlProduct = sAllHtmlProduct + sOneProductHtml;
  });

  //line 28 will get our conatiner by the id. then will add our converted html stringsn buy using .innerhtml
  document.getElementById("sec-product-wrapper").innerHTML = sAllHtmlProduct;
  createEventList(aProductsRead); // <-- this is being called after 'document.get' because that is after the elements are being put into the page
}

function inputGenerator() {
  let aCategories = [];
  let sAllHtmlOptions = '<option value="">All</option>'; // <-- here we have to add the option in order to give the user an option
  //this func is checking if we already have a category in the new array
  aProducts.forEach(function (oProductLoop) {
    if (!aCategories.includes(oProductLoop.category)) {
      aCategories.push(oProductLoop.category);
      //create the string with the html option for the category
      sAllHtmlOptions =
        sAllHtmlOptions +
        '<option value="' +
        oProductLoop.category +
        '">' +
        oProductLoop.category +
        "</option>";
    }
  });
  //add the string with all the options into the select element
  document.getElementById("category-filter").innerHTML = sAllHtmlOptions;
  document
    .getElementById("category-filter")
    .addEventListener("change", function () {
      optionSelected();
    });
}

function optionSelected() {
  const sChosenCategory = document.getElementById("category-filter").value; // <-- we are saving the value choosen by the user in a variable
  if (sChosenCategory == "") {
    // <-- Here we are setting the all option to show all the categories
    readProductData(aProducts);
    return;
  }
  const aProductFilter = aProducts.filter(function (oProductLoop) {
    // <-- we are filtering through all the products only get the category chosen by the user then saving it into a variable
    return oProductLoop.category == sChosenCategory;
  });
  readProductData(aProductFilter);
}

function createEventList(aProductsRead) {
  // <--this function will allow user to click and be rerouted to the product page
  for (
    let index = 0;
    index < document.getElementsByClassName("img-container").length;
    index++
  ) {
    const element = document.getElementsByClassName("img-container")[index];
    element.addEventListener("click", function () {
      localStorage.setItem(
        "selectedProduct",
        JSON.stringify(aProductsRead[index])
      );
      window.location.href = "product.html";
    });

    const cartIconElement =
      document.getElementsByClassName("add-to-cart")[index];
    cartIconElement.addEventListener("click", function () {
      addProductToCart(aProductsRead[index]);
    });
  }
}

function addProductToCart(oProductAdd) {
  if (localStorage.getItem("cartItems") == null) {
    // <-- the first time this runs it'll be as an empty array, because we are setting it as an empty array or else it will default to null.
    localStorage.setItem("cartItems", "[]");
  }
  let aCartItems = localStorage.getItem("cartItems");
  aCartItems = JSON.parse(aCartItems); // <-- this data comes in as a string but we parse it in order to manipulate it. After parsing it it will become an js object.

  let nIndexCart = aCartItems.findIndex(function (oProduct) {
    return oProduct.id == oProductAdd.id; // <-- the .findIndex is returning the first element of an array, if there's none, it will return a -1.
  });
  //TODO: if statement
  console.log(nIndexCart);

  oProductAdd.quantity = 1; // <-- this line of code sets it to one... NOTE: ASK FOR CLAIRIFICATION ON THIS!!
  aCartItems.push(oProductAdd);

  localStorage.setItem("cartItems", JSON.stringify(aCartItems));

  console.log(aCartItems);
}

//this converts html into javascript
function createHtmlProduct(oProduct) {
  // <--WHEN FUNCS ARE BEING EXICUTED THE ARE RECEIVING
  let sHtmlProduct =
    '<div class="product-container">\
      <div class="img-container">\
        <img src="' +
    oProduct.image +
    '" alt="" />\
      </div>\
      <div class="content-wrapper">\
        <div class="prdt_title-container">' +
    oProduct.title +
    '</div>\
    <div class="product-price-container">\
    <div class="price-container">' +
    oProduct.price +
    '</div>\
       <div class="icon-wrapper">\
          <span class="material-symbols-outlined"> favorite </span>\
        <span class="material-symbols-outlined add-to-cart">\
            shopping_cart_checkout\
          </span>\
        </div>\
      </div>\
      </div>\
    </div>';

  return sHtmlProduct;
}

/**
 * fetch the products data
 * loop through product data to get name, picture, description and price
 * generate the html info for each product
 * get what is extracted in to the html file
 */
let indexInit = 0;
