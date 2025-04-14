export type TCreateAgreement = {
    authorId: number;
    importerId: number;
    contractId: number;
    offerPrice: number;
};

export type TCancelSubAgreement = {
    id: number;
    authorId: number;
    contractId: number;
};

export type TSubAgreement = {
    id: number;
    contractId: number;
};
