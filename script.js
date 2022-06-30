let modalQt = 1;
let cart = [];
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

pizzaJson.map((item,index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);//mapeia os itens e clona a div

    pizzaItem.setAttribute('data-key',index);//atribui a propriedade atraves do indice
    pizzaItem.querySelector('.pizza-item--img img').src = item.img; 
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault(); //anula a funçao padrao do click
        
        modalQt = 1;
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalKey = key;

        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{ //forEach preenche todos os itens que contem na classe
            if(sizeIndex ==2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })

        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.display = 'flex'; //abre o modal
        c('.pizzaWindowArea').style.opacity = '0';
        setTimeout(()=>{ //cria delay na animaçao de abrir o modal
            c('.pizzaWindowArea').style.opacity = '1';
        },200);

    })

    c('.pizza-area').append(pizzaItem);
});

function cancelar(){
    c('.pizzaWindowArea').style.opacity = '0';
    setTimeout(()=>{c('.pizzaWindowArea').style.display = 'none'},500);
}

c('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }   
})

c('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
})

cs('.pizzaInfo--size').forEach((size,sizeIndex)=>{ 
    size.addEventListener('click', ()=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    })
})

c('.pizzaInfo--addButton').addEventListener('click', ()=>{ //localiza a div e cria a funçao de click
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identif = pizzaJson[modalKey].id+'.'+size;

    let verific = cart.findIndex((item)=>item.identif == identif);

    if(verific > -1) {
        cart[verific].qt += modalQt;
    } else {
        cart.push({
            identif,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        });
    }

    cancelar();
    
});    