import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export const getCabins = async () => {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
        throw new Error("Cabins could not be loaded");
    }
    return data;
};

export const deleteCabin = async (id) => {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        throw new Error("Cabin could not be deleted");
    }
    return data;
};

export const createEditCabin = async (cabin, id) => {
    const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll(
        "/",
        "-"
    );
    const imagePath = hasImagePath
        ? cabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from("cabins");
    if (id) {
        query = query
            .update({
                ...cabin,
                image: imagePath,
            })
            .eq("id", id);
    } else {
        query = query.insert({
            ...cabin,
            image: imagePath,
        });
    }
    const { data, error } = await query.select().single();

    if (error) {
        throw new Error("Cabin could not be created");
    }

    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, cabin.image);

    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        throw new Error("Cabin image could not be uploaded");
    }
    return data;
};
