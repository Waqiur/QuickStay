import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

function useCreateCabin() {
    const queryClient = useQueryClient();
    const { isPending: isCreating, mutate: createCabin } = useMutation({
        mutationFn: (cabin) => createEditCabin(cabin),
        onSuccess: () => {
            toast.success("Cabin created successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { isCreating, createCabin };
}

export default useCreateCabin;
