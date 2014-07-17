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

	var defaults = {
		form : 'form',
		submit : false,
		success : null,
		currentData : null,
		currentElement : null,
		currentValue : null
	};

	var messages = [
	];
	
	// Deafult jquery extending
	var settings = jQuery.extend({}, defaults, options);
	
	var methods = {
		// Effectively runs the plugin
		init : function(element) {
			methods.iterate();
			if(typeof settings.success == 'function' && settings.submit == true) {
				settings.success.apply(Array.prototype.slice.call(arguments, 1));
			}
		},
		
		testData : function(data) {
			var dataValue = jQuery(settings.currentElement).data(data);
			if(dataValue !== undefined) {
				settings.currentData = dataValue.toString();
				return true;
			} 
			return false;
		},
		
		iterate : function() {
			// Will end up to be true if not blocked in validation
			settings.submit = true;
			
			jQuery(settings.form + ' :input').each(function(){
				var $this = jQuery(this);
				settings.currentElement =  $this;
				settings.currentValue = $this.val().toString();
				
				if( methods.testData('validate') ) {
					var validate = settings.currentData.split(' ');
					
					// Will force to create required attribute
					if(jQuery.inArray('required', validate) ) {
						jQuery(settings.currentElement).prop('required',true);
					}
					
					for(var i = 0; i < validate.length; i++) {
						if(typeof methods.validate[validate[i]] == 'function') {
							methods.validate[validate[i]]();
							if(settings.submit == false) {
								jQuery(settings.currentElement).focus();
								return false;
							}
						}
					}
				}
			});
		},
		
		/**
		 * Validation suit
		 */
		validate : {
			required : function() {
				if( settings.currentValue == '' ) {
					settings.submit = false;
				}
			},
			
			// alias for required indeed
			notempty : function() {
				methods.validate.required();
			},
			
			// do not confuse with js lentgh method
			length : function() {
				if( methods.testData(element, 'length') ) {
					if(value.length < settings.currentData) {
						settings.submit = false;
					}
				}
			},
			
			alphanumericalallow : function() {
				if( methods.testData(element, 'allow')) {
					var regex = new RegExp('^([a-zA-Z0-9' + settings.currentData + ']+)$');
					if(regex.test(value) == false ) {
						settings.submit = false;
					}
				} 
			},
			
			alphanumerical : function() {
				var regex = /^([a-zA-Z0-9]+)$/;
				if(regex.test(value) == false) {
					settings.submit = false;
				}
			},
			
			not : function() {
				if(methods.testData('not')) {
					var values = settings.currentData.split(' ');
					for(var i = 0; i < values.length; i++) {
						if(settings.currentValue == values[i]) {
							settings.submit = false;
							break;
						}
					}
				}
			},
			
			email : function() {
				var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(regex.test(value) == false) {
                	settings.submit = false;
                }
			},
			
			regex : function() {
				if(methods.testData(element, 'regex')) {
					var regex = new RegExp(settings.currentData);
					if(regex.test(value) == false) {
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
	    methods.init(this);
	});
    
};
