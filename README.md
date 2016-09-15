# NVD3 Chart Custom Component
This is a web component library for creating NVD3 charts.

## Screenshot
![Screenshot of NVD3 Custom Component](https://i.imgur.com/gM5VPOo.png)

## Examples
Take a look at the `index.html` file for a working example. Just clone this repository and open the file in your web browser.

## Include
Include NVD3 into your web page. The below example uses a CDN:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.4/nv.d3.min.css" type="text/css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.4/nv.d3.min.js"></script>
```

Then include the sf-chart:
```html
<script src="sf-chart.js"></script>
```

## Usage
Now anywhere in your document you can create a new `sf-chart` element:
```html
<sf-chart id="example1" type="bar" width="100%" height="100%"></sf-chart>
```

You then feed it data via a script like below:

```javascript
const example1 = document.getElementById('example1')
example1.data = [{
  key: 'First Series',
  values: [{ 
    label: 'A Label' ,
    value: 1
  }, {...
```

## Legacy Browser Support
Some older browsers don't support [CustomElements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements).
In this case you should include the polyfil below:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.22/CustomElements.min.js"></script>
```
