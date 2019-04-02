//1.1 создали массив адресов фотографий, который гененирует адреса фото
var url=[];
for (var i=1; i<=25; i++) {
 url[i-1] = "photos/" + i +"."+"jpg";

}

//2.1 Функция, которая возвращает количество лайков, поставленных фотографии.
function getRandomLikes(min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//3.1 список комментариев, оставленных другими пользователями к этой фотографии. Комментарий должен генерироваться случайным образом.

var comments = ["Всё отлично!" ,"В целом всё неплохо. Но не всё.","Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.","Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.","Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.","Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];//массив комментариев

// функция, гененрирующая случайные комменты из массива коментс
function generationcomments(comment) {
var randcomments = Math.floor(Math.random() * comments.length);
return (comments[randcomments]);
}


//4.1 массив с описанием фото
var description = ["Тестим новую камеру!","Затусили с друзьями на море","Как же круто тут кормят","Отдыхаем...",
"Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......","Вот это тачка!"
];
// функция, генерирующая случайное описание из массива дескрипшп
function generationdescription(descript) {
var randDescription = Math.floor(Math.random() * description.length);
return (description[randDescription]);
}


//5.1 Генерируем массив объектов с фотками
var photos = [];


function generatePhotos (next) {

  for (var j = 0; j < 25; j++) {
    next[j] = {  urls: url [j],
                 likess: getRandomLikes(15,200),
                 commments: generationcomments(comments),
                 descriptions:generationdescription(description)
      }

    };
 return next;
};
generatePhotos(photos);


//1.2  На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива:
//Адрес изображения url подставьте как src изображения.
//Количество лайков likes подставьте как текстовое содержание элемента .picture__stat--likes.
//Количество комментариев comments подставьте как текстовое содержание элемента .picture__stat--comments.


var similarListPhoto = document.querySelector(".pictures");//находим section (контейнер для сгенерированных фото)
// находим шаблон фото тег template в разметке и обращаемся к его контенту
var similarPhotoTemplate = document.querySelector("#picture").content.querySelector(".picture");



//На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы,
//соответствующие фотографиям и заполните их данными из массива photos

var renderPhoto = function (wizard) {
  var photoElement = similarPhotoTemplate.cloneNode(true);// в переменную записали склонированный див с шаблоном волшебника
  photoElement.querySelector(".picture__img").src = photos[i].urls;//меняем имя в клоне
  photoElement.querySelector (".picture__likes").textContent = photos[i].likess;
  photoElement.querySelector (".picture__comments").textContent = photos[i].descriptions;
  return photoElement;
}

// 2.2 Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

var fragment = document.createDocumentFragment();// создаем контейнер, который содержит элементы дом


for (var i=0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));// добавляем в ведро сгенерированные элементы
}

similarListPhoto.appendChild(fragment);//высыпаем содержимое ведра в див


//3.2

var biggestPicture = document.querySelector(".big-picture");//находим  сектион оверлей c большой фото


var biggestPictureImg = biggestPicture.querySelector(".big-picture__img");// находим внутри него див с большой фоткой

//метод, который отрисовывает полноэкранный оверлей c большой фото(удаляет у блока biggestPicture класс хидден )
var showFullScrin = function () {
var biggestPicture = document.querySelector(".big-picture");
biggestPicture.classList.remove("hidden");
}


// 3.3
//обработкой изменения значения поля выбора файла #upload-file.
//При наступлении события change на этом поле, можно сразу показывать форму редактирования изображения.
var changeFile = document.querySelector("#upload-file");// инпут с кнопкой загрузить
var formEditImg = document.querySelector(".img-upload__overlay");//див с формой редактирования изображения

changeFile.addEventListener('change', function () {
formEditImg.classList.remove("hidden");
});

var good = document.querySelector(".img-upload");
var clickHandler = function  () {
  formEditImg.classList.add("hidden");//ф-ция,добавления класса хидден
  }


 var closeButton = document.querySelector("#upload-cancel");//кнопка закрытия формы редактирования


  closeButton.addEventListener("click",clickHandler);// по клику на кнопка закрытия формы редактирования (крестик), форма закрывается

var dva = document.querySelector(".text__description");

good.addEventListener("keydown", function (evt) {
  if (dva.onfocus){
formEditImg.classList.add("hidden");
   if (evt.keyCode === 27) {
   formEditImg.classList.add("hidden");// форма редактирования закрывается по клику на esc
  }
  }
});





closeButton.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 13) {
    formEditImg.classList.add("hidden");//форма редактирования закрывается по клику на enter
  }
});



document.querySelector(".img-upload__form").action = "https://js.dump.academy/kekstagram";// задаем полю для загрузки новго изображения на сайт action

// var focusEnter = function (evt) {
 // if (evt.keyCode === 13) {
   // userDialog.classList.remove("hidden");
 // }
//};


