var DEFAULT_ROW_COUNT = 5;
var DEFAULT_COL_COUNT = 6;
var DEFAULT_SELECT_FUNCTION = selectRow;

// buduje tabele zadanej wielkości
function tableBuild(row, col) {
  var tabela = document.getElementById('tab');
  for (var r = 0; r < row; r++) {
    var elRow = document.createElement('tr');
    for (var c = 0; c < col; c++) {
      var elCol = document.createElement('td');
      var textCol = document.createTextNode(r*col+c+1);
      elCol.appendChild(textCol);
      elRow.appendChild(elCol);
    }
    tabela.appendChild(elRow);
  }
}

// usuwa tabele
function tableRemove() {
  $('tr').remove();
}

// zaznacza cały wiersz
function selectRow() {
  var row = this.parentNode.childNodes;
  for (var i = 0; i < row.length; i++) {
    if (row[i].id.includes('hov')) {
      row[i].id = '';
    }
    else {
      row[i].id += 'hov';
    }
  }
}

// zaznacza tylko komórkę
function selectCell() {
  if (this.id.includes('hov')) {
    this.id = '';
  }
  else {
    this.id += 'hov';
  }
}


// function whichChild(el) {
//   var count = 0;
//   while (el.previousSibling) {
//     count++;
//   }
//   return count;
// }

// wybór które eventy zostaną podłączone
function selectBy() {
  var selected = $("input[name=select]:checked")[0];
  if (selected.length === 0) {
    console.log("nothing selected");
  }
  else {
    switch (selected.value) {
      case 'Row':
        clearAll();
        clearEvents();
        allTdEvents(selectRow);
        break;
      case 'Cell':
        clearAll();
        clearEvents();
        allTdEvents(selectCell);
        break;
      default:
        console.log(selected.value);
    }
  }
}

// czyści całą tabele z oznaczeń
function clearAll() {
  var tds = document.getElementsByTagName('td');
  for (var i = 0; i < tds.length; i++) {
    tds[i].id = '';
  }
}

// czyści całą tabele z eventów
function clearEvents() {
  var tds = document.getElementsByTagName('td');
  for (var i = 0; i < tds.length; i++) {
    tds[i].removeEventListener('click', selectRow);
    tds[i].removeEventListener('click', selectCell);
  }
}

// podłącza eventy do pól
function allTdEvents(selectFunction) {
  var tds = document.getElementsByTagName('td');
  for (var i = 0; i < tds.length; i++) {
    tds[i].addEventListener('click', selectFunction);
  }
}


function selectListener() {
  var radios = $("input[name=select]");
  radios.change(function() {
    selectBy();
  });
}

// uaktualnianie wielkości tabeli
function updateButton() {
  var button = $("input[type=button]")[0];
  button.addEventListener('click', function () {
    var rows = parseInt($("input[type=text][name=rows]")[0].value);
    var cols = parseInt($("input[type=text][name=cols]")[0].value);
    if (rows >= 1 && cols >= 1 && Number.isInteger(rows) && Number.isInteger(cols)) {
      console.log('bang');
      $("div.error").html("");
    }
    // else if (Number.isInteger(rows) && Number.isInteger(cols)) {
    //
    // }
    else {
      $("div.error").html("Type only numbers, both greater then 0");
    }
    tableRemove();
    tableBuild(parseInt(rows), parseInt(cols));
    allTdEvents(DEFAULT_SELECT_FUNCTION);
  });
}

// odpalanie po załadowaniu strony
document.addEventListener("DOMContentLoaded", function() {
  tableBuild(DEFAULT_ROW_COUNT, DEFAULT_COL_COUNT);
  allTdEvents(DEFAULT_SELECT_FUNCTION);
  selectListener();
  updateButton();
});
