function updateLocalStorageData() {
    // Get today's date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
  
    // Check if the 'data' key exists in localStorage
    const storedData = localStorage.getItem('data');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        // If the stored date is the same as today's date, do nothing.
        if (parsedData.date === currentDate) {
          return;
        }
      } catch (error) {
        // If there's an error parsing, we'll treat it as if the data doesn't exist.
        console.error('Error parsing stored data:', error);
      }
    }
  
    // Function to generate a random string of 10 letters (lowercase)
    function generateRandomString(length) {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    }
  
    // Generate a new 10-letter random string
    const randomString = generateRandomString(10);
  
    // Create the new data object
    const newData = {
      date: currentDate,
      makeId: randomString
    };
  
    // Save the new data to localStorage in JSON format under the key 'data'
    localStorage.setItem('data', JSON.stringify(newData));
  }
  


function replacePlaceholderWithValue(placeholder, value) {
    var elements = document.getElementsByTagName("*");
  
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
  
      if (element.hasChildNodes()) {
        for (var j = 0; j < element.childNodes.length; j++) {
          var node = element.childNodes[j];
  
          if (node.nodeType === 3) { // Text node
            var text = node.nodeValue;
            var replacedText = text.replace(new RegExp("\\$\\$" + placeholder + "\\$\\$", "g"), value);
  
            if (replacedText !== text) {
              element.replaceChild(document.createTextNode(replacedText), node);
            }
          } else if (node.nodeType === 1 && node.tagName.toLowerCase() === 'a') { // <a> tag
            var href = node.getAttribute('href');
  
            if (href && href.indexOf('$$' + placeholder + '$$') !== -1) {
              var replacedHref = href.replace(new RegExp("\\$\\$" + placeholder + "\\$\\$", "g"), value);
              node.setAttribute('href', replacedHref);
            }
          }
        }
      }
    }
  }

document.addEventListener("DOMContentLoaded", function() {
    updateLocalStorageData()
    const data = JSON.parse(localStorage.getItem('data'))
    const { makeId } = data;
    replacePlaceholderWithValue('makeId', makeId);    
});  