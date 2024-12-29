export const quizABI = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quizId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "questionIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isCorrect",
				"type": "bool"
			}
		],
		"name": "AnswerSubmitted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_questionTexts",
				"type": "string[]"
			},
			{
				"internalType": "string[4][]",
				"name": "_options",
				"type": "string[4][]"
			},
			{
				"internalType": "uint8[]",
				"name": "_correctOptions",
				"type": "uint8[]"
			},
			{
				"internalType": "uint256",
				"name": "_reward",
				"type": "uint256"
			}
		],
		"name": "createQuiz",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quizId",
				"type": "uint256"
			}
		],
		"name": "deactivateQuiz",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quizId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "QuizCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quizId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_questionIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_answer",
				"type": "uint8"
			}
		],
		"name": "submitAnswer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllQuizzes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "questionText",
								"type": "string"
							},
							{
								"internalType": "string[4]",
								"name": "options",
								"type": "string[4]"
							},
							{
								"internalType": "uint8",
								"name": "correctOption",
								"type": "uint8"
							}
						],
						"internalType": "struct MultiQuestionQuiz.Question[]",
						"name": "questions",
						"type": "tuple[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					}
				],
				"internalType": "struct MultiQuestionQuiz.Quiz[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			}
		],
		"name": "getQuizzesByCategory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "questionText",
								"type": "string"
							},
							{
								"internalType": "string[4]",
								"name": "options",
								"type": "string[4]"
							},
							{
								"internalType": "uint8",
								"name": "correctOption",
								"type": "uint8"
							}
						],
						"internalType": "struct MultiQuestionQuiz.Question[]",
						"name": "questions",
						"type": "tuple[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					}
				],
				"internalType": "struct MultiQuestionQuiz.Quiz[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getQuizzesByUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "questionText",
								"type": "string"
							},
							{
								"internalType": "string[4]",
								"name": "options",
								"type": "string[4]"
							},
							{
								"internalType": "uint8",
								"name": "correctOption",
								"type": "uint8"
							}
						],
						"internalType": "struct MultiQuestionQuiz.Question[]",
						"name": "questions",
						"type": "tuple[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					}
				],
				"internalType": "struct MultiQuestionQuiz.Quiz[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quizId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasParticipated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "quizCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "quizzes",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userScores",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const quizABI2 = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quizId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "questionIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isCorrect",
				"type": "bool"
			}
		],
		"name": "AnswerSubmitted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_questionTexts",
				"type": "string[]"
			},
			{
				"internalType": "string[4][]",
				"name": "_options",
				"type": "string[4][]"
			},
			{
				"internalType": "uint8[]",
				"name": "_correctOptions",
				"type": "uint8[]"
			},
			{
				"internalType": "uint256",
				"name": "_reward",
				"type": "uint256"
			}
		],
		"name": "createQuiz",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quizId",
				"type": "uint256"
			}
		],
		"name": "deactivateQuiz",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quizId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"name": "QuizCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quizId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_questionIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_answer",
				"type": "uint8"
			}
		],
		"name": "submitAnswer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllQuizzes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "questionText",
								"type": "string"
							},
							{
								"internalType": "string[4]",
								"name": "options",
								"type": "string[4]"
							},
							{
								"internalType": "uint8",
								"name": "correctOption",
								"type": "uint8"
							}
						],
						"internalType": "struct MultiQuestionQuiz.Question[]",
						"name": "questions",
						"type": "tuple[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					}
				],
				"internalType": "struct MultiQuestionQuiz.Quiz[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_category",
				"type": "string"
			}
		],
		"name": "getQuizzesByCategory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "questionText",
								"type": "string"
							},
							{
								"internalType": "string[4]",
								"name": "options",
								"type": "string[4]"
							},
							{
								"internalType": "uint8",
								"name": "correctOption",
								"type": "uint8"
							}
						],
						"internalType": "struct MultiQuestionQuiz.Question[]",
						"name": "questions",
						"type": "tuple[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					}
				],
				"internalType": "struct MultiQuestionQuiz.Quiz[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getQuizzesByUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "questionText",
								"type": "string"
							},
							{
								"internalType": "string[4]",
								"name": "options",
								"type": "string[4]"
							},
							{
								"internalType": "uint8",
								"name": "correctOption",
								"type": "uint8"
							}
						],
						"internalType": "struct MultiQuestionQuiz.Question[]",
						"name": "questions",
						"type": "tuple[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "reward",
						"type": "uint256"
					}
				],
				"internalType": "struct MultiQuestionQuiz.Quiz[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_quizId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserTotalScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hasParticipated",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "quizCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "quizzes",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "category",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "reward",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalScores",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userScores",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]