export interface Movie {
    _id?: string;
    box_office: string;
    category: string[];
    name: string;
    rank: number;
    release_date: string;
    votes: number;
    your_rank: number;
}

export interface Ranking {
    _id: string;
    rank: number;
    votes: number;
    your_rank: number | null;
}
