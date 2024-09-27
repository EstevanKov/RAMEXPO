import './location'
import CharacterLocation from './location';
import lastSeenCharacter from './lastepisodeseen';

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
    episode: lastSeenCharacter; 
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
        episode: lastSeenCharacter,
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
        this.episode = episode;
        this.url = url;
        this.created = created;
    }
}

export default Character;
