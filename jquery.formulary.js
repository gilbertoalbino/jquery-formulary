/*
 * Formulary 1.0 - jQuery plugin to handle form inputs
 *
 * https://github.com/gilbertoalbino/jquery-formulary
 * http://gilbertoalbino.com
 *
 * Copyright 2014 Gilberto Albino 
 * Released under the GLP v2 license:
 *   http://www.gnu.org/licenses/gpl-2.0.html
 */ 
jQuery.fn.formulary = function(options) {
	
	// Will prevent any form submission to happen.
	jQuery(document).on('submit', 'form', function(e){
		e.preventDefault();
	});
	
	/**
	 * @todo
	 *   Colocar verificação se é formulario.
	 */
	var defaults = {
		success : null
	};

	
	var messages = [
	];
	
	// Deafault jQuery extending
	var settings = jQuery.extend({}, defaults, options);
	// Private
	settings.submit = false;
	settings.currentData = undefined;
	settings.currentElement = undefined;
	settings.currentValue = undefined;
	settings.currentRequired = false;
	settings.currentSplittedData = new Array();
	
	var methods = {
			
		// Effectively runs the plugin
		init : function(form) 
		{
			methods.iterate(form);
			if(typeof settings.success == 'function' && settings.submit == true) {
				settings.success.apply(Array.prototype.slice.call(arguments, 1));
			}
		},
		
		iterate : function(form) 
		{
			// Will end up to be true if not blocked in validation
			jQuery(form).find(':input').each(function(){
				
				var $this = jQuery(this);
				
				settings.currentElement =  $this;
				settings.currentValue = $this.val().toString();
				settings.submit = true;
				
				if( methods.testData('validate') ) 
				{
					var validate = methods.validateDataOrder(settings.currentData.split(' '));
					settings.currentRequired == false;
					
					// Will force to create required attribute
					if(jQuery.inArray('required', validate) !== -1) {
						console.log(jQuery(settings.currentElement).prop('name'));
						
						settings.currentRequired = true;
						// For some odd reason, having required attribute messes with submit
						jQuery(settings.currentElement).prop('required',false);
					}
						
					for(var i = 0; i < validate.length; i++) {
						if(typeof methods.validate[validate[i]] == 'function') {
							methods.validate[validate[i]]();
							methods.passRequired();
							return methods.focusOnInvalid();
						}
					}
					
					return settings.submit;
				}
			});
			
			return settings.submit;
		},
		
		/**
		 * Tests if a given data atribute is defined.
		 * @returns boolean
		 */
		testData : function(data) 
		{
			var dataValue = jQuery(settings.currentElement).data(data);
			if(dataValue !== undefined) {
				settings.currentData = dataValue.toString();
				settings.currentSplittedData = settings.currentData.split(' ');
				return true;
			} 
			return false;
		},
		
		/**
		 * Validates if an input must be required 
		 * and properly orders the matched array.
		 * @returns Array Object
		 */
		validateDataOrder : function(values) 
		{
			var validate = new Array();
			var required = false;
			console.log(values);
			for(var i = 0; i < values.length; i++) {
				if(values[i] != 'required') {
					validate.push(values[i]);
				} 
				if(values[i] == 'required') {
					required = true;
				}
			}
			
			if(required == true) {
				validate.push('required');
			}
			
			return validate;
		},
		
		/**
		 * When it is the case the validation only happens on choosen input.
		 * Required has to be strict to "required" option on "data-validate".
		 * @returns void
		 */
		passRequired : function()
		{
			console.log('Tag is: ' + jQuery(settings.currentElement).prop('tagName'));
			console.log('Value is: ' + settings.currentValue);
			console.log('Submit is: ' + settings.submit);
			console.log('Required is: ' + settings.currentRequired);
			
			var value = settings.currentValue;
			var tagName = jQuery(settings.currentElement).prop('tagName');
			
			if(tagName  == 'SELECT') {
				if(methods.testData('not')) {
					// If "not" value equals to value it can't nullify
					if(jQuery.inArray(value, settings.currentSplittedData)!== -1) {
						value = value;
					} 
				} else {
					value = '';
				}
			}
			
			if( value == '' && 
			    settings.submit == false && 
			    settings.currentRequired == false) {
				// pass
				settings.submit = true;
				
			}

			// once it havent't changed the submit
			settings.currentRequired = false;
		},
		
		/**
		 * The input should be focused only when submit is false.
		 * 
		 */
		focusOnInvalid : function() {
			if(settings.submit == false) {
				jQuery(settings.currentElement).focus();
				return false;
			}
			//return true;
		},
		
		/**
		 * These methods are responsible for handling.
		 */
		validate : 
		{
			required : function() 
			{
				if( settings.currentValue == '' ) {
					settings.submit = false;
				}
			},
			
			// alias for required indeed
			notempty : function() 
			{
				methods.validate.required();
			},
			
			// do not confuse with js lentgh method
			length : function() 
			{
				if( methods.testData('length') ) {
					if(settings.currentValue.length < settings.currentData) {
						settings.submit = false;
					}
				}
			},
			
			// alphanumeric only
			alphanumeric : function() 
			{
				var regex = /^([a-zA-Z0-9]+)$/;
				if(regex.test(settings.currentValue) == false) {
					settings.submit = false;
				}
			},
			
			// you can pass the characters you would like to allow.
			alphanumericallow : function() 
			{
				if( methods.testData('allow')) {
					var regex = new RegExp('^([a-zA-Z0-9' + settings.currentData + ']+)$');
					if(regex.test(settings.currentValue) == false ) {
						settings.submit = false;
					}
				} 
			},
			
			// not won't let you pass not required if the value has a match
			not : function() 
			{
				if(methods.testData('not')) {
					var values = settings.currentSplittedData;
					for(var i = 0; i < values.length; i++) {
						if(settings.currentValue == values[i]) {
							settings.submit = false;
							break;
						}
					}
				}
			},
			
			email : function() 
			{
				var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(regex.test(settings.currentValue) == false) {
                	settings.submit = false;
                }
			},
			
			regex : function() 
			{
				if(methods.testData(element, 'regex')) {
					var regex = new RegExp(settings.currentData);
					if(regex.test(settings.currentValue) == false) {
						settings.submit = false;
					}
				}
			}
			
			/* 
			@todo
			  it should be possible to only pass on a certain condition.
			  this could be performed by a regular expression.
			condition : function(element, value) {
				var condition = jQuery(element).data('condition');
				if(condition !== undefined) {
					//condition['element1[not=0] element2[=1]'];
					var items = condition.split(' ');
					for(var i = 0; i < items.length; i++) {
					}
				}
			}*/
			
		}
		
	};
	
	return this.each(function() {
		if(jQuery(this).prop('tagName') != 'FORM') {
			console.log('You should use a FORM for jQuery Formulary Plugin. Given is ' + jQuery(this).prop('tagName'))
			return true;
		}
		methods.init(this);
	});
    
};
