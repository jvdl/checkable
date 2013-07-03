Checkable
=========

### A small custom checkbox/radio script.

It's super basic - wraps the radio buttons and checkboxes with an additional element - a span by default.

This label can then be styled as required, it will be toggled with a .checked class when the checkbox changes state.

e.g. your markup

	<div class="some-form-section">
		<label><input type="checkbox" name="cbx-apples" />   Apples</label>
		<label><input type="checkbox" name="cbx-oranges" />  Oranges</label>
	</div>

You would call checkable as follows

	$(".some-form-section").checkable();

This would result in the following markup:

	<div class="some-form-section">
		<label>
			<span class="checkable-field checkable-checkbox">
				<input type="checkbox" name="cbx-apples" />
			</span>
		   Apples
		</label>
		<label>
			<span class="checkable-field checkable-checkbox">
				<input type="checkbox" name="cbx-oranges" />
			</span>
		   Oranges
		</label>
	</div>

## Options

The following options can be passed to the plugin

	$(".some-form").checkable({
		retainFocus: true,
		wrapperElement: "span"
	}


### retainFocus
Use this option to ensure the script leaves the focus on checkboxes when they are checked. This is particularly helpful when navigating the form using the keyboard. If you were to not retain focus the next keyboard TAB would be at the first TABable element on the page, rather than the next form element.

### wrapperElement
If you'd like to use a different element than a `<span>` you can specify the tag name here.