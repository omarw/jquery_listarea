/*!
 * jQuery listarea plugin
 * Original author: Omar Wheatley
 * Copyright 2014 Omar Wheatley
 * Licensed under the MIT license
 * 1.0.0
 */
 
;(function($, window, undefined){
	$.fn.listarea = function(params) {
		params = $.extend( {delimiter: ',', effect: null, placeholder: "add an item"}, params);
		var textArray = $(this).val().split(params.delimiter);		
		var textareaInput = $(this).hide().after('<div class="addListItem"><input type="text" placeholder="'+params.placeholder+'"/><div class="addButton"></div></div>');
		var listareaWrap = $('div.addListItem');
		syncExistingValues(textArray, listareaWrap, params);
		$('div.addListItem > .addButton').on('click', function(){
			lbAddListItem(textareaInput, listareaWrap, params);
		});		
		$('div.addListItem').on('click', 'div.listItemWrap .deleteButton', function(){
			lbDeleteListItem(textareaInput, listareaWrap, $(this), params);
		});
		$('div.addListItem > input').on('enterKey', function(){
			return false;
		});
		$('div.addListItem > input').keyup(function(e){
			if(e.keyCode == 13)
			{
				$(this).trigger("enterKey");
			}
			return false;
		});
		return this;
   };
   function syncExistingValues(textArray, listareaWrap, params){
		for (i = 0; i < textArray.length; i++) { 
			if(textArray[i] != ''){
				$('<div class="listItemWrap"><div class="listItem">' + textArray[i] + '</div><div class="deleteButton"></div></div>').hide().prependTo(listareaWrap).show(params.effect);
			}
		}
   }
   function lbAddListItem(textareaInput, listareaWrap, params){
		var itemValue = $('div.addListItem > input').val();
		if(itemValue != ''){
			textareaInput.next('div.addListItem').find('input').val('');
			$('<div class="listItemWrap"><div class="listItem">' + itemValue + '</div><div class="deleteButton"></div></div>').hide().prependTo(listareaWrap).show(params.effect);
			lbListItemToTextArea(textareaInput, listareaWrap, params);
		}
	}

	function lbDeleteListItem(textareaInput, listareaWrap, item, params){
		item.parent().remove();
		lbListItemToTextArea(textareaInput, listareaWrap, params);
	}

	function lbListItemToTextArea(textareaInput, listareaWrap, params){
		var items = [];
		listareaWrap.find('div.listItem').each(function(){
			items.push( $(this).text() );
		});
		textareaInput.val(items.join(params.delimiter));
	}
})( jQuery, window );