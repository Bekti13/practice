const validation = () => {
  const calcBlock = document.querySelector('.calc-block')
  const message = document.getElementById('form2-message');
  const formEmail = document.querySelectorAll('[type="email"]');
  const formPhone = document.querySelectorAll('[type="tel"]');
  const formName = document.querySelectorAll('[placeholder="Ваше имя"]')

  formName.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^а-я\s\-]/gi, "");
    })
     
  })
  
    calcBlock.addEventListener('input', (event) => {
      if (event.target.closest('input')) {
        event.target.value = event.target.value.replace(/\D/, '');
      }
    });

    message.addEventListener('input', () => {
      message.value = message.value.replace(/[^[а-яА-Я 0-9.,:;?!()«»""\-]*/g, '');
    });

    formEmail.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^a-z@\-_.!~*']/gi, '');
      });
    });

    formPhone.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^+\d\-()]/g, '');
      });

    });
}

export default validation;