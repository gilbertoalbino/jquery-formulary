## Ladies and Gentlemen!

_This plugin is currently under development.
Don't get mad at me if you find incomplete documentation or, in the worst scenario, a bug._


jQuery-formulary Plugin
================

An useful jQuery plugin to handle form validation and input tasks.

## Demos and Examples
_coming soon..._

### jQuery

In order to use this plugin you should use jQuery library.
Download is available from (http://jquery.com/download/).
Please make sure you have jQuery in your project before using this jQuery Formulary Plugin.

### Getting Started

Include the jquery.formulary.js file in your page.

```html
<script type="text/javascript" src="/YOUR-PATH-HERE/jquery.formulary.js"></script>
```

In your form input elements define some data properties to let jQuery Formulary Plugin know you want to validate something.

```html
<input type="text" name="any-name" id="any-id" data-validate="alphanumeric"> 
<select data-validate="not" data-not="0">
<option value="0">--Choose--</option>
</select>
```

##Note

__data-validate__ won't make a validation process required. If you want to make an input required, add a ___required___ to validate attribute.

```html
<input type="text" name="any-name" id="any-id" data-validate="alphanumeric required"> 
<select data-validate="not required" data-not="0">
<option value="0">--Choose--</option>
</select>
```


## License

This plugin is available under [GLP v2 license](http://www.gnu.org/licenses/gpl-2.0.html).
