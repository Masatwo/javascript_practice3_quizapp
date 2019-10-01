'use strict'

{
    const question = document.getElementById("question");
    const choices = document.getElementById("choices");
    const btn = document.getElementById("btn");
    const result = document.getElementById("result");
    const showScore = document.getElementById("score");
    let quizNum = 0;
    let isAnswered;
    let selected ="";
    let score = 0;
    const quizSet = [];
    
    //各クイズのクラスを設定
    class Quiz {
        constructor (question, answers) {
            this.question = question;
            this.answers = answers;
        }
    }

    //FetchAPIを使用してクイズデータを取得。async/awaitを使用して通信完了まで停止
    async function getQuizData() {
        let quizzes = await fetch('https://opentdb.com/api.php?amount=2');
        let quizData = await quizzes.json();
        return quizData;
    }

    //取得したクイズデータを問題と解答のオブジェクトの配列化
    getQuizData()
        .then((quizData) => {
            quizData.results.forEach(questionAnswers => {
                var quizInfo = new Quiz(questionAnswers.question, questionAnswers.incorrect_answers);
                quizInfo.answers.unshift(questionAnswers.correct_answer);
                quizSet.push({q: quizInfo.question, c: quizInfo.answers});
            })
            setQuiz();
        })
        .catch((error) => console.log(error));

    const setQuiz = () => {
        isAnswered = false;
        btn.classList.add('disabled');
        question.textContent = quizSet[quizNum].q;
    
        //既存の問題文を削除している
        while(choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }
    
        //forEach文でquizSetのcの要素を取り出している。
        quizSet[quizNum].c.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            choices.appendChild(li);
        });

        if(quizNum === quizSet.length - 1) {
            btn.textContent = "Show Result";
        }
    };

    //答えのチェックを行う。
    const checkAnswer = (selected) => {
        if(selected.textContent === quizSet[quizNum].c[0]){
            score ++;
        }

    }

    //選択肢をクリックしたときに選択肢とNextボタンの背景色を変更
    choices.addEventListener('click', (choice) => {
        if(isAnswered === false){
            choice.target.classList.add('selected');
            isAnswered = true;
            btn.classList.remove('disabled');
            selected = choice.target;
        }
    })

    //Nextボタンが押された時に次の問題を表示する
    btn.addEventListener('click', () => {
        if(btn.classList.contains('disabled')){
            return;
        }

        checkAnswer(selected);

        if(btn.textContent === "Show Result") {
            result.classList.remove('hidden');
            showScore.textContent = `${score} / ${quizNum+1}`;
            return;
        }
        quizNum++;
        setQuiz();
    })

}
