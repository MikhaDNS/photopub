document.getElementById('textarea').value=`https://unsplash.com/sitemaps/photos/promoted.xml
https://unsplash.com/sitemaps/photos/promoted1.xml
https://unsplash.com/sitemaps/photos/promoted2.xml
https://unsplash.com/sitemaps/photos/promoted3.xml`
document.getElementById("cheker").checked = false
let errorlink=0
let count=0
let addrnew=[]

function img_size(width,height){
	let css = 'img { width: '+width+'px; height: '+height+'px;}',
    head = document.head || document.getElementsByTagName('head')[0],
    s = document.createElement('style')
    s.type = 'text/css'
    if (s.styleSheet){
		s.styleSheet.cssText = css
    } else {
		s.appendChild(document.createTextNode(css))
    }
    head.appendChild(s)
}

function fun1() {
	let chbox;
	chbox=document.getElementById('cheker')
	if (chbox.checked) {
		document.getElementById('textarea').style.display='block'
	} else {
		document.getElementById('textarea').style.display='none'
	}
}

function isValid(string,regID) {
	let res = string.match(regID)
	return (res !== null)
}

function rez_func2(stringArray,breakp) {
	let address
	if(isValid(stringArray,/(http(s)?:)/g)) {
		address=stringArray
	} else {
		address='http://'+stringArray
	}
	if(isValid(address,/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
		let url = new URL(address)
		let host = url.hostname
		let url1 = new URL(address)
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		url = url1
		const xml = new window.XMLHttpRequest()
		xml.open("GET", url, true)
		xml.send();
		xml.onreadystatechange = function() {
			if (xml.readyState != 4) return;
			if (xml.status == 200) {
				count++
				let parser = new DOMParser()
				let xml1 = parser.parseFromString(xml.response, 'application/xml')
				let urls = Array.from(xml1.querySelectorAll('loc')).map(x => x.textContent)
				if (urls!=null) {
					for (var i=0; i<urls.length; i++) {
						let element = urls[i]
						if (!isValid(element,/\.xml/g)) {
							if(isValid(element,/(?:\.|=)(?:jpg|jpeg|png|bmp|ico|gif|tif|tiff)/g)){
								addrnew.push(element)
							}
						} else {
							errorlink++
						}
					}
					
				
				}
				if(count==breakp){
					count=0
					document.getElementById("neww").innerHTML="Скачать БД"
					document.getElementById("neww").style.background = "#2b995b"
				}

			}

		}
		document.getElementById("neww").innerHTML="Ждите.."
		document.getElementById("neww").style.background = "red"
	}
}

function rez_func() {
	addrnew=[]
	let stringArray = document.getElementById('textarea').value.split('\n')
	let address
	let k=0
	count=0
	errorlink=0
	for(k;k<stringArray.length; k++){
		if (isValid(stringArray[k],/(http(s)?:)/g)) {
			address=stringArray[k]
		} else {
			address='http://'+stringArray[k]
		}
		if (isValid(address,/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
			if (isValid(address,/(?:\.|=)(?:jpg|jpeg|png|bmp|ico|gif|tif|tiff)/g)) {
				addrnew.push(address)
			} else {
				let url = new URL(address)
				let host = url.hostname
				let url1 = new URL(address)
				url1 = 'https://cors-anywhere.herokuapp.com/' + url
				if (url.pathname=="/") {
					url = url1 +'sitemap.xml'
				} else {
					url = url1
				}
				const xml = new window.XMLHttpRequest()
				xml.open("GET", url, true)
				xml.send();
				xml.onreadystatechange = function() {
					if (xml.readyState != 4) return;
					document.getElementById("neww").innerHTML="Скачать БД"
					document.getElementById("neww").style.background = "#2b995b"
					if (xml.status == 200) {
						let parser = new DOMParser()
						let xml1 = parser.parseFromString(xml.response, 'application/xml')
						let urls = Array.from(xml1.querySelectorAll('loc')).map(x => x.textContent)
						if (urls!=null) {
							for (var i=0; i<urls.length; i++) {
								let element = urls[i]
								if (isValid(element,/\.xml/g)) {
									rez_func2(element,urls.length)	
								} else if (isValid(element,/(?:\.|=)(?:jpg|jpeg|png|bmp|ico|gif|tif|tiff)/g)) {
									addrnew.push(element)
								}
							}
						}
					}

				}
				document.getElementById("neww").innerHTML="Ждите.."
				document.getElementById("neww").style.background = "red"
			}
		}
	}	
}

let countIMG
let consta
let kolich

function rez_imgout() {
	document.getElementById('inp').value='1';
	document.getElementById("imgout").innerHTML="Ждите.."
	document.getElementById("imgout").style.background = "red"
	alert('Колличество не проиндексированных: '+errorlink)
	countIMG=parseInt(document.getElementById("mySelectOUT").value,10)
	consta=Math.min(countIMG,addrnew.length)
	if (countIMG>10) {
		img_size(10000/countIMG,10000/countIMG)
	}else {
		img_size(500,500)
	}
	kolich=Math.ceil(addrnew.length/countIMG)
	document.getElementById("max_str").innerHTML="Всего страниц: "+kolich.toLocaleString()
	document.getElementById("tek_str").innerHTML="Текущая страница: 1 "
	document.getElementById("vis").style.display='block'
	document.getElementById("finded").style.display='block'
	document.getElementById("finded").innerHTML="Найдено изображений: "+(addrnew.length).toLocaleString()
	
	if (kolich!=1) {
		document.getElementById("ba").style.display='none'
		document.getElementById("fr").style.display='inline-block'
		document.getElementById("play").style.display='inline-block'
	} else {
		document.getElementById("ba").style.display='none'
		document.getElementById("fr").style.display='none'
		document.getElementById("play").style.display='none'
		document.getElementById("inp").style.display='none'
	}
	let visio=[]
	document.getElementById("work_area").style.display='block';
	if (addrnew.length==0) {
		visio.push('Нет ссылок на файлы изображений!')
	}else{
		for (let i=0; i<consta; i++) {
			visio.push('<a href="'+addrnew[i]+'" target="_blank"><img src="'+addrnew[i]+'"></a>')
		}
	}
	document.getElementById("work_area").innerHTML=visio.join('')
	document.getElementById("imgout").innerHTML="Показать изображения из БД"
	document.getElementById("imgout").style.background = "#2b995b"
}

function change_img(val) {
	let visio=[]
	let start=consta*val
	let end=consta*(val+1)
	end= Math.min(end, addrnew.length)
	for (let i=start; i<end; i++) {
		visio.push('<a href="'+addrnew[i]+'" target="_blank"><img src="'+addrnew[i]+'"></a>')
	}
	document.getElementById("work_area").innerHTML=visio.join('')
}

function visable_button(val) {
	document.getElementById("tek_str").innerHTML="Текущая страница: "+val.toLocaleString()
	if (val==kolich) {
		document.getElementById("ba").style.display='inline-block'
		document.getElementById("fr").style.display='none'
		document.getElementById("play").style.display='none'
	} else if (val==1) {
		document.getElementById("ba").style.display='none'
		document.getElementById("fr").style.display='inline-block'
		document.getElementById("play").style.display='inline-block'
	} else {
		document.getElementById("ba").style.display='inline-block'
		document.getElementById("fr").style.display='inline-block'
		document.getElementById("play").style.display='inline-block'
	}
}


document.querySelector('#ba').addEventListener('click', function() {
	let select=document.querySelector('#inp')
	let tek=parseInt(select.value,10)
	let value=chek(tek)
	if (value==-1) {
		alert('Введите корректное число страниц')
	}else{
		value--
		visable_button(value)
		change_img(value-1)
		select.value = value
	}
});

function btfr() {
	let select=document.querySelector('#inp')
	let tek=parseInt(select.value,10)
	let value=chek(tek)
	if (value==-1) {
		alert('Введите корректное число страниц')
	}else{
		value++
		visable_button(value)
		change_img(value-1)
		select.value = value
	}
}

document.querySelector('#fr').addEventListener('click', function() {
	btfr()
});

let intervalId = 0

document.querySelector('#play').addEventListener('click', function() {
	function stop_timer() {
		document.querySelector('#play').innerHTML="СТАРТ &#9658;"
		clearInterval(intervalId)
		intervalId = 0
	}
	if (intervalId > 0) {
		stop_timer()
	} else {
		intervalId = setInterval(() => {
					 if (parseInt(document.querySelector('#inp').value,10)==kolich) {
						stop_timer()
					 } else {
						btfr()
					 }
					}, 5000);
		this.innerHTML="СТОП &#9200;"
	}
});

function chek(value) {
	let otv=-1
	if (Number.isInteger(value) && value<=kolich && value>=1) {
		otv=value
	}
	return otv
}

(function() {
	document.getElementById("inp").addEventListener('keydown', function(e) {
		if (e.keyCode === 13) {
			let value=chek(parseInt(this.value,10))
			if (value==-1) {
				alert('Введите корректное число страниц')
			}else{
				visable_button(value)
				change_img(value-1)
			}
		}
	});
})();

function rez_randall() {
	let randval = Math.floor(Math.random() * addrnew.length)	
	if (addrnew.length==0) {
		alert('Нет доступных ссылок')
	} else {
		document.getElementById("rnd_area").style.display='inline-block'
		document.getElementById("rnd_area").innerHTML ='<a target="_blank" href="' + addrnew[randval] + '" ><h1> Случайная картинка! </h1></a>'
	}
}
