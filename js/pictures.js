'use strict';

var picturePopup = document.querySelector('.big-picture');
var photosList = document.querySelector('.pictures');
var photosItemTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var commentsList = document.querySelector('.social__comments');
var commentCount = document.querySelector('.social__comment-count');
var photoLoadmore = document.querySelector('.social__loadmore');
var commentTemplate = document.querySelector('.social__comment');

picturePopup.classList.remove('hidden');
commentCount.classList.add('visually-hidden');
photoLoadmore.classList.add('visually-hidden');

var PHOTOS_AMOUNT = 25;
var COMMENTS_AMOUNT = 2;

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

// Функция, возвращающая случайное целое число от min до max
var pickRandomInt = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};

// Функция, возвращающая случайный элемент из массива
var pickRandomRepeat = function (array) {
  return array[pickRandomInt(0, array.length -1)];
};

// Функция, возвращающая объект, описывающий фотографию
var getPhoto = function (i) {
  return {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: pickRandomInt(15, 200),
    comments: pickRandomRepeat(PIC_COMMENT),
    description: pickRandomRepeat(PIC_DESCRIPTION)
  };
};

// Функция, возвращающая массив из объекта с фото
var getPhotoArray = function (param) {
  var photoArray = [];
  for (var i = 0; i < param; i++) {
    photoArray.push(getPhoto(i));
  }
  return photoArray;
};

// Функция отрисовки элемента в блок .pictures
var renderPhoto = function (param) {
  var photoElement = photosItemTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = param.url;
  photoElement.querySelector('.picture__stat--likes').textContent = param.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = param.comments;

  return photoElement;
};

var fragment = document.createDocumentFragment();
var photos = getPhotoArray(PHOTOS_AMOUNT);
for (var i = 0; i < PHOTOS_AMOUNT; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

photosList.appendChild(fragment);

var renderCommentBlock = function (param) {
  picturePopup.querySelector('.big-picture__img img').src = param.url;
  picturePopup.querySelector('.likes-count').textContent = param.likes;
  picturePopup.querySelector('.comments-count').textContent = param.comments;

  var fragmentPopup = document.createDocumentFragment();
  commentsList.innerHTML = '';
  for (var i = 0; i < PIC_COMMENT.length; i++) {
    var commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = 'img/avatar-' + (i + 1) + '.svg';
    commentElement.querySelector('.social__text').textContent = pickRandomRepeat(PIC_COMMENT);
    fragmentPopup.appendChild(commentElement);
  }

  picturePopup.querySelector('.social__comments').appendChild(fragmentPopup);
  picturePopup.querySelector('.social__caption').textContent = param.description;

};

var fragmentPost = document.createDocumentFragment();
var photoPost = getPhotoArray(PHOTOS_AMOUNT);
for (var i = 0; i < PHOTOS_AMOUNT; i++) {
  fragmentPost.appendChild(renderCommentBlock(photoPost[i]));
}

picturePopup.appendChild(fragmentPost);
