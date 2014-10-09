var _ = require('lodash');

// ------------------------------------------------------------------
// Word To Number Converter
// ------------------------------------------------------------------

// Convert numbers to words
// copyright 25th July 2006, by Stephen Chapman http://javascript.about.com
// permission to use this Javascript on your web page is granted
// provided that all of the code (including this copyright notice) is
// used exactly as shown (you can change the numbering system if you wish)

// American Numbering System
var th = ['','thousand','million', 'billion','trillion'];
var dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine'];
var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen'];
var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
function toWords(s){s = s.toString(); s = s.replace(/[\, ]/g,''); if (s != parseFloat(s)) return 'not a number'; var x = s.indexOf('.'); if (x == -1) x = s.length; if (x > 15) return 'too big'; var n = s.split(''); var str = ''; var sk = 0; for (var i=0; i < x; i++) {if ((x-i)%3==2) {if (n[i] == '1') {str += tn[Number(n[i+1])] + ' '; i++; sk=1;} else if (n[i]!=0) {str += tw[n[i]-2] + ' ';sk=1;}} else if (n[i]!=0) {str += dg[n[i]] +' '; if ((x-i)%3==0) str += 'hundred ';sk=1;} if ((x-i)%3==1) {if (sk) str += th[(x-i-1)/3] + ' ';sk=0;}} if (x != s.length) {var y = s.length; str += 'point '; for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';} return str.replace(/\s+/g,' ');}


// ------------------------------------------------------------------
// Program
// ------------------------------------------------------------------


function stringify(array, delim) {
  delim = delim || ' ';
  return array.join(delim);
}

function pluralize(word, number) {
  return word + (number > 1 ? 's' : '');
}

function ucfirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function bottlesOfBeer(number) {
  return _.chain([])
          .push(stringify(
            [number, pluralize('bottle', number), 'of beer on the wall']
          ))
          .push(stringify(
            [number, pluralize('bottle', number), 'of beer']
          ))
          .push('Take one down, pass it around')
          .tap(function(lyric) {
            number = number -1;
            if (number === 0) {
              lyric.push('No more bottles of beer on the wall');
            } else {
              lyric.push(stringify(
                [number, pluralize('bottle', number), 'of beer on the wall']
              ))
            }
          })
          .value();
}

function littleMonkeys(number) {
  return _.chain([])
          .push(stringify(
            [ucfirst(toWords(number)), 'little', pluralize('monkey', number), 'jumping on the bed.']
          ))
          .push('One fell off and broke his head.')
          .push('Mama called the doctor and the doctor said,')
          .push('"No more little monkeys jumping on the bed!')
          .value();
}

function createSong(range, lyricCreator) {
  return stringify(_.reduce(range, function(lyrics, number) {
    return lyrics.concat(lyricCreator(number));
  }, []), '\n');
}


var bottlesOfBeerSong = createSong(_.range(99, 0, -1), bottlesOfBeer);
var littleMonkeysSong = createSong(_.range(10, 0, -1), littleMonkeys);

console.log(bottlesOfBeerSong);
console.log('----------------------');
console.log(littleMonkeysSong);