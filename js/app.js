'use strict';
let templateId = '#photo-template';
let allAnimals =[];
let newArr=[];
function GalleryofHorns (animal){
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description =animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  allAnimals.push(this);
}



GalleryofHorns.prototype.render = function () {
    // let $anaimalClone = $('.photo-template').clone();
    // $('main').append($anaimalClone);
    // $anaimalClone.find('h2').text(this.title);
    // $anaimalClone.find('img').attr('src', this.image_url);
    // $anaimalClone.find('p').text(this.description);
    // // $anaimalClone.removeClass('photo-template');
    // // $anaimalClone.attr('class', this.title);

    let template = $(templateId).html();
    let html = Mustache.render(template,this);
    console.log(html);
    return html;

    // let title = `<div><h2> Name : ${this.title}</h2></div>`
    // $('main').append(title)
    // let img = $('<img></img>').attr('src', this.image_url)
    // $('main').append(img);
    // let description = `<div><p> Discribtion : ${this.description}</p></div>`
    // $('main').append(description)
    // let numHorn = `<div><p> Number of Horns : ${this.horns}</p></div>`
    // $('main').append(numHorn)
    

    // let selectop = $('<option></option>').text(this.keyword);
    // selectop.attr ('value', this.keyword);
    
    // if (newArr.includes(this.keyword)){}
    // else{
    // newArr.push(this.keyword);
    // $('.selectid').append(selectop);}
  }
    const ajaxSettings = {
      method: 'get',
      dataType: 'json'
    };

$( document ).ready(function() {


    $.ajax('../data/page-1.json', ajaxSettings)

      .then(data => { 
        data.forEach(item => {
          // let hornanimal = new GalleryofHorns(item);
          // console.log (hornanimal);

            allAnimals.push(new GalleryofHorns(item));
          });

          allAnimals.forEach(item => {
            $('#photo-template').append(item.render());
          });
        });

       
       
});


  
   // $('.selectid').on('click', function () {
        //     let valueEl = $('.selectid').val();
        //     $('main').empty();
        //     data.forEach(item => {
        //         if (valueEl === 'default'){
        //             let b =new GalleryofHorns(item);
        //              b.render();
        //         }
        //         else if ( item.keyword === valueEl)
        //         {
        //             let a=new GalleryofHorns(item);
        //             a.render();

        //         }
        //     })
        // });