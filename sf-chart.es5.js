var SfChart = Object.create(HTMLElement.prototype)

SfChart.createdCallback = function() {

  Object.defineProperty(this, 'data', {
    get: function() {return this._data},
    set: function(newData) {
      this._data = newData
      this.render()
    }
  })
  this.render()
}

SfChart.attributeChangedCallback = function() {
  this.render()
}

SfChart.setData = function(data) {
  this._data = data
  this.render()
}

SfChart.render = function() {
  if (!this._data) return;

  const width = this.getAttribute('width')
  const height = this.getAttribute('height')
  const type = this.getAttribute('type')

  const el = this
  el.innerHTML = ''
  nv.addGraph(function() {
    var chart
    if (type === 'line' || type === 'dots') {
      chart = nv.models.lineChart()
      chart.useInteractiveGuideline(true)
      chart.x(function(d) { return d[0] })
      chart.y(function(d) { return d[1] })
    } else {
      chart = nv.models.multiBarChart()
      chart.showControls(false)
      if (type === 'bar-stacked') chart.stacked(true)
      chart.x(function(d) { return d[0] })
      chart.y(function(d) { return d[1] })
    }

    var curChart = d3.select(el).append('svg')

    curChart.datum(el._data.data)
    curChart.call(chart)
    curChart.attr('width', width)
    curChart.attr('height', height)

    nv.utils.windowResize(chart.update)

    addResizeListener(el.parentNode, chart.update)

    chart.update()

    return chart
  })
}

document.registerElement('sf-chart', {prototype: SfChart})
