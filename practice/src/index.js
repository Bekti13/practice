import timer from './modules/timer';
import menu from './modules/menu';
import modal from './modules/modal';
import tabs from './modules/tabs';
import calculator from './modules/calculator';
import validation from './modules/validation';
import slider from './modules/slider';
import sendForm from './modules/sendForm';

timer('12 januar 2022');
menu();
modal();
tabs();
calculator(100);
validation();
slider();
sendForm({
     formId: 'form1', 
     someElem: [
         {
             type: 'block',
             id: 'total'
         }
     ]
    });
sendForm({
    formId: "form2"
})
sendForm({
    formId: "form3"
})
