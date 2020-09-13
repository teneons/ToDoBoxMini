let addNewItemInput = document.getElementById('addNewItemInput');
let addNewItemBtn = document.getElementById('addNewItemBtn');


class CreateItem {
    constructor(textItem, idItem) {
        this.createCardElements(textItem, idItem);
    }

    createCardElements(textItem, idItem) {
        let card = document.createElement('div');
        card.classList.add('card', 'column', 'col-xs-9', 'col-sm-8', 'col-md-6', 'col-lg-6', 'col-xl-5', 'col-4', 'col-mx-auto');
        card.id = idItem;

        
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

        let iconDelete = document.createElement('icon');
        iconDelete.classList.add('icon', 'icon-delete');

        let iconEditDone = document.createElement('object');
        iconEditDone.data = './style/iconEditDone.svg';
        iconEditDone.type = 'image/svg+xml';
        iconEditDone.id = 'iconEditDone';

        //add elements in box
        const script1 = document.getElementsByTagName('script')[0]; //for fixing insert 1st el. in html
            let parentN = script1.parentNode;
        parentN.insertBefore(card, script1)

        const allItemsBox = document.getElementById('allItemsBox');
        allItemsBox.append(card);
        card.append(cardBody);
        cardBody.append(inputGroup);
        inputGroup.append(itemText);
        inputGroup.append(btnEdit);
            btnEdit.append(iconEdit);
        inputGroup.append(btnDelete);
            btnDelete.append(iconDelete);


        //put events on btn
        btnEdit.addEventListener('click', () => {
            this.editCard(itemText, iconEdit);
            console.log(localStorage.getItem(card.id))
        });

        //remove
        btnDelete.addEventListener('click', () => {
            localStorage.removeItem(card.id)
            card.remove();
        })
    }

    //events for btn
    editCard(itemText, iconEdit) {
        iconEdit.classList.remove('icon-edit');
        iconEdit.classList.add('icon-check');

        if(!itemText.disabled) {
            iconEdit.classList.remove('icon-check');
            iconEdit.classList.add('icon-edit');
        }

        itemText.disabled = !itemText.disabled;

    }

}

function checkText() {
    if(addNewItemInput.value != ""){
            const idItem = Math.floor(Math.random() * 16777215).toString(16); //key for obj for LocalStorage
            const itemArr = [addNewItemInput.value, false, new Date()]
        localStorage.setItem(idItem, JSON.stringify(itemArr)); //set to LocSt
        new CreateItem(addNewItemInput.value, idItem);
        addNewItemInput.value = "";
    }
}

addNewItemBtn.addEventListener('click', checkText)


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
