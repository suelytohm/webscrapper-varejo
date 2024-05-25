let a = "This is another test";

function teste(str) {
  let b = str.split(" ");
  let newStr = "";
  let newWord = "";
  console.log(b);

  b.map((item) => {
    let item2 = item;
    if (item.length > 4) {
      newWord = item.split("").reverse().join("");
      item2 = newWord;
    }
    newStr += item2 + " ";
  });
  newStr = newStr.trimEnd();
  console.log(newStr);
}

teste(a);
