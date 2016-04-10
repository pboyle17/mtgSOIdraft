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

    shadows.makeURL = function(id){
      var imgURL = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=';
      var imgURLend = '&type=card';
      return imgURL+id+imgURLend;
    }

    shadows.makeComponent = function(id){
      var url = shadows.makeURL(id);
      return '<span class="card" id="'+id+'"><img src="'+url+'"></span>';
    }

    shadows.getCardObjFromMultiverseId = function(multiverseid){
      var filtered = shadows.cards.filter(function(card){
        if(card.multiverseid == multiverseid){
          return card;
        }
      });

      console.log(filtered[0]);
      return filtered[0];
    };

    shadows.getCardObjFromCardName = function(cardName){
      var filtered = shadows.cards.filter(function(card){
        if(card.name == cardName){
          return card;
        }
      });
      console.log(filtered[0]);
      return filtered[0];
    };

    shadows.changeCardImage = function(original,cardObj){
      var URL = shadows.makeURL(cardObj.multiverseid);
      console.log(URL);
      var card = document.getElementById(original.multiverseid);
      card.id=cardObj.multiverseid;
      var img = card.firstChild;
      img.src = URL;

    };

    shadows.flipCard = function(cardObj){
      if(cardObj.name == cardObj.names[0]){
        var flipped = shadows.getCardObjFromCardName(cardObj.names[1]);
         shadows.changeCardImage(cardObj,flipped);
      } else if (cardObj.name == cardObj.names[1]){
        var flipped = shadows.getCardObjFromCardName(cardObj.names[0]);
        shadows.changeCardImage(cardObj,flipped);
      } else {
        console.log('something went wrong!');
      }
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
          imgHTMLstr = shadows.makeComponent(id);
          $('.cards').append(imgHTMLstr);
          if(arr[card].layout == 'double-faced'){
            console.log(arr[card]);
            $('#'+id).click(function(){
              shadows.flipCard(arr[card]);
            });
          }
        }
      } else {
        id = arr.multiverseid;
        imgHTMLstr = shadows.makeComponent(id);
        $('.cards').append(imgHTMLstr);
        $('#'+id).click(function(){
          var card = shadows.getCardObjFromMultiverseId(this.id);
          if(card.layout == 'double-faced'){
            shadows.flipCard(card);
          }
        });
      }
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
