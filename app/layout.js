import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefinSans = Josefin_Sans({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: {
        template: "%s | The Wild Oasis",
        default: "The Wild Oasis",
    },
    description:
        "The Wild Oasis is a luxury cabin rental company that offers a unique and unforgettable experience in the wilderness.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${josefinSans.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
            >
                <Header />
                <div className="flex-1 px-8 py-12 grid">
                    <main className="max-w-7xl mx-auto w-full">
                        <ReservationProvider>{children}</ReservationProvider>
                    </main>
                </div>
            </body>
        </html>
    );
}
