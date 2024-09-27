import './location'
import CharacterLocation from './location';


class Character{
    id: number;
    name: string;
    status: string;
    gender: string;
    image: string;
    location: CharacterLocation

    constructor(
        id: number,
        name: string,
        status: string,
        gender: string,
        image: string,
        location: CharacterLocation   
    ){
        this.id =id;
        this.name = name;
        this.status = status;
        this.gender = gender;
        this.image = image;
        this.location = location;
    }


}

export default Character;