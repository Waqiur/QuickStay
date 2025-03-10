"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const activeFilter = searchParams.get("capacity") ?? "all";
    function handleFilterClick(filter) {
        const params = new URLSearchParams(searchParams);
        params.set("capacity", filter);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    return (
        <div className=" border border-primary-800 flex">
            <Button
                filter="all"
                handleFilter={handleFilterClick}
                activeFilter={activeFilter}
            >
                All Cabins
            </Button>
            <Button
                filter="small"
                handleFilter={handleFilterClick}
                activeFilter={activeFilter}
            >
                1-3 Guests
            </Button>
            <Button
                filter="medium"
                handleFilter={handleFilterClick}
                activeFilter={activeFilter}
            >
                4-6 Guests
            </Button>
            <Button
                filter="large"
                handleFilter={handleFilterClick}
                activeFilter={activeFilter}
            >
                7+ Guests
            </Button>
        </div>
    );
}

function Button({ filter, handleFilter, activeFilter, children }) {
    return (
        <button
            className={`cursor-pointer px-5 py-2 hover:bg-primary-700 ${
                filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
            }`}
            onClick={() => handleFilter(filter)}
        >
            {children}
        </button>
    );
}

export default Filter;
