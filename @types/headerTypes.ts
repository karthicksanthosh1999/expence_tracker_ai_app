
type breadcrumbsTypes = {
    id: number;
    title: string;
    link: string
} 

export interface headerTypes {
    headerData : {
        title : string;
        description : string;        
        breadcurmbs: breadcrumbsTypes[];
    }
}