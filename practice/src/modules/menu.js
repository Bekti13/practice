const menu = () => {
    const menuBtn = document.querySelector('.menu')
    const menu = document.querySelector('menu')
    

    const handleMenu = () => {
        menu.classList.toggle('active-menu')
    }

    menuBtn.addEventListener('click', handleMenu)
    menu.addEventListener('click', (e) => {
        let target = e.target;
        
        if (target.classList.contains('close-btn')) {
        handleMenu();
        } else {
        target = target.matches('[href^="#"]');
        if (target) {
          handleMenu();
        }
      }
    })

}

export default menu