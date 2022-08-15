// select items
let overlay = document.querySelector('.over_lay'),
    btn1 = document.querySelector('.click')
    header = document.querySelector('.header')
    qcount = document.querySelector('.header .count'),
    bullets = document.querySelector('.bullets'),
    qestion = document.querySelector('.qestion'),
    answer_area = document.querySelector('.answer_area'),
    btn = document.querySelector('.btn'),
    timer = document.querySelector('.timer'),
    resault = document.querySelector('.resault')
let currentindex = 0,
    right = 0,
    stop;
function GetRepo() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function() {
        if(this.readyState===4 && this.status===200) {
            let myobject = JSON.parse(this.responseText),
                count = myobject.length
                btn1.onclick = () => {
                    overlay.classList.add('remove')
                    counter(40,count)
                }
                
            bulidBullets(count);
            addData(myobject[currentindex],count);
            btn.addEventListener('click',() => {
                let ranswer = myobject[currentindex].right_answer;
                // check right answer
                check(ranswer)
                currentindex ++;
                qestion.innerHTML ='';
                answer_area.innerHTML = '';
                addData(myobject[currentindex],count);
                // add active
                add()
                clearInterval(stop)
                counter(40,count)
                resaultcontent(count)
            })
        }
    }

    myRequest.open('GET','../data.json',true);
    myRequest.send()
}
GetRepo()
let bulidBullets = count =>{
    qcount.textContent = count;
    for (let i=0 ; i < count; i++) {
        let bullet = document.createElement('span')
        i=== 0 ? bullet.classList.add('active'): ''
        bullets.appendChild(bullet)
    }
} 
let addData = (obj,count)=> {
    if(currentindex < count) {
        let h2 = document.createElement('h2')
        h2.appendChild(document.createTextNode(obj.title))
        qestion.appendChild(h2)
        for (let i = 0; i < obj.answer.length; i++) {
            let mainDiv = document.createElement('div');
                mainDiv.className = 'answer'
            let input = document.createElement('input')
                input.type = 'radio';
                input.name = 'answer';
                input.id = `answer_${i}`
                input.value = obj.answer[i];
                mainDiv.appendChild(input)
                if(i===0) {
                    input.checked = true
                }
            let label = document.createElement('label')
                label.htmlFor = `answer_${i}`
                label.appendChild(document.createTextNode(obj.answer[i]));
                mainDiv.appendChild(label)
                answer_area.appendChild(mainDiv)
        }
    }
}
let check = (ranswer)=>{
    let Allanswer = Array.from(document.querySelectorAll('.answer_area .answer input')),
        choosenAns;
    Allanswer.forEach(el => {
        if(el.checked) {
            choosenAns= el.value;
        }
    })
    if(choosenAns === ranswer) {
        right +=1;
    }
}
let add = ()=> {
    let boxs = Array.from(document.querySelectorAll('.bullets span'))
    boxs.forEach((box,index) => {
        (currentindex === index) ? box.classList.add('active'): box.classList.remove('active')
    })
}
let resaultcontent = (count)=> {
    if (currentindex >= count ) {
        resault.innerHTML = `You Answer ${right} From ${count}`;
        resault.style.display = 'block';
        qestion.remove()
        answer_area.remove()
        bullets.remove()
        btn.remove()
        timer.remove()
        header.remove()
        if(right === count) {
            resault.innerHTML = `<span class = 'Good'>congratulations</span> You Answer ${right} From ${count}`
        }
    }
}


let counter = (duration,count) => {
    if(currentindex < count) {
        stop = setInterval(()=> {
            let mins = parseInt(duration /60),
                sec = parseInt(duration % 60);
                mins = (mins < 10) ? `0${mins}`: mins;
                sec = (sec < 10) ? `0${sec}`: sec
            duration--;
            if(duration < 0) {
                clearInterval(stop);
                btn.click()
            }
            (duration <= 10) ? timer.style.color ='red':timer.style.color = '#222'
            timer.innerHTML = `${mins} : ${sec} `
        },1000)
    }
}







