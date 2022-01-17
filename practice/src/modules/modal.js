import { animate } from './helpers'

const modal = () => {
    const modal = document.querySelector('.popup')
    const buttons = document.querySelectorAll('.popup-btn')
    const closeBtn = modal.querySelector('.popup-close')
    const popupContent = document.querySelector('.popup-content')
    
    

    buttons.forEach(elem => {
        elem.addEventListener('click', () => {
            modal.style.display = 'block';
            if (screen.width > 768) {
				animate({
                    duration: 500,
                timing(timeFraction) {
                    return timeFraction;
                },
                draw(progress) {
                    popupContent.style.top = (15 * progress) + "%"
                },
                });
			}
        })
    })

    modal.addEventListener('click', (e) => {
        if (!e.target.closest('.popup-content') || e.target.classList.contains('popup-close')) {
            modal.style.display = 'none';
         }
    })

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none'
    })

}

export default modal