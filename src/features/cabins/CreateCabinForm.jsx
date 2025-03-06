import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabin = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabin;
    const isEditSession = editId;
    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const isWorking = isCreating || isEditing;
    const onSubmit = (data) => {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];
        if (isEditSession) {
            editCabin(
                {
                    newCabinData: {
                        ...data,
                        image,
                    },
                    id: editId,
                },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        } else {
            createCabin(
                {
                    ...data,
                    image,
                },
                {
                    onSuccess: () => {
                        reset();
                    },
                }
            );
        }
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Maximum capacity must be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Regular price must be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    defaultValue={0}
                    id="discount"
                    disabled={isWorking}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value) => {
                            if (value < 0 || value > getValues().regularPrice) {
                                return "Discount must be between 0 and regular price";
                            }
                            return true;
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={isWorking}
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                <Button
                    $variation="secondary"
                    $size="medium"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button
                    $variation="primary"
                    $size="medium"
                    disabled={isWorking}
                >
                    {isEditSession ? "Edit cabin" : "Add cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
