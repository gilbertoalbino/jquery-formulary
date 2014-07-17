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
<input type="text" name="any-name" id="any-id" data-validate="notempty"> 
<select data-validate="not" data-not="0">
<option value="0">--Choose--</option>
</select>
```

##Note

Since you define a data-validate attribute to your input it will imediately be made required once it has to block the submission to focus on that element.
But if you just want to make it required and not validate, just set __validate__ to ___required___ or use the __required__ HTML attribute. 

The __data-validate__ property does not mean a "filtering validation" by itself. It is a port to jQuery Formulary Plugin 

```html
<input type="text" name="any-name" id="any-id" data-validate="required"> 
<select data-validate="required">
<option value="0">--Choose--</option>
</select>
```


## License

This plugin is available under [GLP v2 license](http://www.gnu.org/licenses/gpl-2.0.html).
