const story = [


"困ったときは一人で抱えないでね",

"合理的配慮って知ってる？",

"相談することで働きやすくなるよ",

"チームワーク成功！",

"困ったら相談窓口へ！"

];

let storyStep = 0;

function nextStory(){

storyStep++;

if(storyStep >= story.length){

document.getElementById("message").textContent =
"困ったら相談窓口へ。";

return;

}

document.getElementById("message").textContent =
story[storyStep];

}