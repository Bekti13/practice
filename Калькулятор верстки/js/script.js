'use strict';

const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const dropdown = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const inputTypeRange = document.querySelector('.rollback input[type=range]');
const span = document.querySelector('.rollback span.range-value');
const totalInput = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const totalFullCount = document.getElementsByClassName('total-input')[3];   
const totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    rollback: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    checkValue: function() {
        let isError = false;
         screens = document.querySelectorAll('.screen');
         screens.forEach(screen => {
             const select = screen.querySelector('select');
             const input = screen.querySelector('input[type=text]');

             if(select.value === '' || input.value === '') {
                isError = true;
             }
         });

         if (!isError) {
             appData.start();
         } else {
             alert('Заполни поля');
         }
     },
    init: function() {
        this.addTitle();
               
        startBtn.addEventListener('click', this.checkValue);
        dropdown.addEventListener('click', this.addScreenBlock);
        inputTypeRange.addEventListener('input', this.changeRange);
    },
    addTitle: function() {
        document.title = title.textContent;
    },
    showResult: function() {
        totalInput.value = this.screenPrice;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        totalFullCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
        totalCount.value = this.screens.reduce((a,b) => a+b.count,0);
    },
    addScreens: function() {
        screens = document.querySelectorAll('.screen');
        screens.forEach(function(screens, index) {
            const select = screens.querySelector('select');
            const input = screens.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({ 
                id: index, 
                name: selectName, 
                price: +select.value * +input.value,
                count: +input.value
            });      
        });
       

        
    },
    addServices: function() {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
            
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
            
        });
        
    },
    addScreenBlock: function() {
        const cloneScreen =screens[0].cloneNode(true);
        cloneScreen.querySelector('input').value = '';
        cloneScreen.querySelector('select').value = '';       

        screens[screens.length -1].after(cloneScreen);
    },
    changeRange: function () {
        span.textContent = inputTypeRange.value + "%";
        appData.rollback = inputTypeRange.value;
        
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
        
        if (startBtn.textContent === 'Рассчитать') {
            this.disable();
            startBtn.textContent = 'Сбросить';
        } else {
            startBtn.textContent = 'Рассчитать';
            this.reset();
            this.disable(false);
        }

        
    },

    disable: (disabled = true) => {
         document.querySelectorAll('.screen input[type=text]').forEach(item => {
            item.disabled = disabled;
        });
        document.querySelectorAll('select').forEach(item => {
            item.disabled = disabled;
        });
    },

    reset: function() {
        for (let i = screens.length - 1; i > 0; i--) {
            screens[0].parentNode.removeChild(screens[i]);
        }

        
        document.querySelectorAll('.screen input[type=text]').forEach(item => {
            item.value = '';
        });
        document.querySelectorAll('select').forEach(item => {
            item.value = '';
        });
        document.querySelectorAll('input[type=range]').forEach(item => {
            item.value = [0];
        })

        span.textContent = '0%';
        

        this.screens = [];
    this.screenPrice = 0;
    this.screenCount = 0;
    this.adaptive = true;
    this.rollback = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};

    totalCount.value = 0;
    totalCount.value = 0;
    totalCountOther.value = 0;
    totalFullCount.value = 0;
    totalCountRollback.value = 0;

    },

    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

         for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]; 
        } 
         for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] /100); 
        } 

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent; 
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback/100));
        
    },
   

    

};

appData.init();


 




    





