/*var imgUpload = document.querySelector(".img-upload__preview");//див в котором фотка (предварительны просмотри  изображения, нгде к нему можно применить фильтры)
var raz = imgUpload.querySelector("img");//сама фотка тег img

var pinScale = document.querySelector(".effect-level__pin");//находим кнопку переключатель ползунка

// вычисление пропорци для ползунка
var katya = function (almaz) {
var x = 454;// ширина ползунка в пх взята из разметки
  return almaz/x;

}
// отлавливаем событие mousrup на кнопке ползунка и меняем saturate
pinScale.addEventListener("mouseup", function () {
  var chlen = "saturate(" + katya(18) + ")";
  raz.style.filter= chlen;

} );*/






var photoElementImg = document.querySelectorAll(".picture__img");//Находим все маленькие фотки

//biggestPictureImg - это див с большой фоткой. эта переменная определена ранее в начале кода

// шаблон функции, которая по клику удаляет хидден у дива с большой фоткой и меняет адрес большой фотки
var addThumbnailClickHandler = function (thumbnail, photo) {
  thumbnail.addEventListener('click', function () {
    biggestPicture.classList.remove("hidden");
    biggestPictureImg.querySelector("img").src = photo;
  });
};


for (var k = 0; k < photoElementImg.length; k++) {
  addThumbnailClickHandler(photoElementImg[k], url[k]);
}

// работа с масштабом изображения

var buttonSmall = document.querySelector(".scale__control--smaller");
var buttonBig = document.querySelector(".scale__control--bigger");
var changeSizeValue = document.querySelector(".scale__control--value");
var changeSizeImgDiv = document.querySelector(".img-upload__preview");
var changeSizeImg = changeSizeImgDiv.querySelector("img");

//var roni = function () {changeSizeValue.value = "100%";}
//roni ();
//"55%"
var changeSizeValueCount = changeSizeValue.value;
//console.log (changeSizeValueCount);
var newStr = changeSizeValueCount.slice(0, -1);//возвращает строку "55"
//console.log (newStr);
var newCount = + newStr;//возвращает число 55
//console.log (newCount);
//changeSizeValueCount= "100%";
console.log(newCount);





buttonSmall.addEventListener("click", function(){
  if (newCount>25) {
  newCount = newCount-25;
  changeSizeValue.value = newCount +"%";
  var abb = newCount/100;
  var innor = "scale(" + abb + ")";
  changeSizeImg.style.transform = innor;

};
});

buttonBig.addEventListener("click", function(){
  if (newCount<100) {
  newCount = newCount+25;
  changeSizeValue.value = newCount +"%";
  var abb = newCount/100;
  var innor = "scale(" + abb + ")";
  changeSizeImg.style.transform = innor;

};
});


var scrollYellowAll = document.querySelector(".img-upload__effect-level");
var buttonsEffect = document.querySelectorAll(".effects__radio");//нашли инпуты с  кнопками

var effectNoneButton = document.querySelector("#effect-none");
var effectChromeButton =  document.querySelector("#effect-chrome");
var effectSepiaButton =   document.querySelector("#effect-sepia");
var effectMarvinButton =   document.querySelector("#effect-marvin");
var effectPhobosButton =   document.querySelector("#effect-phobos");
var effecthHeatButton =  document.querySelector("#effect-heat");

var sliderElem = document.querySelector(".effect-level__line");
var thumbElem = sliderElem.children[0];
var scrollYellow = document.querySelector(".effect-level__depth");

var berti = "origin";

effectNoneButton.addEventListener("click",function() {
  changeSizeImg.classList.remove("effects__preview--sepia");
  changeSizeImg.classList.remove("effects__preview--marvin");
  changeSizeImg.classList.remove("effects__preview--phobos");
  changeSizeImg.classList.remove("effects__preview--heat");
  changeSizeImg.classList.remove("effects__preview--chrome");
   changeSizeImg.style = "";
   scrollYellowAll.classList.add("hidden");

} );

effectChromeButton.addEventListener("click", function() {
  changeSizeImg.classList.remove("effects__preview--sepia");
  changeSizeImg.classList.remove("effects__preview--marvin");
  changeSizeImg.classList.remove("effects__preview--phobos");
  changeSizeImg.classList.remove("effects__preview--heat");
  changeSizeImg.classList.add("effects__preview--chrome");
  scrollYellowAll.classList.remove("hidden");
  thumbElem.style.left = "450" + "px";
  changeSizeImg.style = "";
  scrollYellow.style.width = "100%";
  berti = "chrome";
} );

effectSepiaButton.addEventListener("click", function() {
  changeSizeImg.classList.remove("effects__preview--chrome");
  changeSizeImg.classList.remove("effects__preview--marvin");
  changeSizeImg.classList.remove("effects__preview--phobos");
  changeSizeImg.classList.remove("effects__preview--heat");
  changeSizeImg.classList.add("effects__preview--sepia");
  scrollYellowAll.classList.remove("hidden");
  thumbElem.style.left = "450" + "px";
  changeSizeImg.style = "";
  scrollYellow.style.width = "100%";
  berti = "sepia";
} );

