import axios from 'axios';
import {
    useEffect,
    useState,
    CSSProperties
} from 'react';

const api = "https://opentdb.com/api.php?amount=10";

type quizType = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[] | string;
    question: string
    type: string;
} [];

const QuizApp = () => {
    const [getQuizList, setQuizList]            = useState <quizType> ();
    const [getCountId, setCountId]              = useState (0);
    const [getListAnswered, setListAnswered]    = useState ([]);
    const [getLoadingState, setLoadingState]    = useState (0);

    useEffect(() => {
        setLoadingState (0);
        (async () => {
            const quiz  = await axios.get (api);
            const dt    = quiz.data.results;

            setQuizList (dt);
            setLoadingState (1);
        }) ();

    },[]);

    const Answers = () => {
        if (Array.isArray (getQuizList![1].incorrect_answers)) {
            const quiz = getQuizList![1].incorrect_answers;

                // merging all answers together
            if (Array.isArray (getQuizList![1].correct_answer)) quiz.concat(getQuizList![1].correct_answer);
            else quiz.push (getQuizList![1].correct_answer);

            return (
                <div>
                    {
                        quiz
                            .sort ()
                            .map (answer => (
                                <div style = {styles.answerParent} key = {answer}>

                                    <input type="checkbox" style={styles.checkbox} />
                                    <p style={styles.answersLabel}>{answer}</p>

                                </div>
                            )
                        )
                    }
                </div>
            )
        }

        return null;
    }

    return (
        <div style = {styles.container}>
            {getLoadingState === 1 ?

                <div style={styles.box}>

                    <p style = {styles.counter}>{getCountId}/10</p>
                    <p style = {styles.questions}>{getQuizList![1].question}</p>
                    <Answers />

                </div>

            : <h2>Loading your trivia quizzes</h2>}
        </div>
    )
};

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    box: {
        height: "700px",
        width: "700px",
        backgroundColor: "white",
        marginTop: "50px",
        borderRadius: "5px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
    },
    counter: {
        fontSize: '20px',
        color: "gray",
        position: "absolute",
        top: "0%",
        left: "45%",
        fontWeight: "bold"
    },
    questions: {
        fontSize: '25px',
        color: "black",
        fontWeight: "bold",
        marginTop: "75px",
        width: "70%",
        alignSelf: "center"
    },
    answersLabel: {
        fontSize: '20px',
        color: "gray",
        fontWeight: "bold",
        paddingLeft: "20px"
    },
    answerParent: {
        display: "flex",
        marginLeft: "100px"
    },
    checkbox: {
 
    }
}

export default QuizApp;