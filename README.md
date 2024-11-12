# Responsive-Quiz-Application
An engaging, responsive quiz application that presents users with multiple-choice questions fetched from the Open Trivia Database API.
The application offers instant feedback on answers, tracks scores, includes a countdown timer, and maintains the highest score using local storage.

Features:
1.Responsive Design: Optimized for both mobile and desktop views.
2.Multiple-choice Quiz: Displays questions one by one, with multiple answers to choose from.
3.Immediate Feedback: Shows if the selected answer is correct or incorrect.
4.Progress Indicator: Keeps track of the current question number.
5.Score Calculation: Displays the final score as a percentage at the end of the quiz.
6.Countdown Timer: A 15-second timer for each question, automatically proceeding when time expires.
7.High Score Tracking: Saves and displays the highest score using local storage.
8.Restart Option: Allows users to restart the quiz after completing it.


Technologies Used:
HTML/CSS/JavaScript

1.Fetch API: Retrieves quiz questions from the Open Trivia Database API.
2.Local Storage: Stores and retrieves the highest score across sessions.



Usage
1.The quiz application will fetch 5 multiple-choice questions from the Open Trivia Database API.
2.Answer each question by selecting one of the multiple-choice options.
3.Timer: A 15-second timer counts down for each question, after which the quiz automatically moves to the next question if time runs out.
4.Progress: Track your progress with the question indicator at the top.
5.Feedback: After selecting an answer, immediate feedback will indicate whether your answer is correct or incorrect.
6.Final Score and High Score: At the end of the quiz, your score is shown along with the highest score, which is saved in local storage.
7.Restart: Use the "Restart Quiz" button to attempt the quiz again.


Code Structure
1.index.html: HTML structure of the application.
2.style.css: Styles for layout, colors, and responsive design.
3.script.js: JavaScript functionality for fetching data, handling user interactions, and storing high scores.
