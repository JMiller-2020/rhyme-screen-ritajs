var input;
var button;

var lexicon;

function setup() {
  noCanvas();
  lexicon = new RiLexicon();

  input = createInput('It was a dark and stormy night.');
  button = createButton("submit");
  // input.changed(processRita);
  button.mousePressed(processRita);
  input.size(200);
}

function processRita() {
  var s = input.value();
  var rs = new RiString(s);
  var words = rs.words();
  var pos = rs.pos();

  var output = createP("");

  for(var i = 0; i < words.length; i++) {
    if(/\w+/.test(words[i])) {
      createSpan(" ").parent(output);

      // console.log(words[i]);
      var span = createSpan(words[i]);
      span.mouseOver(highlight);
      span.mouseOut(unhighlight);
      span.mousePressed(rhymeWord);
      // console.log(span);
      span.parent(output);
    } else {
      createSpan(words[i]).parent(output);
    }
  }
}

function highlight() {
  this.style("background-color", "#ddd");
}

function unhighlight() {
  this.style("background-color", "#fff");
}

function rhymeWord() {
  var word = this.html();
  var rhymes = lexicon.rhymes(word);
  if(rhymes && rhymes.length > 0) {
    // console.log(word + ": " + rhymes);
    this.html(rhymes[Math.floor(random(rhymes.length))]);
  }
}
