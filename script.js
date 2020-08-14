function img_size(width,height){
    let css = 'img { width: '+width+'px; height: '+height+'px;}',
        head = document.head || document.getElementsByTagName('head')[0],
        s = document.createElement('style');

    s.type = 'text/css';
    
    if (s.styleSheet){
        s.styleSheet.cssText = css;
    } else {
        s.appendChild(document.createTextNode(css));
    }
    
    head.appendChild(s);
}

document.getElementById('textarea').value=`https://unsplash.com/sitemaps/photos/promoted.xml
https://unsplash.com/sitemaps/photos/promoted1.xml
https://unsplash.com/sitemaps/photos/promoted2.xml
https://unsplash.com/sitemaps/photos/promoted3.xml`

document.getElementById("cheker").checked = false;

let errorlink=0

let count=0

let addrnew=[]

function fun1() {
var chbox;
chbox=document.getElementById('cheker');
	if (chbox.checked) {
		document.getElementById('textarea').style.display='block';
	}
	else {
		document.getElementById('textarea').style.display='none';
	}
}
function isValid(string,regID) {
  let res = string.match(regID);
  return (res !== null)
};

function rez_func2(stringArray,breakp){
let address
	if(isValid(stringArray,/(http(s)?:)/g)){
          address=stringArray
	   }else{
	address='http://'+stringArray
	   }
	if(isValid(address,/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
		let url = new URL(address)
		let host = url.hostname
		let url1 = new URL(address)
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		url = url1
		const xml = new window.XMLHttpRequest()
		xml.open("GET", url, true)
		xml.send();
		xml.onreadystatechange = function() {
		// (3)
		  if (xml.readyState != 4) return;
		  if (xml.status == 200) {
			  count++
			let parser = new DOMParser()
			let xml1 = parser.parseFromString(xml.response, 'application/xml')

			let urls = Array.from(xml1.querySelectorAll('loc')).map(x => x.textContent)
			if(urls!=null){
				for (var i=0; i<urls.length; i++) {
				  let element = urls[i]
				  if(!isValid(element,/\.xml/g)){
					  if(isValid(element,/(?:\.|=)(?:jpg|jpeg|png|bmp|ico|gif|tif|tiff)/g)){
						addrnew.push(element)
					  }
				  }else{
					  errorlink++
				  }
				}
				
			
			}
					if(count==breakp){
						count=0
						document.getElementById("neww").innerHTML="Скачать БД"
						document.getElementById("neww").style.background = "#2b995b";
					}

			}

		}
		document.getElementById("neww").innerHTML="Ждите.."
		document.getElementById("neww").style.background = "red";
	}
}

function rez_func(){
 addrnew=[]
let stringArray = document.getElementById('textarea').value.split('\n')
let address
let k=0
count=0
errorlink=0
for(k;k<stringArray.length; k++){
	if(isValid(stringArray[k],/(http(s)?:)/g)){
          address=stringArray[k]
	   }else{
	address='http://'+stringArray[k]
	   }
	if(isValid(address,/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
		let url = new URL(address)
		let host = url.hostname
		let url1 = new URL(address)
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		if(url.pathname=="/"){
			 url = url1 +'sitemap.xml'
		}else{
			url = url1
		}
		const xml = new window.XMLHttpRequest()
		xml.open("GET", url, true)
		xml.send();
		xml.onreadystatechange = function() { // (3)
		  if (xml.readyState != 4) return;
			document.getElementById("neww").innerHTML="Скачать БД"
			document.getElementById("neww").style.background = "#2b995b";
		  if (xml.status == 200) {
			addrnew.push('http://'+host)
			let parser = new DOMParser()
			let xml1 = parser.parseFromString(xml.response, 'application/xml')

			let urls = Array.from(xml1.querySelectorAll('loc')).map(x => x.textContent)
			if(urls!=null){
				for (var i=0; i<urls.length; i++) {
				  let element = urls[i]
						if(isValid(element,/\.xml/g)){
							  rez_func2(element,urls.length)
							 	
						}else if(isValid(element,/(?:\.|=)(?:jpg|jpeg|png|bmp|ico|gif|tif|tiff)/g)){
							addrnew.push(element)
						}
				}
			}
			}

		}
		document.getElementById("neww").innerHTML="Ждите.."
		document.getElementById("neww").style.background = "red";

	}


}	
}

let countIMG
let consta

function rez_imgout(){
	document.getElementById("imgout").innerHTML="Ждите.."
		document.getElementById("imgout").style.background = "red";
		alert('Колличество не проиндексированных: '+errorlink)
	countIMG=parseInt(document.getElementById("mySelectOUT").value,10)
	consta=countIMG+1
	if (countIMG>10){
		img_size(10000/countIMG,10000/countIMG)
	}else {
		img_size(500,500)
	}
	document.getElementById("finded").style.display='block';
	document.getElementById("mySelectId").style.display='block';
	document.getElementById("finded").innerHTML="Найдено изображений: "+(addrnew.length).toLocaleString()
	let kolich=Math.ceil(addrnew.length/countIMG)
	let objSel = document.getElementById("mySelectId");
	for(let z=0; z<kolich; z++){
		objSel.options[z] = new Option(z+1, z);
	}
	let visio=[]
		document.getElementById("work_area").style.display='block';
		if(addrnew.length==0){
			visio.push('Нет ссылок на файлы изображений!')
		}else{
			for(let i=0; i<consta; i++){
			     visio.push('<a href="'+addrnew[i]+'" target="_blank"><img src="'+addrnew[i]+'"></a>')
			
			}
		}
		document.getElementById("work_area").innerHTML=visio.join('')
	document.getElementById("imgout").innerHTML="Показать изображения из БД"
	document.getElementById("imgout").style.background = "#2b995b";
}

var select = document.getElementById('mySelectId');

select.addEventListener('change', function(){  
  let val = parseInt(this.value,10);
	 let visio=[]
	 let start=consta*val
	 let end=consta*(val+1)
	 if(start!=0){
		end--
	 }
	for(let i=start; i<end; i++){
			if(isValid(addrnew[i],/(?:\.|=)(?:jpg|jpeg|png|bmp|ico|gif|tif|tiff)/g)){
				visio.push('<a href="'+addrnew[i]+'" target="_blank"><img src="'+addrnew[i]+'"></a>')
			}
	}
	document.getElementById("work_area").innerHTML=visio.join('')
});


function rez_randall(){
let randval = Math.floor(Math.random() * addrnew.length)	
	if(addrnew.length==0){
		alert('Нет доступных ссылок')
	}else{
		document.getElementById("rnd_area").style.display='inline-block';
		document.getElementById("rnd_area").innerHTML ='<a target="_blank" href="' + addrnew[randval] + '" ><h1> Случайная картинка! </h1></a>';
	}

}
