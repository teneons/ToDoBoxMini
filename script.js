let addNewItemInput = document.getElementById('addNewItemInput');
let addNewItemBtn = document.getElementById('addNewItemBtn');


class CreateItem {
    constructor(textItem) {
        this.createCardElements(textItem)

    }

    createCardElements(textItem) {
        let card = document.createElement('div');
        card.classList.add('card', 'column', 'col-xs-10', 'col-sm-9', 'col-md-7', 'col-lg-7', 'col-xl-6', 'col-5', 'col-mx-auto');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group')

        let itemText = document.createElement('input');
        itemText.classList.add('form-input', 'input-md');
        itemText.type = 'text';
        itemText.id = 'itemText';
        itemText.value = textItem;
        itemText.disabled = true;

        let btnEdit = document.createElement('button');
        btnEdit.classList.add('btn', 'btn-md', 'c-hand', 'bg-success');
        btnEdit.id = 'btnEdit';

        let btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-md', 'c-hand', 'bg-error');
        btnDelete.id = 'btnDelete';

        let iconEdit = document.createElement('icon');
        iconEdit.classList.add('icon', 'icon-edit');

        let iconEditDone = document.createElement('icon');
        iconEditDone.classList.add('icon', 'icon-check')

        let iconDelete = document.createElement('icon');
        iconDelete.classList.add('icon', 'icon-delete');

        //add elements in box
            const script1 = document.getElementsByTagName('script')[0]; //for fixing insert 1st el. in html
            let parentN = script1.parentNode;
        parentN.insertBefore(card, script1)

        card.append(cardBody);
        cardBody.append(inputGroup);
        inputGroup.append(itemText);
        inputGroup.append(btnEdit);
            btnEdit.append(iconEdit);
        inputGroup.append(btnDelete);
            btnDelete.append(iconDelete);
    

        //put events on btn
        btnEdit.addEventListener('click', () => this.editCard(itemText));
        btnDelete.addEventListener('click', () => card.remove())
    }

    //events for btn
    editCard(itemText) {
        itemText.disabled = !itemText.disabled;
    }

}


function checkText() {
    if(addNewItemInput.value != ""){
        new CreateItem(addNewItemInput.value);
        addNewItemInput.value = "";
    }
}


addNewItemBtn.addEventListener('click', checkText)


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
