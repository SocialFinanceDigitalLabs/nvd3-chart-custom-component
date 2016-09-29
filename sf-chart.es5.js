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
  let data = undefined
  try {
    data = JSON.parse(this.getAttribute('data'))
  } catch(e) {}
  if (this._data != data) {
    this._data = data
  }
  this.render()
}

SfChart.setData = function(data) {
  this._data = data
  this.render()
}

SfChart.render = function() {
  if (!this._data) return

  const width = this.getAttribute('width')
  const height = this.getAttribute('height')
  const type = this.getAttribute('type')
  const xAxisLabel = this.getAttribute('x-axis-label')
  const yAxisLabel = this.getAttribute('y-axis-label')

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

    chart.margin({left: 80, bottom: 50})
    chart.xAxis.axisLabel(xAxisLabel)
    chart.xAxis.tickFormat(function(d) { return el._data.buckets[d] })
    chart.yAxis.axisLabel(yAxisLabel)

    var curChart = d3.select(el).append('svg')

    curChart.datum(el._data.data)
    curChart.call(chart)
    curChart.attr('width', width)
    curChart.attr('height', height)

    addResizeListener(el.parentNode, chart.update)

    chart.update()

    return chart
  })
}

document.registerElement('sf-chart', {prototype: SfChart})
