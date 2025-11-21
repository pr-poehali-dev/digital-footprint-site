import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const tips = [
  {
    icon: 'Shield',
    title: 'Используй сильные пароли',
    description: 'Создавай уникальные пароли для каждого сайта. Используй буквы, цифры и спецсимволы.',
    color: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  {
    icon: 'Eye',
    title: 'Настрой приватность',
    description: 'Проверь настройки конфиденциальности в соцсетях. Ограничь доступ к личной информации.',
    color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    icon: 'MessageCircle',
    title: 'Думай перед публикацией',
    description: 'Всё, что ты публикуешь в интернете, может остаться там навсегда. Проверяй дважды!',
    color: 'bg-gradient-to-br from-orange-500 to-red-500'
  },
  {
    icon: 'Lock',
    title: 'Будь осторожен с личными данными',
    description: 'Не публикуй адрес, номер телефона или данные документов в открытом доступе.',
    color: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  {
    icon: 'Search',
    title: 'Проверяй свой цифровой след',
    description: 'Регулярно гугли своё имя и удаляй ненужную информацию о себе.',
    color: 'bg-gradient-to-br from-yellow-500 to-orange-500'
  },
  {
    icon: 'UserX',
    title: 'Не доверяй незнакомцам',
    description: 'В интернете люди могут быть не теми, за кого себя выдают. Будь бдителен!',
    color: 'bg-gradient-to-br from-red-500 to-pink-500'
  }
];

const quizQuestions = [
  {
    question: 'Что такое цифровой след?',
    options: [
      'Следы от пальцев на экране',
      'Информация о тебе в интернете',
      'Программа для шпионажа',
      'Вирус на компьютере'
    ],
    correct: 1
  },
  {
    question: 'Безопасно ли использовать один пароль для всех сайтов?',
    options: [
      'Да, так удобнее',
      'Нет, это очень опасно',
      'Только для социальных сетей',
      'Только если пароль сложный'
    ],
    correct: 1
  },
  {
    question: 'Что делать, если незнакомец просит твои личные данные?',
    options: [
      'Сразу отправить всё',
      'Отправить только имя',
      'Игнорировать и сообщить взрослым',
      'Попросить его данные в обмен'
    ],
    correct: 2
  },
  {
    question: 'Можно ли полностью удалить информацию из интернета?',
    options: [
      'Да, всегда легко',
      'Нет, это невозможно',
      'Сложно, но иногда возможно',
      'Только если заплатить'
    ],
    correct: 2
  },
  {
    question: 'Какой пароль самый надёжный?',
    options: [
      '12345678',
      'password',
      'Мой день рождения',
      'R8$mK#p2Qw9@'
    ],
    correct: 3
  }
];

export default function Index() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }, 500);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizStarted(false);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
  };

  const getResultMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return 'Невероятно! Ты эксперт цифровой безопасности! 🏆';
    if (percentage >= 80) return 'Отлично! Ты хорошо разбираешься в цифровой безопасности! 🌟';
    if (percentage >= 60) return 'Хорошо! Но есть куда расти. Перечитай советы! 👍';
    if (percentage >= 40) return 'Неплохо, но нужно больше узнать о безопасности! 📚';
    return 'Стоит изучить основы цифровой безопасности! 💡';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12 md:mb-20 animate-fade-in">
          <div className="inline-block mb-6 p-4 bg-white rounded-full shadow-lg animate-bounce-in">
            <Icon name="Fingerprint" size={48} className="text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent leading-tight">
            Твой Цифровой След
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Всё, что ты делаешь в интернете, оставляет след. Узнай, как защитить себя! 🚀
          </p>
        </div>

        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800 flex items-center justify-center gap-3">
            <Icon name="Lightbulb" size={36} className="text-yellow-500" />
            Полезные советы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {tips.map((tip, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden border-2 border-transparent hover:border-primary animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${tip.color} p-6 flex items-center justify-center`}>
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Icon name={tip.icon as any} size={40} className="text-gray-800" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto animate-slide-up">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-3">
              <Icon name="Brain" size={36} className="text-purple-600" />
              Проверь свои знания
            </h2>
            <p className="text-lg text-gray-600">
              Пройди тест и узнай, насколько хорошо ты разбираешься в цифровой безопасности!
            </p>
          </div>

          <Card className="p-6 md:p-10 shadow-2xl border-4 border-purple-200 bg-white">
            {!quizStarted ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="mb-6">
                  <Icon name="Trophy" size={64} className="text-yellow-500 mx-auto animate-bounce-in" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Готов начать?</h3>
                <p className="text-gray-600 mb-8">
                  Тебя ждёт {quizQuestions.length} вопросов о цифровой безопасности
                </p>
                <Button
                  onClick={() => setQuizStarted(true)}
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all"
                >
                  <Icon name="Play" size={24} className="mr-2" />
                  Начать тест
                </Button>
              </div>
            ) : !showResult ? (
              <div className="animate-fade-in">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-600">
                      Вопрос {currentQuestion + 1} из {quizQuestions.length}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      Правильных: {score}
                    </span>
                  </div>
                  <Progress 
                    value={((currentQuestion + 1) / quizQuestions.length) * 100} 
                    className="h-3"
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-gray-800">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => setSelectedAnswer(parseInt(val))}>
                  <div className="space-y-4">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer hover:shadow-lg ${
                          selectedAnswer === index
                            ? 'border-primary bg-primary/10 shadow-md'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedAnswer(index)}
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer text-base md:text-lg font-medium"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <Button
                  onClick={handleAnswer}
                  disabled={selectedAnswer === null}
                  size="lg"
                  className="w-full mt-8 text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transform hover:scale-105 transition-all"
                >
                  {currentQuestion < quizQuestions.length - 1 ? (
                    <>
                      Следующий вопрос
                      <Icon name="ChevronRight" size={24} className="ml-2" />
                    </>
                  ) : (
                    <>
                      Показать результат
                      <Icon name="Award" size={24} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 animate-fade-in">
                <div className="mb-6">
                  <Icon 
                    name={score === quizQuestions.length ? "Trophy" : score >= 3 ? "Award" : "Target"} 
                    size={80} 
                    className={`mx-auto ${score === quizQuestions.length ? 'text-yellow-500' : score >= 3 ? 'text-purple-600' : 'text-orange-500'} animate-bounce-in`}
                  />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Тест завершён!</h3>
                <p className="text-xl mb-6 text-gray-700">{getResultMessage()}</p>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-8">
                  <p className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text mb-2">
                    {score} / {quizQuestions.length}
                  </p>
                  <p className="text-gray-600 font-semibold">Правильных ответов</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={restartQuiz}
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all"
                  >
                    <Icon name="RotateCcw" size={24} className="mr-2" />
                    Пройти ещё раз
                  </Button>
                  <Button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 border-2 border-primary hover:bg-primary/10 transform hover:scale-105 transition-all"
                  >
                    <Icon name="ArrowUp" size={24} className="mr-2" />
                    К советам
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </section>

        <footer className="mt-16 md:mt-24 text-center pb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 text-gray-600 text-sm md:text-base">
            <Icon name="Heart" size={20} className="text-red-500" />
            <span>Береги себя в цифровом мире!</span>
            <Icon name="Shield" size={20} className="text-green-500" />
          </div>
        </footer>
      </div>
    </div>
  );
}
