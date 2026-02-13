// Selections des élements dans le dom
const table = document.querySelector('.table')
const selectionType = document.getElementById('type')
const selectionIngredient1 = document.getElementById('ingredient_1')
const selectionIngredient2 = document.getElementById('ingredient_2')
const selectionIngredient3 = document.getElementById('ingredient_3')
const buttonAdd = document.querySelector('.button_add')
const ajoutInput = document.querySelector('.ajout input')
const toast = document.querySelector('.toast')
const toastIon = document.querySelector('.toast ion-icon')
const toastP = document.querySelector('.toast p')

const RECIPES_KEY = 'recettes'

// Function qui crée une div et un h3
function createCell(text = '') {
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    h3.textContent = text
    div.appendChild(h3)
    return div
}

function createActions(index){

    // création de la div action
    const div = document.createElement('div')
    div.classList.add('actions')

    // création de l'icon edit
    const editIcon = document.createElement('ion-icon')
    editIcon.name = 'create-outline'

    // création de l'icon suprr
    const deleteIcon = document.createElement('ion-icon')
    deleteIcon.name = 'close-circle-outline'

    deleteIcon.addEventListener('click', () => {

        // function getStoredRecipes
        const recipes = getStoredRecipes()

        // rajoute 1 element au tableau
        recipes.splice(index, 1)

        // sauvegarge le tableau
        saveRecipes(recipes)
        renderRecipes()

        // Affiche le toast avec le message 'recette supprimé' dans le toast
        toastCorrect('Recette supprimée')
    })

    // rajoute l'icon edit et suppr à la div
    div.appendChild(editIcon)
    div.appendChild(deleteIcon)

    return div
}

function getStoredRecipes() {
    try{
        // récupère la clé et verifie si elle est correct
        const raw = localStorage.getItem(RECIPES_KEY)
        return raw ? JSON.parse(raw) : []
    }catch(e){
        // sinon ne retourne rien
        return []
    }
}

function saveRecipes(recipes) {
    // function qui sauvegarde la clée sous forme de json dans le local storage
    localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes))
}

function renderRecipes(){

    // selection le haut du tableau
    const top = table.querySelector('.top')

    // selectionne toute les lign et les supprimes
    table.querySelectorAll('.lign').forEach(n => n.remove())

    const recipes = getStoredRecipes()
    recipes.forEach((r, i) => {
        // crée une ligne
        const lign = document.createElement('div')
        lign.classList.add('lign')

        // toute les différentes catégories du tableau
        const values = [r.name, r.type, r.ing1, r.ing2, r.ing3]
        values.forEach(value => lign.appendChild(createCell(value)))
        lign.appendChild(createActions(i))

        // insère une lign après le haut du tableau
        if (top && top.parentElement === table) table.appendChild(lign)
        else table.appendChild(lign)
    })
}

// la function du toast erreur
function toastError(message) {
    toastIon.style.color = 'red'
    toast.style.backgroundColor = 'rgba(255, 126, 126, 0.75)'
    toast.style.borderColor = 'rgb(255, 126, 126)'
    toastIon.name = 'alert-circle-outline'
    toastP.textContent = message
    toastAnim()
}

// la function du toast correct
function toastCorrect(message) {
    toastIon.style.color = 'green'
    toast.style.backgroundColor = 'rgba(137, 255, 126, 0.75)'
    toast.style.borderColor = 'rgb(137, 255, 126)'
    toastIon.name = 'checkmark-circle-outline'
    toastP.textContent = message
    toastAnim()
}

// l'animation du toast
function toastAnim() {
    toast.style.opacity = '1'
    toast.style.top = '14px'

    setTimeout(() => {
        toast.style.top = '-50px'
        setTimeout(() => {
            toast.style.opacity = '0'
        }, 3000)
    }, 3000)
}

buttonAdd.addEventListener('click', () => {
    // au clique plusieurs reponses celon les élements manquand ou autres
    if (ajoutInput.value === '') {
        toastError('Veuillez rentrer un nom de recette')
        return
    }

    if (selectionType.value === 'choisiseztype') {
        toastError('Veuillez sélectionner un type de repas')
        return
    }

    if (selectionIngredient1.value === 'choisisez1') {
        toastError('Veuillez sélectionner le premier ingrédient')
        return
    }

    if (selectionIngredient2.value === 'choisisez2') {
        toastError('Veuillez sélectionner le deuxième ingrédient')
        return
    }

    if (selectionIngredient3.value === 'choisisez3') {
        toastError('Veuillez sélectionner le troisième ingrédient')
        return
    }

    // prend les valeurs de chaque selections et de l'input
    const recipe = {
        name: ajoutInput.value,
        type: selectionType.value,
        ing1: selectionIngredient1.value,
        ing2: selectionIngredient2.value,
        ing3: selectionIngredient3.value
    }

    // rentre dans recipes et sauvegarde
    const recipes = getStoredRecipes()
    recipes.push(recipe)
    saveRecipes(recipes)
    renderRecipes()

    toastCorrect('Recette ajoutée !')

    // Reset les selections
    ajoutInput.value = ''
    selectionType.value = 'choisiseztype'
    selectionIngredient1.value = 'choisisez1'
    selectionIngredient2.value = 'choisisez2'
    selectionIngredient3.value = 'choisisez3'
})

// affiche le rendu final
renderRecipes()
