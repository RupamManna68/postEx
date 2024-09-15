console.log("Js running");
function makeId(length = 12) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const idArray = [];
    for (let i = 0; i < length; i++) {
      idArray.push(characters.charAt(Math.floor(Math.random() * characters.length)));
    }
    return idArray.join("");
  };
  
  function generateAndDisplayId() {
    const randomId = makeId();
    const idElement = document.getElementById("random-id");
    const generateButton = document.getElementById("generate-button");
  
    if (idElement && generateButton) {
      idElement.textContent = randomId;
      generateButton.disabled = true;
      generateButton.textContent = "ID Generated";
    } else {
      console.error("Element with ID 'random-id' or 'generate-button' not found.");
    }
  };
