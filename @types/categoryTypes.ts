    
    export interface ICategory {
        id? :string;
        title : string;
        userId? : string
    }

    export interface TCategoryResponseType {
        message : string,
        error? : string,
        responses : ICategory[]
    }

    export interface TSingleCategoryResponseType {
        message : string,
        error? : string,
        responses : ICategory
    }