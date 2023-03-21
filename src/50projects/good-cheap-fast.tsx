import { CSSProperties, useEffect, useRef, useState } from "react"

type switchProps = {
    enabled?: boolean;
    onThumbClicked?: () => void;
    width?: number|string;
    height?: number|string;
    borderRadius?: number;
    thumbColor?: string;
    trackColor?: string;
    label?: string;
}

const styles:{[key:string]:CSSProperties} = {
    container: {
        position: 'relative',
        display: 'flex',
        borderRadius: '5px',
        backgroundColor: 'green',
        width: '100px',
        padding: '5px',
        transitionDuration: '3s',
        margin: 5
    },
    thumb: {
        width: '50px',
        height: '50px',
        backgroundColor: "white",
        borderRadius: '5px',
        transitionDuration: '2s',
        pointerEvents: 'none'
    },
    switchLabel: {
        position: 'absolute',
        margin: 0,
        right: '-150%'
    },
    switch_container: {
        display: 'flex',
        flexDirection: 'row',
    }
}

const Switch = (props: switchProps) => {
    const ref = useRef <HTMLDivElement> (null);
    const {
        onThumbClicked,
        enabled,
        height,
        width,
        borderRadius,
        thumbColor,
        trackColor,
        label
    } = props;

    useEffect (() => {
        const style = ref.current?.style;

        if (enabled) style!.transform = 'translateX(100%)';
        else style!.transform = 'translateX(0%)';
    }, [enabled]);

        // @ts-ignore
    const widthToNumber     = parseInt (width ?? 0, 10);
    const parentStyle       = width ? {height,width: (widthToNumber * 2)} : null;
    const childStyle        = width ? {height,width} : null;

    return (
        <div
            onClick     = {onThumbClicked}
            style       = {{
                ...styles.container,
                ...parentStyle,
                borderRadius: borderRadius!==undefined?borderRadius:styles.container.borderRadius,
                backgroundColor: trackColor?trackColor:styles.container.backgroundColor
            }}
        >
            <div
                ref       = {ref}
                className = "switch-thumb-:)"
                style     = {{
                    ...styles.thumb,
                    ...childStyle,
                    borderRadius: borderRadius!==undefined?borderRadius:styles.thumb.borderRadius,
                    backgroundColor: thumbColor?thumbColor:styles.thumb.backgroundColor
                }}
            />
            {label? <p style = {{
                ...styles.switchLabel,
                color: trackColor?trackColor:styles.container.backgroundColor
            }}>{label}</p>:null}
        </div>
    )
}

const GoodCheapFast = () => {
    const [fastState, setFastState]     = useState (false);
    const [cheapState, setCheapState]   = useState (false);
    const [goodState, setGoodState]     = useState (false);

    return (
        <div style = {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <p>Good, Cheap And Fast</p>
            <p>How would you like your app be build</p>
            <Switch
                label          = "Fast"
                height         = {30}
                width          = {30}
                borderRadius   = {50}
                thumbColor     = {fastState ? 'white' : 'gray'}
                trackColor     = {fastState ? 'green' : 'white'}
                enabled        = {fastState}
                onThumbClicked = {() => {
                    setFastState (state => !state)
                }}
            />
            <Switch
                label          = "Cheap"
                height         = {30}
                width          = {30}
                borderRadius   = {50}
                thumbColor     = {cheapState ? 'white' : 'gray'}
                trackColor     = {cheapState ? 'green' : 'white'}
                enabled        = {cheapState}
                onThumbClicked = {() => {
                    setCheapState (state => !state)
                }}
            />
            <Switch
                label          = "Good"
                height         = {30}
                width          = {30}
                borderRadius   = {50}
                thumbColor     = {goodState ? 'white' : 'gray'}
                trackColor     = {goodState ? 'green' : 'white'}
                enabled        = {goodState}
                onThumbClicked = {() => {
                    setGoodState (state => !state)
                }}
            />
        </div>
    )
}

export default GoodCheapFast;