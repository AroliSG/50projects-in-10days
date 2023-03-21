import { CSSProperties, useState } from "react";
import faq from './json/faq.json';

type FaqTypes = {
    question: string,
    answer: string|number
}

const FaqCollapse = () => {

    const styles: {[key:string]: CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        box_container: {
            width: '300px',
            height: '100px',

        },
        box: {
            position: 'relative',

            borderRadius:10,
            paddingInline: 25,

            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        label: {
            fontSize: '1.2vw',
            fontWeight: 'bold'
        },
        questionLogo: {
            color: 'gray',
            fontSize: "2vw",
            position: "absolute",
            left: "10px",
            zIndex: 0,
            top: '5px',
        }
    }

    const Columns = (props: FaqTypes) => {
        const [getChevronAim, setChevronAim] = useState ('up')
        return (
            <div style={{
                ...styles.box,
                ...{
                    width: '550px',
                    margin: 10,
                    backgroundColor: "#5865F2",
                }
            }}>
                <i
                    style       = {styles.questionLogo}
                    className   = "fa fa-question-circle-o"
                />

                <div style={{
                    ...styles.box,
                    ...{
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        padding: 25
                    }
                }}>

                    <label style = {styles.label}>{props.question}</label>
                    <i
                        style       = {styles.label}
                        className   = {`fa fa-chevron-${getChevronAim}`}
                        onMouseDown = {evt => {
                            setChevronAim (aim => {
                                if (aim === 'up') return 'down';
                                else return "up";
                            })
                        }}
                    />
                </div>

                {getChevronAim === "down" ? <label style = {{
                    ...styles.label,
                    paddingBottom: 15,
                    fontWeight: '0'
                }}>{props.answer}</label> : null}
            </div>
        )
    }

    return (
        <div style ={styles.container}>
            <p>Faq Collapse</p>
            {faq.map (faq => <Columns question = {faq.question} answer = {faq.answer} />)}
        </div>
    )
}

export default FaqCollapse;