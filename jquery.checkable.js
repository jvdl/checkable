/*
 * A jQuery plugin for wrapping Checkboxes and Radio buttons
 *
 * Author: John Van Der Loo
 * Twitter: @geekyjohn
 * Website: http://www.afterlight.com.au
 *
 */

(function($, window, undefined) {
	"use strict";

	$.checkable = function(el, options){
		// To avoid scope issues, use 'self' instead of 'this'
		// to reference this class from internal events and functions.
		var self = this;

		// Access to jQuery and DOM versions of element
		self.$el = $(el);
		self.el = el;

		self.defaultOptions = {
			retainFocus: true // retain focus on checkboxes after checking with keyboard?
		};

		self.init = function(){

			self.options = $.extend({}, self.defaultOptions, options);

			self.setupFields();

		};


		self.setupFields = function( ) {

			var context = self.el;

			// wrap the checkboxes with labels, this way the browser will take care of all those pesky things like
			// checking the fields
			$("input[type=radio]", context ).wrap("<label class='checkable-field checkable-radio'/>");
			$("input[type=checkbox]", context ).wrap("<label class='checkable-field checkable-checkbox'/>");

			$(context).on("change", "input[type=radio], input[type=checkbox]", function() {
				var $this = $(this),
					isRadio = $this.is("[type=radio]"),
					isChecked = $this.is(":checked");

				// checkboxes can simply toggle
				if (!isRadio) {
					$this
						.closest(".checkable-field")
						.toggleClass("checked", isChecked);

					// do we need to retain focus of the checkbox after checking with keyboard
					if ( ! self.options.retainFocus ) {
						$this.trigger("focusout"); //focusout after toggling a checkbox
					}
				}
				// and radio buttons can only have 1 checked per group
				else {
					if (isChecked) {
						// remove the checked class from all the radios in the group
						$("input[name=" + $this.attr("name") + "]:not(:checked)", context).closest(".checkable-field").removeClass("checked");

						$this.closest(".checkable-field").addClass("checked");
					}
				}


			});

			// Add a focus class for keyboard navigation.
			$(context).on("focusin focusout", "input[type=checkbox], input[type=radio]", function(e) {

				$(this).closest(".checkable-field").toggleClass("focused", e.type === "focusin");

			});

			// "check" any already checked items
			$("input[type=radio]:checked, input[type=checkbox]:checked", context).closest(".checkable-field").addClass("checked");

		};


		self.init();
	};

	$.fn.checkable = function(options){
		return this.each(function(){
			(new $.checkable(this, options));
		});
	};

}(jQuery, window));
