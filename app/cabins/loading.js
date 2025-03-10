import Spinner from "@/app/_components/Spinner";

export default function Loading() {
    return (
        <div className="grid items-center justify-center h-full">
            <div>
                <Spinner />
                <p className="text-xl text-primary-200">Loading cabins...</p>
            </div>
        </div>
    );
}
