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
		success : null
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
		
		iterate : function() {
			// Will end up to be true if not blocked in validation
			settings.submit = true;
			
			jQuery(settings.form + ' :input').each(function(){
				var $this = jQuery(this);
				var data = $this.data('validate');
				var value = $this.val();
				
				if( data !== undefined ) {
					var validate = data.split(' ');
					
					// Will force to create required attribute
					if(jQuery.inArray('required', validate) ) {
						jQuery($this).prop('required',true);
					}
					
					for(var i = 0; i < validate.length; i++) {
						if(typeof methods.validate[validate[i]] == 'function') {
							methods.validate[validate[i]]($this, value.toString());
							if(settings.submit == false) {
								jQuery($this).focus();
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
			required : function(element, value) {
				if( value == '' ) {
					settings.submit = false;
				}
			},
			// alias for required indeed
			notempty : function( element, value ) {
				methods.validate.required(element, value);
			},
			// do not confuse with js lentgh method
			length : function(element, value) {
				if( jQuery(element).data('length') ) {
					if(value.length < jQuery(element).data('length')) {
						settings.submit = false;
					}
				}
			},
			not : function( element, value ) {
				var not = jQuery(element).data('not');
				if(not !== undefined) {
					var values = not.toString().split(' ');
					for(var i = 0; i < values.length; i++) {
						if(value == values[i]) {
							settings.submit = false;
							break;
						}
					}
				}
			},
			email : function(element, value) {
				var regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if(regex.test(value) == false) {
                	settings.submit = false;
                }
			},
			regex : function(element, value) {
				var regex = new RegExp(jQuery(element).data('regex'));
				if(regex.test(value) == false) {
					settings.submit = false;
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
