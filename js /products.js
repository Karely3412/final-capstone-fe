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
      readProductData();
    });
}

//this func is concatinating our objet into one single string
function readProductData() {
  let sAllHtmlProduct = ""; // <-- this empy string is to convert all our object data into a single string
  aProducts.forEach((oProductLoop) => {
    let sOneProductHtml = createHtmlProduct(oProductLoop); // <--when funcs ARE BEING CALLED THEY ARE SENDING TO THE FUNC
    sAllHtmlProduct = sAllHtmlProduct + sOneProductHtml;
  });

  //line 28 will get our conatiner by the id. then will add our converted html stringsn buy using .innerhtml
  document.getElementById("sec-product-wrapper").innerHTML = sAllHtmlProduct;
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
    readProductData();
    return;
  }
  const aProductFilter = aProducts.filter(function (oProductLoop) {
    // <-- we are filtering through all the products only get the category chosen by the user then saving it into a variable
    return oProductLoop.category == sChosenCategory;
  });
  console.log(aProductFilter);

  // <-- er are doing exactly the same from line 22-25 because we are getting the same info from same place except we're just filtering through it
  let sAllHtmlProduct = "";
  aProductFilter.forEach((oProductLoop) => {
    let sOneProductHtml = createHtmlProduct(oProductLoop);
    sAllHtmlProduct = sAllHtmlProduct + sOneProductHtml;
  });
  document.getElementById("sec-product-wrapper").innerHTML = sAllHtmlProduct;
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
        <span class="material-symbols-outlined">\
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
