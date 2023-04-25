const appId = "ab485d08";
const appKey = "ee4db9055d833ba9531c27976a2d5429";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeContainer=document.querySelector("#recipe-container")
const txtSearch = document.getElementById("ip1")
const btnfind= document.querySelector(".btn")
const loadingEle=document.getElementById("loading")

btnfind.addEventListener("click",() => loadReceipes(txtSearch.value))

txtSearch.addEventListener("keyup", (e) => {
    const inputVal = txtSearch.value;
    if(e.keycode === 13) {
        loadReceipes(inputVal)
    }
})

const toggleLoad = (element, isShow) => { 
    element.classList.toggle("hide", isShow)
}

const setScrollPosition =() => {
    recipeContainer.scrollTo({ top:0, behavior: "smooth"});
}

function loadReceipes(type="paneer"){
    toggleLoad(loadingEle, false)
    const url= baseUrl + `&q=${type}`;
    fetch (url)
    .then((res) => res.json())
    .then((data) => {
        renderRecipes(data.hits)
        toggleLoad(loadingEle, true)}) 
    .catch((error) => toggleLoad(loadingEle, true))
    .finally(() => setScrollPosition());
}
loadReceipes()

const getRecipeStepsStr = (ingredientLines = []) =>{
    let str=""
    for(let steps of ingredientLines){
        str=str + `<li>${steps}</li>`
    }
    return str
} 

const renderRecipes =(recipeList = []) => {
    recipeContainer.innerHTML="";
    recipeList.forEach(recipeObj => {
        const {
            label: recipeTitle,
            ingredientLines,
            image: recipeImage,
        } = recipeObj.recipe;
        const recipeStepStr= getRecipeStepsStr(ingredientLines);
         const htmlStr = ` <div class="recipe">
         <div class="recipe-title">${recipeTitle}</div>
         <div class="recipe-image">
         <img src="${recipeImage}">
         </div>
         <div class="recipe-text">
          <ul>
           ${recipeStepStr}
          </ul>
         </div>
     </div>`;
     recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
    })
}