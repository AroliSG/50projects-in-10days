import { CSSProperties } from "react";

const StickyBar = () => {
    const styles: {[key:string]:CSSProperties} = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100vw'
        },
        nav: {
            display: 'flex',
            position: 'sticky',
            width: '100%',
            top: 0,
            backgroundColor: "#5865F2",
            padding: 10,
            justifyContent: 'space-evenly'
        },
        img: {
            width: '100%'
        },
        label: {
            margin:5,
            fontSize: '1vw'
        },
        body: {
            fontSize: '1.5vw',
            width: '70%'
        }
    }

    return (
        <div style = {styles.container}>
            <p>Sticky Nav</p>
            <nav style = {styles.nav}>
                <p style={styles.label}>Home</p>
                <div style = {{
                    display: 'flex'
                }}>
                    <p style={styles.label}>Docs</p>
                    <p style={styles.label}>Privacy</p>
                    <p style={styles.label}>Pricing</p>
                    <p style={styles.label}>Support</p>
                </div>
            </nav>
            <img
                alt     = 'sticky-nav'
                style   = {styles.img}
                src     ={ require ('../assets/vc_background_3.jpg')}
            />
            <div style = {styles.body}>
                <p>Content 1</p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione dolorem voluptates eveniet tempora ut cupiditate magnam, sapiente, hic quo in ipsum iste soluta eaque perferendis nihil recusandae dolore officia aperiam corporis similique. Facilis quos tempore labore totam! Consectetur molestiae iusto ducimus error reiciendis aspernatur dolor, modi dolorem sit architecto, voluptate magni sunt unde est quas? Voluptates a dolorum voluptatum quo perferendis aut sit. Aspernatur libero laboriosam ab eligendi omnis delectus earum labore, placeat officiis sint illum rem voluptas ipsum repellendus iste eius recusandae quae excepturi facere, iure rerum sequi? Illum velit delectus dicta et iste dolorum obcaecati minus odio eligendi!
                </p>
            </div>
            <div style = {styles.body}>
                <p>Content 1</p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione dolorem voluptates eveniet tempora ut cupiditate magnam, sapiente, hic quo in ipsum iste soluta eaque perferendis nihil recusandae dolore officia aperiam corporis similique. Facilis quos tempore labore totam! Consectetur molestiae iusto ducimus error reiciendis aspernatur dolor, modi dolorem sit architecto, voluptate magni sunt unde est quas? Voluptates a dolorum voluptatum quo perferendis aut sit. Aspernatur libero laboriosam ab eligendi omnis delectus earum labore, placeat officiis sint illum rem voluptas ipsum repellendus iste eius recusandae quae excepturi facere, iure rerum sequi? Illum velit delectus dicta et iste dolorum obcaecati minus odio eligendi!
                </p>
            </div>
        </div>
    )
}

export default StickyBar;