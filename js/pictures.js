'use strict';

var pictureElement = document.querySelector('.big-picture');

var photosList = document.querySelector('.pictures');
var photosItemTemplate = document.querySelector('#picture');


var PHOTOS_AMOUNT = 25;
var min = 15;
var max = 200;
var i = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

var PIC_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PIC_DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

// Функция, возвращающая случайный элемент из массива
var pickRandomRepeat = function (array) {
  return Math.floor(Math.random() * array.length);
}

// Функция, возвращающая случайное целое число от min до max
var pickRandomLike = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

// Функция, возвращающая объект, описывающий фотографию
var getPhoto = function () {
  return {
    url: 'photos/' + pickRandomRepeat(i) + '.jpg',
    likes: pickRandomLike(min, max),
    comments: PIC_COMMENT[pickRandomRepeat(PIC_COMMENT)],
    description: PIC_DESCRIPTION[pickRandomRepeat(PIC_DESCRIPTION)]
  };
};

// Функция, возвращающая массив из объекта с фото
var getPhotoArray = function (param) {
  var photoArray = [];
  for (var i =0; i < param; i ++) {
    photoArray.push(getPhoto());
  }
  return photoArray;
};

var renderPhoto = function (param) {
  var photoElement = photosItemTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src.textContent = param.url;
  photoElement.querySelector('.picture__stat--likes').textContent = param.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = param.comments;
};

var fragment = document.createDocumentFragment();
var photos = getPhotoArray(PHOTOS_AMOUNT);
for (var i = 0; i < PHOTOS_AMOUNT; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

photosList.appendChild(fragment);
