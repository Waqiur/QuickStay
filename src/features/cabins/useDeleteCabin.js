import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

function useDeleteCabin() {
    const queryClient = useQueryClient();
    const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabinApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            toast.success("Cabin deleted successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
