class Task {
    storage = localStorage.getItem('data')
    parseStorage = this.storage ? JSON.parse(this.storage) : []
    data = this.parseStorage

    constructor() {
        this.formCreateElement = document.querySelector('#formCreate')
        this.listElement = document.querySelector('#list')
        this.inputSearchElement = document.querySelector('#search')
        this.selectSortElement = document.querySelector('#sort')
        this.isEdit = false

        this.formCreateElement.addEventListener('submit', this.handleSubmitFormCreate.bind(this))
        this.listElement.addEventListener('change', this.handleTodoChange.bind(this))
        this.listElement.addEventListener('click', this.handleRemoveTodo.bind(this))
        this.listElement.addEventListener('click', this.handleEditTodo.bind(this))
        this.listElement.addEventListener('submit', this.handleSubmitFormEdit.bind(this))
        this.inputSearchElement.addEventListener('input', this.handleInputFilterForm.bind(this))
        this.selectSortElement.addEventListener('change', this.handleChangeSort.bind(this))
        window.addEventListener('beforeunload', () => {
            const string = JSON.stringify(this.data)
            localStorage.setItem('data', string)
        })
        document.addEventListener('DOMContentLoaded', () => this.render(this.data))
    }

    handleSubmitFormCreate(event) {
        event.preventDefault()
        const date = new Date()

        const todo = {
            createdAt: date,
            id: date.getTime(),
            isChecked: false
        }
        const formData = new FormData(this.formCreateElement)
        for (let [name, value] of formData) {
            todo[name] = value
        }
        this.data.push(todo)
        this.render(this.data)
        this.formCreateElement.reset()
    }

    handleInputFilterForm(event) {
        event.preventDefault()
        const { target } = event
        const searchString = target.value
        const matches = this.data.filter((item) => item.title.includes(searchString))
        this.render(matches)
    }

    handleChangeSort(event) {
        const { target } = event
        const { value } = target
        let sortData = []
        if (value) {
            sortData = this.data.sort((a, b) => {
                if (+a[value] > +b[value]) return -1
                if (+a[value] < +b[value]) return 1
            })
        } else {
            sortData = this.data
        }
        this.render(sortData)
    }


    handleSubmitFormEdit(event) {
        event.preventDefault()
        const { target } = event
        const inputElement = target.querySelector('input[name="title"]')
        const { value } = inputElement
        const { id } = target.dataset
        this.data.forEach((item) => {
            if (item.id == id) {
                item.title = value
            }
        })
        let parent = target.closest('.island__item')
        parent.classList.remove('island__item_edit')
        this.isEdit = false
        this.render(this.data)
    }

    buildDate(date) {
        let objectDate = new Date()
        const dateCreate = this.transformData(objectDate.getDate())
        const monthCreate = this.transformData(objectDate.getMonth() + 1)
        const yearCreate = objectDate.getFullYear()
        return `${dateCreate}.${monthCreate}.${yearCreate}`
    }

    transformData(time) {
        return time < 10 ? `0${time}` : time
    }

    optimization(event) {
        const { target } = event
        const { id } = target.dataset
        data.forEach((item) => {
            if (item.isChecked == target.checked) {
            }
        })
    }


    todoTemplate({ title, id, isChecked, createdAt, estimate, priority, isEdit }) {

        const dateCreateAt = this.buildDate(createdAt)
        let priorityForm = `${priority}`
        priorityForm = this.buildPriorityForm(priorityForm)
        const attrId = 'todo' + id
        const attrChecked = isChecked ? 'checked' : ''
        const estimateInput = estimate ? `${estimate}ч.` : ''
        return `

        <div class="island__item  ${isChecked ? 'island__item_checked' : ''}">
        <div class="form-check">
        <div class="form-check_primary">
        <div class="form-check_primary_item">
            <input
            class="form-check-input"
            type="checkbox" id="${attrId}" ${attrChecked} data-id="${id}">     

            <label data-id="${id}" for="${attrId}">
            ${title}
            </label>
            <form action="" class="form-edit"  data-id="${id}">        
                <input type="text" class="island__input_edit" name="title" placeholder="" value="${title}" >               
                <button type="submit" class="button-save"></button>                
            </form>
            </div> 
            <button class="button_edit" data-id="${id}" type="button" data-role="edit"></button>
            <div class="form-create-data">${dateCreateAt}</div>
            </div> 
            <div class="form-check_secondory">  

            <button class="btn-remove" data-id="${id}" data-role="remove"></button>
            <span class="star">${priorityForm}</span>
            <span class="estimate">${estimateInput}</span>
            </div>
            </div>
            </div>       
        `
    }

    handleEditTodo(event) {
        const { target } = event
        if (target.dataset.role != 'edit') return
        if (this.isEdit) {
            alert('Задача уже редактируется!')
            return
        }
        let parent = target.closest('.island__item')
        parent.classList.add('island__item_edit')
        this.isEdit = true
    }

    buildPriorityForm(priorityForm) {
        const imgStar = '<img src="img/star.png" alt="">'
        let sum = " "
        for (let i = 0; i < priorityForm; i++) {
            sum = sum + imgStar
        }
        priorityForm = sum
        return priorityForm
    }

  
    handleTodoChange(event) {
        const { target } = event
        const { id } = target.dataset
        if (target.type != 'checkbox') return
        this.data.forEach((item) => {
            if (item.id == id) {
                item.isChecked = target.checked
            }
        })
        let parent = target.closest('.island__item')
        parent.classList.toggle('island__item_checked')
    }

    handleRemoveTodo(event) {
        const { target } = event
        if (target.dataset.role != 'remove') return
        const { id } = target.dataset
        this.data.forEach((item, index) => {
            if (item.id == id) {
                this.data.splice(index, 1)
            }
        })
        this.render(this.data)
    }

    render(todoList) {
        let result = ''        
        todoList.forEach((todo) => {
            const template = this.todoTemplate(todo)
            result = result + template
        })
        this.listElement.innerHTML = result
    }

}

let task = new Task()





