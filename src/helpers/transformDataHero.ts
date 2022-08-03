import { IChar } from "../types/char";

const transformData = (data: IChar) => {
    return {
        id: data.id,
        name: data.name,
        status: data.status,
        species: data.species,
        gender: data.gender,
        location: data.location.name,
        origin: data.origin.name,
        image: data.image,
    }
}
export default transformData;