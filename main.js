const questionDesc = document.getElementById('question-desc');
const answerArea = document.getElementById('answer-area');

fetch('https://opentdb.com/api.php?amount=10')
 .then(response => response.json())
 .then(data => {
 	//問題文の取得
  	const question = data.results.map(item => item.question);

  	//間違った答え(ダミー選択肢)を取得
  	const incorrectAnswers = data.results.map(item => item.incorrect_answers);

  	//正解の答えを取得
  	const correctAnswer = data.results.map(item => item.correct_answer);

  	//正解数を判別するための配列
  	const playerAnswer = [];

  	//ダミーの選択肢と正解の選択肢を結合した配列
  	const answers = [];

  	//ダミーの選択肢と正解の選択肢を結合する処理
  	for(num = 0; num < correctAnswer.length; num++){
  		answers.push(incorrectAnswers[num].concat(correctAnswer[num]));	
  	}

  	let i = 0;
  	
  	console.log(answers);

  	function quiz(){
  		//問題に全て答えていない時の処理
		if(data.results.length > i){
				questionDesc.innerHTML = question[i];
		  		answers[i].forEach(item =>{
		  		let button = document.createElement('button');
		  		button.innerHTML = item;
				answerArea.appendChild(button);
				button.addEventListener('click', function(){

					//クリックした選択肢の値を取得
					const ansewer = this.innerHTML;

					//配列に追加
					playerAnswer.push(ansewer);

					//不要な選択肢の削除
					answerArea.textContent = '';
					i++;
					quiz();
				});
	  		});
	  	}

	  	//問題に答え終わった後の処理
	  	else{
	  		//正解した問題数を代入する変数
	  		let yes = 0;

	  		//不正解の問題数を代入する変数
	  		let no = 0;

	  		for(i = 0; i < playerAnswer.length; i++){
	  			if(playerAnswer[i] == correctAnswer[i]){
	  				yes++;
	  			}
	  			else{
	  				no++;
	  			}
	  		}
	  		questionDesc.innerHTML = `正解した問題は${yes}問です。不正解の問題は${no}問です。`
	  	}
  	}
  	quiz();
 });
