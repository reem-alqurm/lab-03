'use strict'


const keywordArr= [];

function ImgStorage(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

    ImgStorage.allimageStorage.push(this);
  }
  ImgStorage.allimageStorage = [];



ImgStorage.prototype.renderWithJQueryAndMustache = function() {

  const imgTemplateHtml = $('#mustache-template-section').html();
  const outputFromMustache = Mustache.render(imgTemplateHtml, this); 
  $('body > section').append(outputFromMustache);   
};

function objectFile(arrayObject) {    
    arrayObject.forEach(animalPic => {
    new ImgStorage(animalPic.image_url, animalPic.title, animalPic.description, animalPic.keyword, animalPic.horns);
    
            if ($(`select:contains(${animalPic.keyword})`).length === 0){
            renderAnimalOptions(animalPic.keyword);
            }
    });
    ImgStorage.allimageStorage.forEach(imgStorage => imgStorage.renderWithJQueryAndMustache());
  }

function renderAnimalOptions(dropdownOptions){
    $('select').append('<option>' + dropdownOptions + '</option>');
  }

  function filterSelection(event) {
  $('body > section').empty();

  ImgStorage.allimageStorage.forEach(animalpic => {
    if (animalpic.keyword === event.target.value){
            animalpic.renderWithJQueryAndMustache()
        }
      })
    }



$.ajax('data/page-1.json').then(objectFile); 

$('select').on('change', filterSelection);

$('#sort-button').on('click', function(){
  $('body > section').empty();
  
  ImgStorage.allimageStorage.sort(function(l, r) {
  
    if (l.horns > r.horns) {
        return 1
    } else if (l.horns < r.horns) {
        return -1
    } else { 
        if (l.keyword > r.keyword) {
          return 1
      } else if (l.keyword < r.keyword) {
          return -1
      } else {
          return 0
      }
    }
  })

  ImgStorage.allimageStorage.forEach(imgStorage => imgStorage.renderWithJQueryAndMustache());
});


  $('#lab-02').on('click', function() {
    $('select').empty();
    $('body > section').empty();
    ImgStorage.allimageStorage = [];
    $.ajax('data/page-1.json').then(objectFile); 
  })


  $('#lab-03').on('click', function() {
    $('select').empty();
    $('body > section').empty();
    ImgStorage.allimageStorage = [];

    $.ajax('data/page-2.json').then(objectFile); 


  })

