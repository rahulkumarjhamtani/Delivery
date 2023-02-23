var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close")[1];


var cancel = document.getElementById("cancel");

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
span2.onclick = function () {
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal || event.target == modal2) {
        modal.style.display = "none";
        modal2.style.display = "none";
    }
}

var agentData = [];
var deliveryData = [];

function agent()
{
    modal.style.display = 'block';
}


function addAgent()
{
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    agentData.push({name:name,phone:phone,email:email});

    console.log(agentData);

    var select = document.getElementById("aname");
    var length = select.options.length;
    for (i = length-1; i >= 0; i--) {
        select.options[i] = null;
    }


    var aname = document.getElementById('aname');

    agentData.forEach(option =>
        aname.add( new Option(option.name, option.name))
    );

    modal.style.display = 'None';

}

function delivery()
{
    modal2.style.display = 'block';
}



var temp=1;
function getDelivery()
{
    var time;
    var remtime;
    var status='';
    var pname = document.getElementById('pname').value;
    var aname = document.getElementById('aname').value;
    var distance = document.getElementById('distance').value;
    time = document.getElementById('time').value;

    let i = temp;
    temp++;
    status = 'Dispatched';

    remtime = Math.round((distance / 5)*60);

    console.log(remtime);

    
    console.log(time);

    

    deliveryData.push({pname:pname,aname:aname,distance:distance,time:time,status:status,remtime:remtime});

    console.log(deliveryData);

    var mytable = document.getElementById('mytable');

    var tr = document.createElement('tr');
    //tr.setAttribute('id','row'+i);
    tr.id = 'row' + i;
    

    var tdpname = document.createElement('td');
    tdpname.setAttribute('name','product');
    tdpname.appendChild(document.createTextNode(pname));
    tr.appendChild(tdpname);

    var tdaname = document.createElement('td');
    tdaname.setAttribute('name','agent');
    tdaname.appendChild(document.createTextNode(aname));
    tr.appendChild(tdaname);

    var tdstatus = document.createElement('td');
    tdstatus.setAttribute('name','status');
    tdstatus.appendChild(document.createTextNode(status));
    tr.appendChild(tdstatus);

    var tdrtime = document.createElement('td');
    tdrtime.setAttribute('name','timee');
    tdrtime.appendChild(document.createTextNode(remtime));
    tr.appendChild(tdrtime);

    mytable.appendChild(tr);

    var card = document.createElement('div');
    card.setAttribute('id','card'+i);
    card.setAttribute('class','card');
    document.getElementById('setcard').appendChild(card);

    var cardcontainer = document.createElement('div');
    cardcontainer.setAttribute('id','container'+i);
    cardcontainer.setAttribute('class','cardcontainer');
    document.getElementById('card'+i).appendChild(cardcontainer);

    var product = document.createElement('h5');
    product.setAttribute('name','product');
    product.appendChild(document.createTextNode('Product: '+pname));
    document.getElementById('container'+i).appendChild(product);

    var statuss = document.createElement('h5');
    statuss.setAttribute('name','status');
    statuss.appendChild(document.createTextNode('Dispatched'));
    document.getElementById('container'+i).appendChild(statuss);

    var agent = document.createElement('h5');
    agent.setAttribute('name','agent');
    agent.appendChild(document.createTextNode('Agent: '+aname));
    document.getElementById('container'+i).appendChild(agent);

    var timee = document.createElement('h5');
    timee.setAttribute('name','timee');
    timee.appendChild(document.createTextNode('Time: '+remtime));
    document.getElementById('container'+i).appendChild(timee);

    var progress = document.createElement('progress');
    progress.setAttribute('value','0');
    progress.setAttribute('max','100');
    progress.setAttribute('name','progress');
    progress.appendChild(document.createTextNode('0%'));
    document.getElementById('container'+i).appendChild(progress);


    
    var cal = 100/(remtime * 60);

    var x = setInterval(() => {
        var today = new Date();
        var min,minute;
        
        if (today.getMinutes() < 10) 
        {
            min = '0'+today.getMinutes();
        } 
        else 
        {
            min = today.getMinutes();
        }
        if ((parseInt(time.split(':')[1]) + parseInt(remtime)) < 10) 
        {
            minute = '0'+(parseInt(time.split(':')[1]) + parseInt(remtime));
        } 
        else 
        {
            minute = (parseInt(time.split(':')[1]) + parseInt(remtime));
        }
        var now = today.getHours() + ":" + min;
        console.log(now);
        console.log(time.split(':')[0] +':'+ minute);

        if(now >= time)
        {
            status = 'On the way';
            document.getElementById('row'+i).childNodes.forEach(node=>{
                if(node.getAttribute('name') == 'status')
                {
                    node.innerText = status;
                }
            });
            document.getElementById('container'+i).childNodes.forEach(node=>{
                if(node.getAttribute('name') == 'status')
                {
                    node.innerText = status;
                }

                if(node.getAttribute('name') == 'progress')
                {
                    if(node.value<100)
                    {
                        node.value += cal;
                        node.innerText = node.value+'%';
                    }
                }
                
            });  
            

        }
        if(now == (time.split(':')[0] +':'+ minute))
        {
            status = 'Delivered';
            document.getElementById('row'+i).childNodes.forEach(node=>{
                if(node.getAttribute('name') == 'status')
                {
                    node.innerText = status;
                }
            });
            document.getElementById('container'+i).childNodes.forEach(node=>{
                if(node.getAttribute('name') == 'status')
                {
                    node.innerText = status;
                }
            }); 
            clearInterval(x);
        }
    }, 1000);

    modal2.style.display = 'None';
}

function showtable()
{
    document.getElementById('table').style.display = 'block';
    document.getElementById('setcard').style.display = 'none';
}

function showcard()
{
    document.getElementById('table').style.display = 'none';
    document.getElementById('setcard').style.display = 'block';
}
