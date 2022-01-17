const sendForm = ( {formId, someElem = [] } ) => {
    const form = document.getElementById(formId)    // 3 формы для отправки данных
    const statusBlock = document.createElement('div')
    const loadText = 'Загрузка...'
    const errorText = 'Ошибка...'
    const successText = 'Спасибо! Наш менеджер с вами свяжется!'

    let regTel = /[^0-9\(\)\-]/g;
    let regName = /[^А-Яа-я\s]/g;
    let regMes = /[^0-9а-я\s\.\,\!\?]/gi;

    const validate = (list) => {

        let success = true

        list.forEach(input => {
            if(input.value === '') {
                success = false;
            }
            switch(true) {
                case (input.name === "user_phone"): 
                    if (regTel.test(input.value)) {
                        success = false;
                    }
                break;
                case(input.name === "user_name"):
                    if (regName.test(input.value)) {
                        success = false;
                    }
                break;
                case(input.name === "user_message"): 
                    if (regMes.test(input.value)) {
                        success = false;
                    }
                break;
            }
            
        })  
        return success;
    }
    
    const sendData = (data) => {
        return fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }

    const submitForm = () => {
        const formElements = form.querySelectorAll('input')
        const formData = new FormData(form)
        const formBody = {}

        statusBlock.textContent = loadText
        form.append(statusBlock)

        formData.forEach((val, key) => {

            formBody[key] = val
        })

        someElem.forEach(elem => {
            const element = document.getElementById(elem.id)

            if (elem.type === 'block') {
                formBody[elem.id] = element.textContent
            } else if (elem.type === 'input') {
                formBody[elem.id] = element.value
            }
        })

        

        if (validate(formElements)) {
            sendData(formBody)
                .then(data => {
                    statusBlock.textContent = successText
                    statusBlock.style.color = "red"

                    formElements.forEach(input => {
                        input.value = ''
                        
                    })
                })
                .catch(error => {
                    statusBlock.textContent = errorText
                })
        } else {
            alert('Данные не валидны, заполните все поля формы!')
            formElements.forEach(input => {
                //input.value = ''
                statusBlock.textContent = ''
                
            })  
        }
    }

    try {
        if(!form) {
            throw new Error('ошибка')
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            submitForm()
        })


    } catch(error) {
        console.log(error.message);
    }
}

export default sendForm