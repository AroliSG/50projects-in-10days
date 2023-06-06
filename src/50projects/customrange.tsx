import {CSSProperties, useEffect} from 'react';

const RANGE_WIDTH       = 200;
const RANGE_THUMB_WIDTH  = 100;

const CustomRange = () => {
    const styles: { [key: string]: CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        parent: {
            marginTop: '60%',
            width: '200px'  ,
            height: '200px',
            position: 'relative',
        },
        box: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: RANGE_THUMB_WIDTH,
            height: '25px',
            backgroundColor: 'white',
            top: '-20px',
            left: "-25%",
            borderRadius: 5,
        },
        range: {
            width: RANGE_WIDTH,
            height: '20px',
        },
        label: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'black',
            margin: 0,
            padding: 0
        }
    };

    useEffect(() => {
        const range = document.querySelector('input[type=range]') as HTMLInputElement
        const box   = document.getElementsByClassName('box') as HTMLCollectionOf <HTMLElement>;
        const label = document.getElementsByClassName('label') as HTMLCollectionOf <HTMLElement>;

        range.addEventListener('input', (e:any) => {
             const percent          = parseFloat(range.value) * RANGE_WIDTH;
            box[0].style.left       = (percent-RANGE_THUMB_WIDTH/2) + 'px';
                // changing text value
            label[0].textContent    = (parseFloat(range.value) * 100).toString ();
        });
    }, [])

    return (
        <div style={styles.container}>
            <h3>Custom Range</h3>
            <div style={styles.parent}>
                <div className = "box" style={styles.box}>
                    <p className='label' style={styles.label}>1</p>
                </div>
                <input style={styles.range} type = 'range' max={1} min={0} step={0.1} defaultValue={0}/>
            </div>
        </div>
    )
}

export default CustomRange;