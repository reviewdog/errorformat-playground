function run() {
  clearError();
  const efms = document.getElementById('efms').value.split('\n');
  const text = document.getElementById('text').value;
  updateQueryStrings(efms, text);
  const [result, error] = errorformat.Errorformat(efms, text);
  if (error) {
    showError(error);
    return;
  }
  const entries = JSON.parse(result);
  if (!entries) {
    return; // Empty.
  }
  document.getElementById('result').innerText = JSON.stringify(entries, null, 2);
}

function showError(error) {
    document.getElementById('error').innerText = error; 
}

function clearError() {
  document.getElementById('error').innerText = '';
}

function updateQueryStrings(efms, text) {
  let urlParams = new URLSearchParams();
  urlParams.set('efms', efms.join('\n'));
  urlParams.set('text', text);
  window.history.pushState(null, '', window.location.pathname + '?' + urlParams.toString());
}

function updateDataFromQueryStrings() {
  const urlParams = new URLSearchParams(window.location.search);
  document.getElementById('efms').value = urlParams.get('efms');
  document.getElementById('text').value = urlParams.get('text');
}

window.addEventListener('load', updateDataFromQueryStrings);
