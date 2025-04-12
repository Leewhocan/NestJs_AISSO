export type TCreateContract = {
    title: string;
    sum: number;
    description: string;
    image: Buffer;
    countryId: string;
    authorId: number;
    tnvedId: string;
};

export enum STATUSES {
    CREATE = 'CREATE',
    INWAIT = 'INWAIT',
    DONE = 'DONE',
}

export type TUpdateContract = {
    id: number;
    authorId: number;
    title?: string;
    sum?: number;
    description?: string;
    image?: Buffer;
    countryId?: string;
    tnvedId?: string;
};

export type TDeleteContract = {
    id: number;
    authorId: number;
};

export type TGetContractByAuthor = {
    status: STATUSES;
    authorId: number;
};
