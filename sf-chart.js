var SfChart = Object.create(HTMLElement.prototype)

SfChart.createdCallback = function() {

  Object.defineProperty(this, 'data', {
    get: () => this._data,
    set: (newData) => {
      this._data = newData
      this.render()
    }
  })

  this.render()
}

SfChart.attributeChangedCallback = function() {
  this.render()
}

SfChart.render = function() {
  if (!this.data) return;

  const width = this.getAttribute('width')
  const height = this.getAttribute('height')
  const type = this.getAttribute('type')

  const el = this
  el.innerHTML = ''
  nv.addGraph(() => {
    let chart
    if (type === 'line') {
      chart = nv.models.lineChart()
      chart.useInteractiveGuideline(true)
      chart.x(d => d[0])
      chart.y(d => d[1])
    } else {
      chart = nv.models.multiBarChart()
      chart.showControls(false)
      if (type === 'stacked') chart.stacked(true)
      chart.x(d => d.label)
      chart.y(d => d.value)
    }

    let curChart = d3.select(el).append('svg')

    curChart.datum(this.data)
    curChart.call(chart)
    curChart.attr('width', width)
    curChart.attr('height', height)

    nv.utils.windowResize(chart.update)

    addResizeListener(this.parentNode, chart.update)

    chart.update()

    return chart
  })
}

document.registerElement('sf-chart', {prototype: SfChart})
