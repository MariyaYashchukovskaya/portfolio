import { nanoid } from 'nanoid'
import { Modal } from 'bootstrap'
import { resetForm } from './helpers'
import { buildDate } from './transform-data'

class Form {
  constructor (formElement) {
    this.formElement = formElement
    this.buttonCreatePostModal = document.querySelector('#buttonCreatePost')

    this.baseUrl = '/api/posts'
    this.instanceModal = Modal.getOrCreateInstance(document.querySelector('#formModal'))
    this.currentDataEdit = ''
    this.inputElement = this.formElement.querySelectorAll('label')

    this.post = ''

    this.init()
  }

  init () {
    this.formElement.addEventListener('submit', this.handleFormSubmit.bind(this))
    this.buttonCreatePostModal.addEventListener('click', this.handleClickButtonCreatePost.bind(this))
    window.addEventListener('post.edit', this.handlePostEdit.bind(this))
  }

  handleFormSubmit (event) {
    event.preventDefault()
    const date = new Date()
    const transformDate = buildDate(date)

    const post = {
      id: nanoid(),
      createdAt: transformDate,
      selectType: ''
    }

    const formData = new FormData(this.formElement)
    for (const [name, value] of formData) {
      if (value) {
        post[name] = value
      }
    }

    this.sendData(post)
    this.instanceModal.hide()
    resetForm(this.formElement)
  }

  async sendData (post) {
    const json = JSON.stringify(post)
    const {
      method
    } = this.formElement.dataset
    let url = this.baseUrl
    if (method === 'PUT') {
      this.currentDataEdit = post
      url = `${url}/${post.id}`
      const customEvent = new CustomEvent('post.edited', {
        detail: {
          post
        }
      })
      window.dispatchEvent(customEvent)
    }

    const response = await fetch(url, {
      method,
      body: json,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    const event = new CustomEvent('form.sent', {
      detail: {
        data
      }
    })
    window.dispatchEvent(event)
  }

  handlePostEdit (event) {
    resetForm(this.formElement)
    this.instanceModal.show()
    this.formElement.setAttribute('data-method', 'PUT')
    const {
      data
    } = event.detail
    console.log(data)
    console.log(this.currentDataEdit)

    if (data.id === this.currentDataEdit.id) {
      for (const key in this.currentDataEdit) {
        this.formElement.querySelector(`[name="${key}"]`).value = this.currentDataEdit[key]
      }
    } else {
      for (const key in data) {
        this.formElement.querySelector(`[name="${key}"]`).value = data[key]
      }
    }
  }

  handleClickButtonCreatePost () {
    resetForm(this.formElement)
    this.instanceModal.show()
    this.formElement.setAttribute('data-method', 'POST')
  }
}

export { Form }
