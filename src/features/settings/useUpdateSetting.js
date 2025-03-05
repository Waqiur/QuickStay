import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useUpdateSetting() {
    const queryClient = useQueryClient();
    const { isPending: isUpdating, mutate: updateSetting } = useMutation({
        mutationFn: (newSettings) => updateSettingApi(newSettings),
        onSuccess: () => {
            toast.success("Settings updated successfully");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { isUpdating, updateSetting };
}

export default useUpdateSetting;
