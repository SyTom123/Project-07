const ProperName = (string = "")=> {
    const convertToArray = string.toLowerCase().split(' ');
    const result = convertToArray.map((item) => {
      return item.replace(item.charAt(0), item.charAt(0).toUpperCase());
    });
    
    return result.join(' ');
}
export default ProperName