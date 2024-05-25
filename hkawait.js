const puppeteer= require('puppeteer');
const mail= "dajij94193@musezoo.com";
const pass="Ashish@123$";
const code = require('./code');

(async function(){
    let browser=await puppeteer.launch({headless:false,defaultViewport: null,args: ['--start-fullscreen']});
    let page=await browser.newPage();
    await page.goto('https://www.hackerrank.com/');
    await waitAndclick("ul.menu a",page);
    await page.waitForSelector(".fl-button-wrap.fl-button-width-auto.fl-button-left  a");
    await page.evaluate(function(){
        let buttons=document.querySelectorAll(".fl-button-wrap.fl-button-width-auto.fl-button-left  a");
        buttons[0].click();
        return;
    });
    await page.waitForSelector("#input-1");
    await page.type('#input-1',mail,{delay:100});
    await page.type('#input-2',pass,{delay:100});
    await page.click('button[data-analytics="LoginPassword"]',{delay:100});
    await waitAndclick(".topic-name",page);
    await page.waitForSelector(".filter-group");

    await page.evaluate(function(){ 
        let allDiv=document.querySelectorAll(".filter-group");
        let Div=allDiv[3];
        let clickSelector=Div.querySelector(".ui-checklist-list-item input",{delay:100});
        clickSelector.click();
        return;
    });
    await page.waitForSelector(".challenges-list .js-track-click.challenge-list-item");
     let questionArr=await page.evaluate(function(){
        let arr=[];
        let aTags=document.querySelectorAll(".challenges-list .js-track-click.challenge-list-item");
        for(let i=0;i<aTags.length; i++)
        {
            let link=aTags[i].href;
            arr.push(link);
        }
        return arr;
    })

    for(let i=0;i<questionArr.length;i++)
    {
        await questionSolver(questionArr[i],code.answers[i],page);
    }

})();

async function waitAndclick(selector,page){
    await page.waitForSelector(selector);
    await page.click(selector);
}

async function questionSolver(question,answer,page)
{
    await page.goto(question);
    await waitAndclick('.checkBoxWrapper input',page);
    await  waitAndclick('.ui-tooltip-wrapper textarea',page);
    await page.type('.ui-tooltip-wrapper textarea',answer);
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await  page.keyboard.press('X');
    await  page.keyboard.up('Control');
    await waitAndclick('.monaco-editor.no-user-select.vs',page);
    await  page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    await waitAndclick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',page);

}