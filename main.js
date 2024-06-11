// declare the constants to use

const myForm= document.getElementById("form");
const myActivity = document.getElementById("activity");
const myBtn =document.getElementById("submit"); 
const activityList =document.getElementById("activity-list");

// enable and disable the submit button
// add an eventListener to the form input
myActivity.addEventListener("keyup", function(e) {
    const value = e.currentTarget.value;
    if (value === "" ){
        myBtn.disabled= true;
    }
    else{
        myBtn.disabled= false;
    }
}) 

// handle form submission
myForm.addEventListener("submit", function(e) {
    e.preventDefault() //prevents the form from being auto submitted

    const myInput = e.currentTarget.value;
    if (myInput!==""){
        const listItem = document.createElement("li");
        listItem.textContent= myActivity.value.trim();
        listItem.classList.add("activity-item");

        const editButton =document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");

        editButton.addEventListener("click", function(e) {
            const newActivity = prompt("Edit your activity: ", myActivity.value.trim())
           // ensure that the data entered is meanignful
            if(newActivity!==null && newActivity!==""){
                listItem.textContent=newActivity;
                listItem.appendChild(deleteButton);
                listItem.appendChild(editButton);
            } 
        })
        

        const deleteButton= document.createElement("button");
        deleteButton.textContent="Delete";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function(e) {
            activityList.removeChild(listItem);
        })
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        activityList.appendChild(listItem);  
    }

    myActivity.value="" //clear input
    myBtn.disabled=true;
    

})
