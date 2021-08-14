

//////// =======================  Start register model section ============================
export interface IRegisterModel{
    id: string;
    childName: string;
    fatherName: string;
    age: number;
    gender: string;
    mobile: number;
    wahtsapp: number;
    email: string;
    country: string;
    address: string;
    course: string;
    additionalComments: string;
}

/////// classes
export class RegisterModel implements IRegisterModel {
    id: string = undefined;
    childName = '';
    fatherName = '';
    age = undefined;
    gender = '';
    mobile = undefined;
    wahtsapp = undefined;
    email = '';
    country = '';
    address = '';
    course = '';
    additionalComments = '';
    recordedBy = '';
}

//////// ======================= end register model section ============================

