// const mockData = [
//    {
//       type: 'multiple',
//       difficulty: 'easy',
//       category: 'Animals',
//       question: 'What is Grumpy Cat&#039;s real name?',
//       correct_answer: 'Tardar Sauce',
//       incorrect_answers: ['Sauce', 'Minnie', 'Broccoli'],
//    },
//    {
//       type: 'multiple',
//       difficulty: 'hard',
//       category: 'Entertainment: Television',
//       question:
//          'Which actor from The Young Ones also played Lord Flashheart in one episode of Blackadder II?',
//       correct_answer: 'Rik Mayall',
//       incorrect_answers: [
//          'Adrian Edmondson',
//          'Nigel Planer',
//          'Christopher Ryan',
//       ],
//    },
//    {
//       type: 'multiple',
//       difficulty: 'medium',
//       category: 'Mythology',
//       question:
//          'Which of the following Mesopotamian mythological figures was NOT a deity?',
//       correct_answer: 'Enkidu',
//       incorrect_answers: ['Enki', 'Enlil', 'Enkimdu'],
//    },
//    {
//       type: 'boolean',
//       difficulty: 'medium',
//       category: 'Science: Computers',
//       question:
//          'All program codes have to be compiled into an executable file in order to be run. This file can then be executed on any machine.',
//       correct_answer: 'False',
//       incorrect_answers: ['True'],
//    },
//    {
//       type: 'multiple',
//       difficulty: 'medium',
//       category: 'Entertainment: Video Games',
//       question:
//          'The original mascot of the popular Nintendo game, &quot;Splatoon&quot; was going to be...',
//       correct_answer: 'Mario',
//       incorrect_answers: ['Inklings', 'Octolings', 'Zelda'],
//    },
//    {
//       type: 'multiple',
//       difficulty: 'medium',
//       category: 'Entertainment: Television',
//       question:
//          'What was the name of Ross&#039; pet monkey on &quot;Friends&quot;?',
//       correct_answer: 'Marcel',
//       incorrect_answers: ['Jojo', 'George', 'Champ'],
//    },
//    {
//       type: 'multiple',
//       difficulty: 'easy',
//       category: 'Sports',
//       question:
//          'How many soccer players should be on the field at the same time?',
//       correct_answer: '22',
//       incorrect_answers: ['20', '24', '26'],
//    },
//    {
//       type: 'multiple',
//       difficulty: 'easy',
//       category: 'Entertainment: Books',
//       question: 'What is the name of Sherlock Holmes&#039;s brother?',
//       correct_answer: 'Mycroft Holmes',
//       incorrect_answers: [
//          'Mederi Holmes',
//          'Martin Holmes',
//          'Herbie Hancock Holmes',
//       ],
//    },
//    {
//       type: 'multiple',
//       difficulty: 'hard',
//       category: 'Sports',
//       question: 'Which year was the third Super Bowl held?',
//       correct_answer: '1969',
//       incorrect_answers: ['1968', '1971', '1970'],
//    },
//    {
//       type: 'multiple',
//       difficulty: 'medium',
//       category: 'Science &amp; Nature',
//       question: 'What is the chemical formula for ammonia?',
//       correct_answer: 'NH3',
//       incorrect_answers: ['CO2', 'NO3', 'CH4'],
//    },
// ]

const mockData = [
   {
      isAnsweredTrue: false,
      question: 'What Is The Worlds Largest Hot Desert?',
      options: [
         {
            isAnswer: false,
            text: 'The Mojave',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'The Arabian',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: true,
            text: 'The Sahara ',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'The Gobi',
            isSelected: false,
            isButtonDisabled: false,
         },
      ],
      questionStatus: 'unanswered',
   },
   {
      isAnsweredTrue: false,
      question: 'What is the capital city of Norway?',
      options: [
         {
            isAnswer: false,
            text: 'Bern',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Ljubljana',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Nicosia',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: true,
            text: 'Oslo',
            isSelected: false,
            isButtonDisabled: false,
         },
      ],
      questionStatus: 'unanswered',
   },
   {
      isAnsweredTrue: false,
      question: 'Mogadishu is the capital city of which country?',
      options: [
         {
            isAnswer: false,
            text: 'Guyana',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: true,
            text: 'Somalia',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Mauritius',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'United States of America',
            isSelected: false,
            isButtonDisabled: false,
         },
      ],
      questionStatus: 'unanswered',
   },
   {
      isAnsweredTrue: false,
      question: 'With which sport is David Beckham associated?',
      options: [
         {
            isAnswer: false,
            text: 'Surfing',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Hockey',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Tennis',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: true,
            text: 'Football',
            isSelected: false,
            isButtonDisabled: false,
         },
      ],
      questionStatus: 'unanswered',
   },
   {
      isAnsweredTrue: false,
      question: 'What is the Chemical Element Pa?',
      options: [
         {
            isAnswer: true,
            text: 'Protactinium',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Potassium',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Lead',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Palladium',
            isSelected: false,
            isButtonDisabled: false,
         },
      ],
      questionStatus: 'unanswered',
   },
   {
      isAnsweredTrue: false,
      question: 'Helsinki is the capital city of which country?',
      options: [
         {
            isAnswer: true,
            text: 'Finland',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Mongolia',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Japan',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Guinea-Bissau',
            isSelected: false,
            isButtonDisabled: false,
         },
      ],
      questionStatus: 'unanswered',
   },
   {
      isAnsweredTrue: false,
      question:
         'Name The Band That Had Hits With "Freedom Of Choice" "Beatiful World" & "Working In A Coalmine"',
      options: [
         {
            isAnswer: false,
            text: 'Switchfoot',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'The Hollies',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: true,
            text: 'Devo',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Genesis',
            isSelected: false,
            isButtonDisabled: false,
         },
      ],
      questionStatus: 'unanswered',
   },
   {
      isAnsweredTrue: false,
      question:
         "What plant's oil, called urushiol, causes skin irritation when it comes into contact with human skin?",
      options: [
         {
            isAnswer: false,
            text: 'Sumac',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Jimsonweed',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Oak',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: true,
            text: 'Poison Ivy',
            isSelected: false,
            isButtonDisabled: false,
         },
      ],
      questionStatus: 'unanswered',
   },
   {
      isAnsweredTrue: false,
      question:
         'Who won the 1987 Academy Award for Best Leading Actor for playing the role of Gordon Gekko in Wall Street?',
      options: [
         {
            isAnswer: true,
            text: 'Michael Douglas',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Marcello Mastroianni',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Jack Nicholson',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'William Hurt',
            isSelected: false,
            isButtonDisabled: false,
         },
      ],
      questionStatus: 'unanswered',
   },
   {
      isAnsweredTrue: false,
      question:
         'Vegemite, a trademarked vegetable extract used as a food spread, is from which country?',
      options: [
         {
            isAnswer: false,
            text: 'New Zealand',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Ireland',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: false,
            text: 'Canada',
            isSelected: false,
            isButtonDisabled: false,
         },
         {
            isAnswer: true,
            text: 'Australia',
            isSelected: false,
            isButtonDisabled: false,
         },
      ],
      questionStatus: 'unanswered',
   },
]
export default mockData
