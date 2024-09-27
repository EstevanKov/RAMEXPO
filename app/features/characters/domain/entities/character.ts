import './location';
import CharacterLocation from './location';
import LastSeenCharacter from './lastepisodeseen';

class Character {
    id: number;
    name: string;
    status: string;
    species: string; 
    type: string;    
    gender: string;
    origin: CharacterLocation;
    location: CharacterLocation;
    image: string;
    episodes: LastSeenCharacter; // Ajusta aquí el nombre
    url: string;       
    created: string;  

    constructor(
        id: number,
        name: string,
        status: string,
        species: string,
        type: string,
        gender: string,
        origin: CharacterLocation,
        location: CharacterLocation,
        image: string,
        episodes: LastSeenCharacter, // Ajusta aquí el nombre
        url: string,
        created: string
    ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.type = type;
        this.gender = gender;
        this.origin = origin;
        this.location = location;
        this.image = image;
        this.episodes = episodes; // Ajusta aquí el nombre
        this.url = url;
        this.created = created;
    }
}

export default Character;
