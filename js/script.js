/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//Element variables
const studentList = document.querySelector(".student-list");
const pageButtons = document.querySelector(".link-list");
const itemsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  // create two variables which will represent the index for the first and last student on the page
 let startIndex = (page * itemsPerPage) - itemsPerPage;
 let endIndex = page * itemsPerPage -1;
  
  // set the innerHTML property of the variable you just created to an empty string
studentList.innerHTML = '';
  
  // loop over the length of the `list` parameter
 for(let i = 0; i < list.length ; i++){
   
    // inside the loop create a conditional to display the proper students
      if( startIndex <= i && i <= endIndex){
        
        // create the elements needed to display the student information
        // insert the above elements
    const studentItem = `
      <li class="student-item cf">
      <div class="student-details">
       <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
       <h3>${list[i].name.first} ${list[i].name.last}</h3>
       <span class="email">${list[i].email}</span>
    </div>
    <div class="joined-details">
      <span class="date">Joined ${list[i].registered.date}</span>
    </div>
  </li>
    `;
     // inside the conditional:
    studentList.insertAdjacentHTML("beforeend", studentItem);
   }
 }
}
//call function
showPage(data,1);


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list){
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   // console.log(numOfPages);
   pageButtons.innerHTML = '';
   if(numOfPages !== 0){
      for (let i = 1; i <= numOfPages ; i++){
         let button = `
               <li>
                  <button type="button" class="btn">${i}</button>
               </li>
         
         `;

         pageButtons.insertAdjacentHTML("beforeend", button);
      }
      const buttons = pageButtons.querySelectorAll(".btn");
   
      // add the 'active' class to the first button
      buttons[0].classList.add('active');

      // Create an addEventListener on linkList that will be called when there is a click event
      pageButtons.addEventListener("click", (e) => {
         const clickedButton = e.target;
            if (clickedButton.tagName === "BUTTON") {
                  for(let i = 0; i < buttons.length; i++){
                     buttons[i].className = '';
                  }
                  
                  clickedButton.className = 'active';
                  showPage(list, clickedButton.textContent);   
               }
      });
   
   } else {
         return;   
      }

}
// Call function
addPagination(data);


//Creating a search Bar to filter out the names on the page
const searchBar = document.querySelector("header")
let searchForm = `
                    <label for="search" class="student-search">
                     <span>Search by name</span>
                     <input id="search" placeholder="Search by name...">
                     <button type="button" id="button">
                        <img src="img/icn-search.svg" alt="Search icon">
                     </button>
                   </label>
                   `;
searchBar.insertAdjacentHTML("beforeend", searchForm);

const search = document.getElementById("search");
const errorMessage = document.createElement('p');
errorMessage.className = 'errorMessage';
searchBar.parentNode.appendChild(errorMessage);

//searchFilter function is used to find a student by first or last name, errorMessage will be returned if there are no matches
function searchFilter(inputName, studentsList){
   let filteredName = [];
   errorMessage.textContent = '';
   for(let i = 0 ; i < studentsList.length; i++){
      if(studentsList[i].name.first.toLowerCase().includes(inputName.toLowerCase()) || 
      studentsList[i].name.last.toLowerCase().includes(inputName.toLowerCase()) ){
         filteredName.push(studentsList[i]);
         errorMessage.style.display="none";
      } else if (filteredName.length == 0) { 
         errorMessage.textContent = '" ' + inputName +' " '+ ' is not found, please try again.';
         errorMessage.style.display="block";
      }
   }
   showPage(filteredName,1);
   addPagination(filteredName);
}

let searchName= "";
const inputSearch = document.querySelector("#search");
inputSearch.addEventListener("keyup", (e) => {
   searchName = e.target.value;
   searchFilter(searchName, data);
 });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
        
        
        

    