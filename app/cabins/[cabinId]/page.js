import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

export async function generateMetadata({ params }) {
    // Await params before accessing cabinId
    const resolvedParams = await params;
    return {
        title: `Cabin ${resolvedParams.cabinId}`,
    };
}

export async function generateStaticParams() {
    const cabins = await getCabins();
    return cabins.map((cabin) => ({
        cabinId: String(cabin.id),
    }));
}

export default async function Page({ params }) {
    // Await params before accessing cabinId
    const resolvedParams = await params;
    const cabin = await getCabin(resolvedParams.cabinId);

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} />

            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>

                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
}
