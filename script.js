let addNewItemInput = document.getElementById('addNewItemInput');
let addNewItemBtn = document.getElementById('addNewItemBtn');


class CreateItem {
    constructor(textItem, idItem) {
        this.createCardElements(textItem, idItem);
    }

    createCardElements(textItem, idItem) {
        const card = document.createElement('div');
        	card.classList.add('card', 'column', 'col-xs-10', 'col-sm-9', 'col-md-7', 'col-lg-7', 'col-xl-6', 'col-5', 'col-mx-auto');
					card.id = 'itemCard';
					card.idItem = idItem;

        
        const cardBody = document.createElement('div');
        	cardBody.classList.add('card-body');

        const inputGroup = document.createElement('div');
        	inputGroup.classList.add('input-group')

        const itemText = document.createElement('input');
          itemText.classList.add('form-input', 'input-md');
          itemText.type = 'text';
          itemText.id = 'itemText';
          itemText.value = textItem;
          itemText.disabled = true;
        
        //create btns
        const btnDone = document.createElement('button');
          btnDone.classList.add('btn', 'btn-md', 'c-hand', 'bg-warning', 'tooltip', 'tooltip-bottom');
					btnDone.id = 'btnDone';
					btnDone.setAttribute('data-tooltip', 'Done');
        
        const btnEdit = document.createElement('button');
          btnEdit.classList.add('btn', 'btn-md', 'c-hand', 'bg-success', 'tooltip', 'tooltip-bottom');
					btnEdit.id = 'btnEdit';
					btnEdit.setAttribute('data-tooltip', 'Edit');

        const btnDelete = document.createElement('button');
          btnDelete.classList.add('btn', 'btn-md', 'c-hand', 'bg-error', 'tooltip', 'tooltip-bottom');
					btnDelete.id = 'btnDelete';
					btnDelete.setAttribute('data-tooltip', 'Remove');

        //set icons for btn
        const iconDone = document.createElement('icon');
          iconDone.classList.add('icon', 'icon-emoji')

        const iconEdit = document.createElement('icon');
          iconEdit.classList.add('icon', 'icon-edit');

        const iconDelete = document.createElement('icon');
					iconDelete.classList.add('icon', 'icon-delete');
					
				//time field
				const blockItemTime = document.createElement('div');
				const iconItemTime = document.createElement('icon');
					iconItemTime.classList.add('icon', 'icon-time');
				const txtItemTime = document.createElement('span');
					txtItemTime.classList.add('text-tiny')
					let itmTime = JSON.parse(localStorage.getItem(idItem))
					txtItemTime.innerText = itmTime.createDate


        //add elements in box
        const script1 = document.getElementsByTagName('script')[0]; //for fixing insert 1st el. in html
          let parentN = script1.parentNode;
        parentN.insertBefore(card, script1)

        const allItemsBox = document.getElementById('allItemsBox');
        allItemsBox.append(card);
        card.append(cardBody);
        cardBody.append(inputGroup);
        inputGroup.append(itemText);
        inputGroup.append(btnDone)
          btnDone.append(iconDone)
        inputGroup.append(btnEdit);
          btnEdit.append(iconEdit);
        inputGroup.append(btnDelete);
					btnDelete.append(iconDelete);
				cardBody.append(blockItemTime);
				blockItemTime.append(iconItemTime);
				blockItemTime.append(txtItemTime);


        //put events on btn
        btnDone.addEventListener('click', () => {
          this.doneCard(card.idItem)
        })


        //edit
        btnEdit.addEventListener('click', () => {
          this.editCard(itemText, iconEdit, card.idItem);
        });

        //remove
        btnDelete.addEventListener('click', () => {
          localStorage.removeItem(card.idItem)
          card.remove();
        })
    }

    //events for btn
    editCard(itemText, iconEdit, id) {
        //change icon
        iconEdit.classList.remove('icon-edit');
        iconEdit.classList.add('icon-check');

        if(!itemText.disabled) {
          iconEdit.classList.remove('icon-check');
          iconEdit.classList.add('icon-edit');
        }

        itemText.disabled = !itemText.disabled;

        //new txt in LS
        let itm = JSON.parse(localStorage.getItem(id));
        itm.txtItem = itemText.value;

        try {
          localStorage.setItem(id, JSON.stringify(itm))
        } catch (e) {
            if(e == 'QUOTA_EXCEEDED_ERR') {
              alert('ERROR - your local storage was crowded')
            }
        }
    }

    doneCard(id) {
        let item = JSON.parse(localStorage.getItem(id))

        if(item.statusDone == false) {
          item.statusDone = true
        } else item.statusDone = false

        let itemNew = JSON.stringify(item)
        try {
            JSON.stringify(localStorage.setItem(id, itemNew))
        } catch(e) {
          if(e == 'QUOTA_EXCEEDED_ERR') {
              alert('ERROR - your local storage was crowded')
          }
        }
    }

}

function checkText() {
    if(addNewItemInput.value != ""){
            const idItem = Math.floor(Math.random() * 16777215).toString(16); //key for obj for LocalStorage
						const statusDone = false;
						const nDate = new Date();
							const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
							const createDate = `${nDate.getHours()}:${nDate.getMinutes()} \t ${nDate.getDate()} ${monthNames[nDate.getMonth()]} ${nDate.getFullYear()}`
            const itemObj = {txtItem: addNewItemInput.value, statusDone: statusDone, createDate: createDate};
        
        //set to LocSt
        try {
          localStorage.setItem(idItem, JSON.stringify(itemObj));
        } catch(e) {
          if(e == 'QUOTA_EXCEEDED_ERR') {
              alert('ERROR - your local storage was crowded')
          }
        }

        new CreateItem(addNewItemInput.value, idItem);
        addNewItemInput.value = "";
    }
}

//btn/enter add new item
addNewItemBtn.addEventListener('click', checkText)
addNewItemInput.addEventListener('keydown', (event) => {
  if(event.key == 'Enter') checkText()})


window.onload = () => {
    // for (let i = 0 in localStorage.key){
    //     localStorage.getItem(i, localStorage.key)
    // }
    //new CreateItem()
}

//JS for style
//check on empty input
addNewItemInput.oninput = () => {
  if(addNewItemInput.value != '') {
      addNewItemBtn.disabled = false;
  } else addNewItemBtn.disabled = true;
}

//loading
addNewItemBtn.addEventListener('click', () => {
    addNewItemBtn.classList.add('loading');

    setTimeout(() => {
      addNewItemBtn.classList.remove('loading');
    }, 200)

    addNewItemBtn.disabled = true;
})
