// see: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/
const MARKED_NAME = [];
let countMark = 0;
const pNow = performance.now();
document.getElementById('p-now').innerText = pNow;

// mark
const elMarkList = document.getElementById('mark-list');
document.getElementById('btn-mark')
  .addEventListener('click', function() {
    const mn = 'MARK_' + ++countMark;
    MARKED_NAME.push(mn);
    if (MARKED_NAME.length > 2) {
      MARKED_NAME.shift();
    }
    performance.mark(mn);
    const li = document.createElement('li');
    li.innerText = `${mn}: ${performance.now()}`;
    elMarkList.appendChild(li);
  });
document.getElementById('btn-mark-data')
  .addEventListener('click', function() {
    document.getElementById('mark-data')
      .innerText = JSON.stringify(performance.getEntriesByType('mark'), null, 2);
  });


// measure
const MEASURE_ONE = 'MEASURE_ONE';
const elMeasureList = document.getElementById('measure-list');
document.getElementById('btn-measure')
  .addEventListener('click', function() {
    const mn = 'MEASURE_' + countMark;
    performance.measure.apply(performance, [ mn ].concat(MARKED_NAME));
    const li = document.createElement('li');
    li.innerText = mn + '[' + MARKED_NAME.join(',') + '] :' + performance.now();
    elMeasureList.appendChild(li);
  });
document.getElementById('btn-measure-data')
  .addEventListener('click', function() {
    document.getElementById('measure-data')
      .innerText = JSON.stringify(performance.getEntriesByType('measure'), null, 2);
  });


// getEntriesByName
document.getElementById('btn-entry-mark')
  .addEventListener('click', function() {
    if (MARKED_NAME.length) {
      const last = MARKED_NAME[MARKED_NAME.length - 1];
      const items = window.performance.getEntriesByName(last);
      document.getElementById('data')
        .innerText = JSON.stringify(items, null, 2);
    }
  });
document.getElementById('btn-entry-measure')
  .addEventListener('click', function() {
    const items = window.performance.getEntriesByName('MEASURE_' + countMark);
    document.getElementById('data')
      .innerText = JSON.stringify(items, null, 2);
  });


