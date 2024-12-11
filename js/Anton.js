// Initial filter that shows all items
filterSelection("alle","alle")


// Event listeners to detect changes in the select dropdowns

// Event listener to detect changes in the "fagområde" dropdown
document.getElementById('filter__subject').addEventListener('change', function(event) {
    const tagFilter = event.target.value;
    const typeFilter = document.getElementById('filter__product-type').value;
    filterSelection(tagFilter, typeFilter); // Pass both filters to filterSelection

    console.log("Tag filter changed to:", tagFilter);
});

// Event listener to detect changes in the "produkttype" dropdown
document.getElementById('filter__product-type').addEventListener('change', function(event) {
    const typeFilter = event.target.value;
    const tagFilter = document.getElementById('filter__subject').value;
    filterSelection(tagFilter, typeFilter); // Pass both filters to filterSelection

    console.log("Type filter changed to:", typeFilter);
});


// Function to filter elements based on user selection
function filterSelection(tagFilter, typeFilter) {
    let i;
    let x = document.getElementsByClassName("a--filterDiv");
    
    if (tagFilter === "alle") tagFilter = "";
    if (typeFilter === "alle") typeFilter = "";
    
    for (i = 0; i < x.length; i++) {
        removeShow(x[i], "a--show") // Remove "a--show" class initially

            //Check if element matches both filters
            if (x[i].className.indexOf(tagFilter) > -1 && x[i].className.indexOf(typeFilter) > -1) {
                addShow(x[i], "a--show") } // Add "a--show" to matching items 
    }
}

// Function that adds "a--show" class to selected elements, displaying them.
function addShow(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");

    for (i = 0; i < arr2.length; i++){ 
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];} // Only add if class doesn't exist
    }
}

// Function to remove "a--show" class from deselected elements.
function removeShow(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join (" ");
}