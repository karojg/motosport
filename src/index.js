import productModel from './models/productModel';
import productView from './views/productView';
import './styles.scss'

const Controller = (async () => {

  // we fetch model and model data
  const products = await productModel.init();
  const reducedProducts = productModel.reducedProducts(products);
  const sizesByColors = productModel.groupSizesByColors(reducedProducts)

  // we send it to the view
  productView.init(sizesByColors);

})();

export default Controller;
