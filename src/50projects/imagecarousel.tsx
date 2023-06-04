import { CSSProperties, useState } from "react";

const ImageCarousel = () => {
    const [getImageId, setImageId] = useState (0)
    const styles: { [key: string]: CSSProperties } = {
        container: {
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
        },
        img: {
            width: '500px',
            height: '500px',
            marginTop: 50,
            objectFit: 'cover',
            objectPosition: 'center',
        },
        buttonParent: {
            display: 'flex',
            gap: 10
        },
        button: {
            width: '245px',
            padding: 5
        }
    }

    return (
        <div style={styles.container}>
            <h1>Image Carousel</h1>
            <img
                alt     = "carousel"
                src     = {require(`../assets/vc_background_${getImageId}.jpg`)}
                style   = {styles.img}
            />
            <div style={styles.buttonParent}>
                <button
                    onClick={() => {
                        setImageId (ImgId => {
                            const p = ImgId-1;
                            if (p < 0) return 0;
                            return p;
                        })
                    }}
                    style={styles.button}
                >prev</button>

                <button
                    onClick={() => {
                        setImageId (ImgId => {
                            const n = ImgId+1;
                            if (n > 4) return 4;
                            return n;
                        })
                    }}
                    style={styles.button}
                >next</button>
            </div>

        </div>
    )
}

export default ImageCarousel;