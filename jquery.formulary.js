/*
 * Formulary 1.0 - jQuery plugin to handle form inputs
 *
 * https://github.com/gilbertoalbino/jquery-formulary
 *
 * Copyright 2014 Gilberto Albino
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
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
					for(var i = 0; i < validate.length; i++) {
						if(typeof methods.validate[validate[i]] == 'function') {
							methods.validate[validate[i]]($this, value.toString());
						}
					}
				}
			});
		},
		
		/**
		 * Validation suit
		 */
		validate : {
			empty : function( element, value ) {
				if( value == '' ) {
					settings.submit = false;
					jQuery(element).focus();
				}
			},
			length : function(element, value) {
				if( jQuery(element).data('length') ) {
					if(value.length < jQuery(element).data('length')) {
						settings.submit = false;
						jQuery(element).focus();
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
							jQuery(element).focus();
							break;
						}
					}
				}
			}
			
		}
		
	};
	
	return this.each(function() {
	    methods.init(this);
	});
    
};
