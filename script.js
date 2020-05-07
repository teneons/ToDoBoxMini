let addNewItemInput = document.getElementById('addNewItemInput');
let addNewItemBtn = document.getElementById('addNewItemBtn');


class CreateItem {
    constructor(textItem) {
        this.createCardElements(textItem)

    }

    createCardElements(textItem) {
        let card = document.createElement('div');
        card.classList.add('card', 'column', 'col-4', 'col-mx-auto');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group')

        let itemText = document.createElement('input');
        itemText.classList.add('form-input', 'input-sm');
        itemText.type = 'text';
        itemText.id = 'itemText';
        itemText.value = textItem;
        itemText.disabled = true;

        let btnEdit = document.createElement('button');
        btnEdit.classList.add('btn', 'btn-sm', 'c-hand', 'bg-success');

        let btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-sm', 'c-hand', 'bg-error');

        let iconEdit = document.createElement('icon');
        iconEdit.classList.add('icon', 'icon-edit');

        let iconDelete = document.createElement('icon');
        iconDelete.classList.add('icon', 'icon-delete');

        //add elements in box
            const script1 = document.getElementsByTagName('script')[0]; //for fixing insert 1st el. in html
            let parentN = script1.parentNode;
        parentN.insertBefore(card, script1)

        card.appendChild(cardBody);
        cardBody.appendChild(inputGroup);
        inputGroup.appendChild(itemText);
        inputGroup.appendChild(btnEdit);
            btnEdit.appendChild(iconEdit);
        inputGroup.appendChild(btnDelete);
            btnDelete.appendChild(iconDelete);
    

        //put events on btn
        btnEdit.addEventListener('click', () => this.editCard(itemText));
        btnDelete.addEventListener('click', () => this.deleteCard(card));
    }

    //events for btn
    editCard(itemText) {
        itemText.disabled = !itemText.disabled;
    }

    deleteCard(CreateItem) {
        card.revoveChild(CreateItem);
    }

}


function checkText() {
    if(addNewItemInput.value != ""){
        new CreateItem(addNewItemInput.value);
        addNewItemInput.value = "";
    }
}


addNewItemBtn.addEventListener('click', checkText)