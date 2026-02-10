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
const editIcon = document.createElement('ion-icon')

function createCell(text = '') {
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    h3.textContent = text
    div.appendChild(h3)
    return div
}

function createActions(lign) {
    const div = document.createElement('div')
    div.classList.add('actions')

    editIcon.name = 'create-outline'

    const deleteIcon = document.createElement('ion-icon')
    deleteIcon.name = 'close-circle-outline'

    deleteIcon.addEventListener('click', () => {
        lign.remove()
    })

    div.appendChild(editIcon)
    div.appendChild(deleteIcon)

    return div
}

function toastError(message) {
    toastIon.style.color = 'red'
    toast.style.backgroundColor = 'rgba(255, 126, 126, 0.75)'
    toast.style.borderColor = 'rgb(255, 126, 126)'
    toastIon.name = 'alert-circle-outline'
    toastP.textContent = message
    toastAnim()
}

function toastCorrect(message) {
    toastIon.style.color = 'green'
    toast.style.backgroundColor = 'rgba(137, 255, 126, 0.75)'
    toast.style.borderColor = 'rgb(137, 255, 126)'
    toastIon.name = 'checkmark-circle-outline'
    toastP.textContent = message
    toastAnim()
}

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

    const lign = document.createElement('div')
    lign.classList.add('lign')

    const values = [
        ajoutInput.value,
        selectionType.value,
        selectionIngredient1.value,
        selectionIngredient2.value,
        selectionIngredient3.value
    ]

    values.forEach(value => lign.appendChild(createCell(value)))
    lign.appendChild(createActions(lign))
    table.appendChild(lign)

    toastCorrect('Recette ajoutée !')

    ajoutInput.value = ''
    selectionType.value = 'choisiseztype'
    selectionIngredient1.value = 'choisisez1'
    selectionIngredient2.value = 'choisisez2'
    selectionIngredient3.value = 'choisisez3'
})