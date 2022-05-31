/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
let VIEWPORT_HEIGHT = window.innerHeight;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const openMenu = () => {
  let x = document.querySelector("#navbar__list");
  if (x.className === "navbar__list") {
    x.className += " responsive";
  } else {
    x.className = "navbar__list";
  }
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
/**
 * The general idea here is to first loop through web site section to know how many sections are there
 * then we start creating list items into our unordered list that represents each section
 * finally we will attach on click lister to each li to scroll to the section
 */

// Getting all sections in page

// Creating event click listener function once for performance
const listItemClickHandler = (e) => {
  e.preventDefault();
  document
    .querySelector(`[data-nav="${e.target.innerHTML}"]`)
    .scrollIntoView({ behavior: "smooth" });
};

// Converting nodelist to array using the spreading technique and loop to create nav li
const createListIemsFromSections = () => {
  const sections = document.querySelectorAll("section");
  const liList = [...sections].map((section) => {
    // Creating the li
    const newLi = document.createElement("li");
    newLi.classList.add("menu__link");
    //This class will be used to highligh li that is active
    newLi.setAttribute("heilight", section.id);
    newLi.innerHTML = section.attributes["data-nav"].value;

    // Adding on click listener, this function is a reference we will only have one function for all list items
    newLi.addEventListener("click", listItemClickHandler);

    return newLi;
  });
  return liList;
};

let listItem = createListIemsFromSections();

const appendListItemsToUnorderedList = (listItems) => {
  let navUL = document.querySelector("#navbar__list");
  // Clearing any child items
  navUL.innerHTML = "";

  // Appending li as child to ul
  listItems.forEach((li) => {
    navUL.appendChild(li);
  });
  //Adding menu for responsive design
  document.querySelector("li").insertAdjacentHTML(
    "beforeBegin",
    `  <li class="icon" onclick="openMenu()">
                <i class="fa fa-bars"></i>
            </li>`
  );
};

appendListItemsToUnorderedList(listItem);

// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", () => {
  //getting all sections positions and filter the one that is close to top
  const sections = document.querySelectorAll("section");
  let activeSection = [...sections].filter((section) => {
    return (
      section.getBoundingClientRect().y <= VIEWPORT_HEIGHT &&
      section.getBoundingClientRect().y >= -(VIEWPORT_HEIGHT / 2) + 1 &&
      section.getBoundingClientRect().y < VIEWPORT_HEIGHT / 2 + 100
    );
  });

  //Remove active class from all sections
  [...sections].forEach((section) => {
    section.classList.remove("your-active-class");
  });

  //Adding to correct one
  activeSection.length > 0 &&
    activeSection[0].classList.add("your-active-class");

  //Remove active class from all nav li
  const navLis = document.querySelectorAll(".navbar__menu li");
  [...navLis].forEach((li) => {
    li.classList.remove("li-active");
  });

  //Adding style to correct li
  let hilightedLi =
    activeSection.length > 0 &&
    document.querySelector(`[heilight="${activeSection[0].id}"]`);

  hilightedLi && hilightedLi.classList.add("li-active");

  //Hiding and re-showing nav
  let nav = document.querySelector("nav");
  nav.classList.add("hideme");
  setTimeout(() => {
    nav.classList.remove("hideme");
  }, 500);
});

// Adding section dynamic
const addSectionBtn = document.querySelector("#add-section");
addSectionBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Getting the last section data to increment it by 1
  const docSections = document.querySelectorAll("section");
  const lastSectionId = [...docSections].length;
  const nextId = lastSectionId + 1;
  const idData = `section${nextId}`;
  const textData = `Section ${nextId}`;

  const sectionData = `
    <section id="${idData}" data-nav="${textData}">
        <div class="landing__container">
            <h2>${textData}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

            <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>
    </section>
  `;

  const section = document.querySelectorAll("section");
  const lastSection = section[section.length - 1];
  lastSection.insertAdjacentHTML("afterEnd", sectionData);

  //Adding it to navbar
  let listItem = createListIemsFromSections();
  appendListItemsToUnorderedList(listItem);
});
