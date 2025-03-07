import Navigation from "./_components/Navigation";
import Logo from "./_components/Logo";
import "@/app/_styles/globals.css";

export const metadata = {
    title: "The Wild Oasis",
    description:
        "The Wild Oasis is a luxury cabin rental company that offers a unique and unforgettable experience in the wilderness.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <header>
                    <Logo />
                    <Navigation />
                </header>
                <main>{children}</main>
                <footer>Copyright by The Wild Oasis</footer>
            </body>
        </html>
    );
}
