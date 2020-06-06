function populateUfs() {
  const ufSelect = document.querySelector("select[name=uf]")
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {
    
    for( const state of states ) {
      ufSelect.innerHTML += '<option value=' + state.id + '>' + state.nome + '</option>'
    }
    
  })
}

populateUfs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("[name=state]")

  

  const ufValue = event.target.value

  const indexOfselectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfselectedState].text

  const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+ ufValue+'/municipios'

  stateInput.innerHTML = ""
  citySelect.innerHTML = ""
  citySelect.disabled = true

  fetch(url)
  .then( res => res.json() )
  .then( cities => {
   
    for( const city of cities ) {
      citySelect.innerHTML += '<option value=' + city.nome + '>' + city.nome + '</option>'
    }

    citySelect.disabled = false
    
  })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


//  === ITEMS DE COLETA ===

 //Itens de coleta
// pegar todos Li´s
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) { //pra cada um dos items (itemsToCollect) => add uma callback(handleSelectedItem) para ser excutada somente quando for clicada
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]") // pegar os itens coletados

let selectedItems = [] // para colocar eles aqui (selectedItems)

//Chegamos na função => clicou no item faça isso
function handleSelectedItem(event) {
  
  const itemLi = event.target // target que é um li clicado 
  
  //adcionar ou remover classe co JS
  itemLi.classList.toggle("selected")
  
  const itemId = itemLi.dataset.id//isso é muito top, vide data-id no html=> estou pegando o Id dele 




  // === LÓGICA ARA SELEÇÃO DE ITENS ===

  // verificar se existe items selecionado, 
  // se SIM  pegar itens selecionados
  const alreadySelected = selectedItems.findIndex( item => { //=> aqui é pra pegar os itens selecionados
    const itemFound = item == itemId 
    return itemFound
  })

  // se já estiver selecionado, 
  if (alreadySelected >= 0) {
    //tirar da seleção
    const filteredItems = selectedItems.filter( item => { //aqui iria filtrar, tirar ou colocar na seleção
      const itemIsDifferent = item != itemId // false
      return itemIsDifferent
    })

    selectedItems = filteredItems //=> e os items filtrados ele iria colocar
  } else {
    // se não estiver selecionado,
    //adcionar a seleção
    selectedItems.push(itemId)
  }

  console.log(selectedItems)

  collectedItems.value = selectedItems


  // atualizar o campo escondido com os itens selecionados

}

