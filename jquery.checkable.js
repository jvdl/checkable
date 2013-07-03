/*
 * A jQuery plugin for wrapping Checkboxes and Radio buttons
 *
 * Author: John Van Der Loo
 * Twitter: @geekyjohn
 * Website: http://www.afterlight.com.au
 *
 */

(function($, undefined) {
	"use strict";

	$.checkable = function(el, options){
		// To avoid scope issues, use 'self' instead of 'this'
		// to reference this class from internal events and functions.
		var self = this;

		// Access to jQuery and DOM versions of element
		self.$el = $(el);
		self.el = el;

		// Set up the default options
		self.defaultOptions = {
			retainFocus: true, // retain focus on checkboxes after checking with keyboard?
			                   // This can be useful if the user needs to tab to
			                   // other elements on the form.
			wrapperElement: "span"
		};

		/**
		 * Initialise the plugin
		 */
		self.init = function(){

			// Merge the passed in options on to the default options
			self.options = $.extend({}, self.defaultOptions, options);

			// Set up the fields.
			self.transformMarkup();

			// Bind the events
			self.bindEvents();

		};


		self.transformMarkup = function( ) {

			var $context = self.$el;

			// Find all Radios and Checkboxes within the context and wrap
			// the input with an element
			$context.find("input[type=radio], input[type=checkbox]").each(function() {
				var $this = $(this),
					classes = ["checkable-field"];

				// Class to indicate the type of element
				classes.push("checkable-"+ $this.attr("type").toLowerCase());

				// Class to indicate if the item is checked
				classes.push($this.is(":checked") ? "checked": "");

				$this.wrap("<" + self.options.wrapperElement + " class=\" " + classes.join(" ") + "\"/>");

			});

		};

		/**
		 * Bind UI related events here.
		 * Events should be delegated to the current context
		 */
		self.bindEvents = function() {
			// Do stuff when the input changes
			self.$el.on("change", "input[type=radio], input[type=checkbox]", self.inputChanged);

			// Add a focus class for keyboard navigation.
			self.$el.on("focusin focusout", "input[type=checkbox], input[type=radio]", self.inputFocused);

		};


		/**
		 * Handler for when an input checkbox or radio has been changed
		 *
		 */
		self.inputChanged = function () {
			var $this = $(this),
				isRadio = $this.is("[type=radio]"),
				isChecked = $this.is(":checked");

			// checkboxes can simply toggle
			if ( ! isRadio ) {

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
					self.$el
						.find("input[name=" + $this.attr("name") + "]")
						.closest(".checkable-field")
						.removeClass("checked");

					$this
						.closest(".checkable-field")
						.addClass("checked");
				}
			}

		};

		/**
		 * Add a class to the wrapper element so we can
		 * inform the UI visually that the input is focused.
		 *
		 * @param {Event} e
		 */
		self.inputFocused = function(e) {

			$(this)
				.closest(".checkable-field")
				.toggleClass("focused", e.type === "focusin");

		};

		self.init();
	};

	$.fn.checkable = function(options){
		return this.each(function(){
			return new $.checkable(this, options);
		});
	};

}(jQuery, window));
