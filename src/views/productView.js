const productView = (() => {

  const SIZES_SELECT = '#sizeList';
  const COLOR_SELECT = '#colorList';


  const createSelectOption = (text, value, className, selected) => {;
    const option = document.createElement("option");
    option.text = text;
    option.value = value;
    if(className) {
      option.classList.add(className);
    }
    if(selected) {
      option.selected = 'selected';
    }
    return option;
  };

  const resetOptions = (selectElement) => {
    while (selectElement.length > 0) {
      selectElement.remove(0);
    }
  }

  const defineSizesDropdown = (targettedColor, sizesByColors) => {
    const sizesSelect = document.querySelector(SIZES_SELECT);
    resetOptions(sizesSelect);
    const sizes = sizesByColors[targettedColor];
    sizes.forEach(size => {
      sizesSelect.appendChild(createSelectOption(size.size,
                                                 size.size,
                                                 size.isAvailable ? '' : 'is-inactive'));
    });
  };

  const onChange = (event, sizesByColors) => {
    const targettedColor =  event.currentTarget.value;
    // first, we delete pre existing options in sizes dropdown
    defineSizesDropdown(targettedColor, sizesByColors);
  };



  function init(sizesByColors) {

    // here we iterate over sizes and we populate the DOM select object
    const colors = Object.keys(sizesByColors);

    // const sizesSelect = document.querySelector(SIZES_SELECT);
    const colorSelect = document.querySelector(COLOR_SELECT);

    // // here we iterate over colors and we populate the DOM select of colors
    colors.forEach((color, index) => {
      const selected = index === 0;
      colorSelect.appendChild(createSelectOption(color,
                                                 color,
                                                 '',
                                                 selected));
      if(selected) {
        defineSizesDropdown(color, sizesByColors);
      }
    });

    // here we attach the event listener so every time one of the dropdowns change,
    // we refresh sizes dropdown based on selected dolor
    colorSelect.addEventListener('change', function(e) { onChange(e, sizesByColors) });

  }
  return {
    init
  }
})();

export default productView;
