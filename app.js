//onload function
window.onload = function(){
  // console.log('hello world!');
}

//ajax call for the shadows over innistrad object
var shadows  = {};
var imgURL = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='
var imgURLend = '&type=card';

$.ajax({
  type:'get',
  url:'http://mtgjson.com/json/SOI.json',
  success:function(data){



    shadows.cards = data.cards;
    shadows.cards.log = function(){
      console.log(shadows.cards);
    };

    shadows.commons = shadows.cards.filter(function(card){
        if(card.rarity == 'Common'){
          return card;
        }
      });

    shadows.uncommons = shadows.cards.filter(function(card){
      if(card.rarity == 'Uncommon'){
        return card;
      }
    });

    shadows.rares = shadows.cards.filter(function(card){
      if(card.rarity == 'Rare'){
        return card;
      }
    });

    shadows.mythics = shadows.cards.filter(function(card){
      if(card.rarity == 'Mythic Rare'){
        return card;
      }
    });

    shadows.random = function(arr){
      return arr[Math.floor(Math.random()*arr.length)];
    };

    shadows.render = function(arr){
      if(Array.isArray(arr)){
        for(var card in arr){
          id = arr[card].multiverseid;
          imgHTMLstr = '<span class="card" id ="'+id+'"><img src="'+imgURL+id+imgURLend+'"></span>';
          $('.cards').append(imgHTMLstr);
        }
      } else {
        id = arr.multiverseid;
        imgHTMLstr = '<span class="card" id ="'+id+'"><img src="'+imgURL+id+imgURLend+'"></span>';
        $('.cards').append(imgHTMLstr);
      }
    };

    console.log(shadows.cards.length);
   shadows.randomIndex = function(){
      return Math.floor(Math.random()*shadows.cards.length);
    };
  },
  complete:function(){
      $('span').click(function(){
        for(var card in shadows.cards){
          if(shadows.cards[card].multiverseid==this.id){
            console.log(shadows.cards[card]);
          }
        }
      });

      $('span').on('mouseenter',function(){
        var img = this.firstChild;
        img.style.border = '3px solid red';
        img.style.borderRadius = '5px';
      });

      $('span').on('mouseout',function(){
        this.firstChild.style.borderRadius='0px';
        this.firstChild.style.border='none';
      });



    }//end of complete function
});//end of AJAX call
