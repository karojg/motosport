import apiService from '../services/api';

const productModel = (() => {
  let fetchedProducts = null;
  const fetchModel = async () => {
    //  fetchApiData is the function in a service object
    //  that goes to the api and returns a promise
    return await apiService.fetchApiData().catch(e => console.error("An error occurred bringing data from the api"));
  }

  /**
   * params: reduced products from api
   * return: [{
   *  size: 'M',
   *  isAvailable: true
   * }]
   */
  const groupSizesByColors = (products) => {
    const groupedObject = {}
    products.forEach(product => {
      if(!groupedObject[product.color]) {
        // need to declare new array
        groupedObject[product.color] = [{size: product.size,
                                         isAvailable: product.availableQuantity !== 0}];
      } else {
        groupedObject[product.color].push({size: product.size,
                                           isAvailable: product.availableQuantity !== 0});
      }
    });
    return groupedObject;
  };

  // we  just get the data we want from the BLOB
  const reducedProducts = (resolvedPromise) => {
    const reducedProducts = resolvedPromise.data.products.map(product => {
      return product.skus.map(sku => ({
        id: sku.id,
        size: sku.size.name,
        color: sku.color.name,
        availabilityQuantity: sku.availability.stockLevel,
        availabilityStatus: sku.availability.status,
        image: sku.image.url
      }));
    }).flat();
    return reducedProducts;
  }

  const routing = () => {
    console.log(reducedProducts)
    console.log(window.location)
  }

  async function init() {
    // we go to the API once
    fetchedProducts = await fetchModel();
    return fetchedProducts;

  }

  return {
    init,
    groupSizesByColors,
    reducedProducts,
  };

})();

export default productModel;