effectMarvinButton.addEventListener("click", function() {
  changeSizeImg.classList.remove("effects__preview--chrome");
  changeSizeImg.classList.remove("effects__preview--sepia");
  changeSizeImg.classList.remove("effects__preview--phobos");
  changeSizeImg.classList.remove("effects__preview--heat");
  changeSizeImg.classList.add("effects__preview--marvin");
  scrollYellowAll.classList.remove("hidden");
  thumbElem.style.left = "450" + "px";
  changeSizeImg.style = "";
  scrollYellow.style.width = "100%";
  berti = "marvin";
} );

effectPhobosButton.addEventListener("click", function() {
  changeSizeImg.classList.remove("effects__preview--chrome");
  changeSizeImg.classList.remove("effects__preview--sepia");
  changeSizeImg.classList.remove("effects__preview--marvin");
  changeSizeImg.classList.remove("effects__preview--heat");
  changeSizeImg.classList.add("effects__preview--phobos");
  scrollYellowAll.classList.remove("hidden");
  thumbElem.style.left = "450" + "px";
  changeSizeImg.style = "";
  scrollYellow.style.width = "100%";
  berti = "phobos";
} );

effecthHeatButton.addEventListener("click", function() {
  changeSizeImg.classList.remove("effects__preview--chrome");
  changeSizeImg.classList.remove("effects__preview--sepia");
  changeSizeImg.classList.remove("effects__preview--marvin");
  changeSizeImg.classList.remove("effects__preview--phobos");
  changeSizeImg.classList.add("effects__preview--heat");
  scrollYellowAll.classList.remove("hidden");
  thumbElem.style.left = "450" + "px";
  changeSizeImg.style = "";
  scrollYellow.style.width = "100%";
  berti = "heat";
} );




var textHashteg = document.querySelector(".text__hashtags");

var submit = document.querySelector(".img-upload__submit");
/*submit.addEventListener("click", function() {
  var text = textHashteg.value;

  if (text[0] !== "#") {
    console.log("neverno  ");
  }

});
*/
//textHashteg.value = "";
//var arrayHashtegs = textHashteg.value.split(" ", 5);
//console.log(arrayHashtegs);
//for (var j = 0; j<=4;j++){
  //if (arrayHashtegs[j][0]=="#"){
    //console.log["h"]
  //}



//};









var sliderElem = document.querySelector(".effect-level__line");//находим див с кнопкой  переключатель ползунка
var thumbElem = sliderElem.children[0];//сам ползунок - пин
var scrollYellow = document.querySelector(".effect-level__depth");

var deepValue = document.querySelector(".effect-level__value");
console.log(deepValue.value);


thumbElem.addEventListener("mousedown", function(evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function(moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };
    thumbElem.style.left = (thumbElem.offsetLeft - shift.x) + "px";
    if ((thumbElem.offsetLeft - shift.x) < 0) {
      thumbElem.style.left = "0";
    };
    if ((thumbElem.offsetLeft - shift.x) > 450) {
      thumbElem.style.left = "450" + "px";
    };
    var resulfFormula = 100*(thumbElem.offsetLeft - shift.x)/450;

    scrollYellow.style.width = resulfFormula +"%";

    deepValue.value = ((thumbElem.offsetLeft - shift.x)/450).toFixed(2)  +"";
    //console.log("value: " + deepValue.value);

    if (berti == "chrome") {
      var formulaChrome = "grayscale(" + (thumbElem.offsetLeft - shift.x)/450 + ")";
      changeSizeImg.style.filter = formulaChrome;
      console.log("chrome: " + formulaChrome);
    } else if (berti == "sepia") {
      var formulaSepia = "sepia(" + (thumbElem.offsetLeft - shift.x)/450 + ")";
      changeSizeImg.style.filter = formulaSepia;
      console.log("sepia: " + formulaSepia);
    } else if (berti == "marvin") {
      var formulaMarvin = "invert(" + resulfFormula + "%"  + ")";
      changeSizeImg.style.filter = formulaMarvin;
    }
    else if (berti == "phobos") {
      var formulaPhobos = "blur(" + 3*(thumbElem.offsetLeft - shift.x)/450 +"px"  + ")";
      changeSizeImg.style.filter = formulaPhobos;
    }
    else if (berti == "heat") {
      var formulaHeat = "brightness(" + ((2*((thumbElem.offsetLeft - shift.x)/450))+ 1) + ")";
      changeSizeImg.style.filter = formulaHeat;
    };

    // var formulaChrome = "grayscale(" + (thumbElem.offsetLeft - shift.x)/450 + ")";
    // changeSizeImg.style.filter = formulaChrome;
    // var formulaSepia = "sepia(" + (thumbElem.offsetLeft - shift.x)/450 + ")";
    // changeSizeImg.style.filter = formulaSepia;
  };


  var onMouseUp = function(upEvt) {
    upEvt.preventDefault();
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup",onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});


//валидация формы































































