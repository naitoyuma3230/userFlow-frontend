interface Step {
  company: boolean;
  office: boolean;
  user: boolean;
  check: boolean;
}

interface Company {
  id: number | null;
  name: string;
  postCode: string;
  address: string;
}

interface Hospital {
  id: number | null;
  nameKana: string;
  name: string;
  code: string;
  postCode: string;
  address: string;
  departments: Array<string>;
}

interface CareOffice {
  id: number | null;
  nameKana: string;
  name: string;
  code: string;
  postCode: string;
  address: string;
  classification: string;
  regionalAddition: string;
  specialRegionalAddition: string;
  careServiceTypes: Array<string>;
}

interface OtherOffice {
  id: number | null;
  nameKana: string;
  name: string;
  postCode: string;
  address: string;
}

type OfficeCategory = 'medical' | 'care' | 'other' | null;

type Office = Hospital | CareOffice | OtherOffice;

interface User {
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  email: string;
  occupation: string;
  company?: Company;
  office?: Office;
}
