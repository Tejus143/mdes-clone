import type { Admission } from '../types/Admission';
import type { Career } from '../types/Career';
import type { Contact } from '../types/Contact';
import type { CouncilMember } from '../types/CouncilMember';
import type { Institution } from '../types/Institution';

const districtPages = {
  Mysuru: 'https://mdes.in/mysuru-institutions/',
  Mandya: 'https://mdes.in/mandya_institutions/',
  Kodagu: 'https://mdes.in/kodagu-institutions/',
  Chamarajanagar: 'https://mdes.in/chamarajanagar-institutions/',
} as const;

const institution = (
  id: string,
  name: string,
  district: keyof typeof districtPages,
  category: Institution['category'],
  address: string,
  phone: string,
  email = 'info@mdes.co.in',
  website = districtPages[district],
): Institution => ({
  id,
  name,
  district,
  category,
  address,
  phone,
  email,
  website,
  principal: 'Refer institution office',
  admissionContact: phone,
});

// Curated from the four official MDES district institution directories.
export const institutionsMock: Institution[] = [
  institution('st-philomenas-pg-centre', "St. Philomena's PG Centre", 'Mysuru', 'College', 'Bannimantap, Mysuru', '0821-4240997', 'stphilos1946@gmail.com', 'https://www.stphilos.ac.in'),
  institution('st-joseph-degree-college-jayalakshmipuram', "St. Joseph's Degree College", 'Mysuru', 'College', 'Jayalakshmipuram, Mysuru', '0821-2410744', 'sjcmysore@gmail.com', 'https://sjfgcjayalakshmipurammysuru.com'),
  institution('st-joseph-college-women-sathgally', "St. Joseph's College for Women", 'Mysuru', 'College', 'Sathgally, Mysuru', '8277020260', 'info@mdes.co.in', 'https://www.stjosephswomenscollege.in'),
  institution('st-joseph-high-school-jayalakshmipuram', "St. Joseph's High School", 'Mysuru', 'School', 'Jayalakshmipuram, Mysuru', '0821-2513637', 'sjpsjlp@gmail.com', 'https://sjsjayalakshmipurammysuru.in'),
  institution('st-matthias-high-school', 'St. Matthias High School', 'Mysuru', 'School', 'Bannimantap, Mysuru', '0821-2491135', 'stmatthiasbtophs@gmail.com', 'https://stmatthiasschoolmysuru.in'),
  institution('st-joseph-central-school-yelwal', "St. Joseph's Central School", 'Mysuru', 'School', 'Yelwal, Mysuru', '0821-2404553'),

  institution('st-johns-pu-college-mandya', "St. John's PU College", 'Mandya', 'College', 'Mandya', '08232-221317', 'pp149puc@gmail.com'),
  institution('infant-jesus-high-school-kr-pet', 'Infant Jesus High School', 'Mandya', 'School', 'K.R. Pet, Mandya', '9986298250', 'ijcscottage@gmail.com'),
  institution('st-johns-high-school-mandya', "St. John's High School", 'Mandya', 'School', 'Mandya', '08232-221317', 'stjohnseducationalinstitutions@gmail.com'),
  institution('st-marys-high-school-ganjam', "St. Mary's High School", 'Mandya', 'School', 'Ganjam, Srirangapatna Taluk', '9945970715', 'stmaryshighschool@gmail.com'),
  institution('st-joseph-school-besagarahalli', "St. Joseph's School", 'Mandya', 'School', 'Besagarahalli, Mandya', 'Refer official directory'),

  institution('santha-annamma-degree-college', 'Santha Annamma Degree College', 'Kodagu', 'College', 'Virajpet, Kodagu', '08274-257622', 'stannescolleges@gmail.com'),
  institution('st-joseph-degree-college-somwarpet', "St. Joseph's Degree College", 'Kodagu', 'College', 'Somwarpet, Kodagu', '08276-284555', 'princijosephspet@gmail.com'),
  institution('st-annes-high-school-virajpet', "St. Anne's High School", 'Kodagu', 'School', 'Virajpet, Kodagu', '08274-260262', 'virajpetstannes@gmail.com'),
  institution('st-michaels-high-school-madikeri', "St. Michael's Kannada & English Medium High School", 'Kodagu', 'School', 'Madikeri, Kodagu', '08272-224860', 'stmichaelshighschool1946@gmail.com'),
  institution('st-joseph-high-school-somwarpet', "St. Joseph's High School", 'Kodagu', 'School', 'Somwarpet, Kodagu', '08276-284444', 'hmstjosephs123@gmail.com'),
  institution('st-marys-high-school-suntikoppa', "St. Mary's High School", 'Kodagu', 'School', 'Suntikoppa, Kodagu', '08276-262162', 'stmarysenglishmediumsuntikoppa@gmail.com'),

  institution('christaraja-pu-college-hanur', 'Christaraja PU College', 'Chamarajanagar', 'College', 'Hanur, Chamarajanagar', '08224-268698', 'christ-raja@gmail.com'),
  institution('st-anthonys-pu-college-cowdalli', "St. Anthony's PU College", 'Chamarajanagar', 'College', 'Cowdalli, Chamarajanagar', '08225-270132'),
  institution('christaraja-high-school-hanur', 'Christaraja Kannada High School', 'Chamarajanagar', 'School', 'Hanur, Chamarajanagar', '08224-268698', 'christ-raja@gmail.com'),
  institution('st-johns-high-school-gundlupet', "St. John's High School", 'Chamarajanagar', 'School', 'Gundlupet, Chamarajanagar', '08229-297393'),
  institution('st-pauls-high-school-chamarajanagar', "St. Paul's High School", 'Chamarajanagar', 'School', 'Chamarajanagar', '08226-222161', 'info@mdes.co.in'),
  institution('st-theresas-high-school-madapura', "St. Theresa's High School", 'Chamarajanagar', 'School', 'Madapura, Chamarajanagar', '9886407006', 'rayappan.2009@gmail.com'),
  institution('st-joseph-public-school-chamarajanagar', "St. Joseph's Public School", 'Chamarajanagar', 'School', 'Chamarajanagar', 'Refer official directory'),
];

export const councilMock: CouncilMember[] = [
  { id: 'cm-1', name: 'Most Rev. Bernard Moras', designation: 'President', phone: '+91 821 0001001', email: 'president@mdes.org' },
  { id: 'cm-2', name: 'Fr. Dominic Savio', designation: 'Vice President', phone: '+91 821 0001002', email: 'vicepresident@mdes.org' },
  { id: 'cm-3', name: 'Sr. Alice Teresa', designation: 'Secretary', phone: '+91 821 0001003', email: 'secretary@mdes.org' },
  { id: 'cm-4', name: 'Mr. Jerome Pinto', designation: 'Treasurer', phone: '+91 821 0001004', email: 'treasurer@mdes.org' },
];

export const admissionsMock: Admission[] = institutionsMock.map((item, index) => ({
  id: `adm-${index + 1}`,
  institutionId: item.id,
  eligibility: item.category === 'School' ? 'Contact the institution for grade-specific eligibility.' : 'Contact the institution for programme-specific eligibility.',
  courses: item.category === 'School' ? ['Primary and secondary education'] : ['Undergraduate / Pre-University programmes'],
  admissionOpen: true,
  contact: item.admissionContact,
}));

export const contactsMock: Contact[] = institutionsMock.map((item, index) => ({
  id: `cnt-${index + 1}`,
  institutionId: item.id,
  department: 'Institution Office',
  person: `${item.name} Office`,
  phone: item.phone,
  email: item.email,
}));

export const careersMock: Career[] = [
  { id: 'job-1', title: 'Mathematics Teacher', location: 'Mysuru', type: 'Full-Time', description: 'Teach high school mathematics and mentor students for board exams.', applyUrl: '#' },
  { id: 'job-2', title: 'Admission Counselor', location: 'Mandya', type: 'Part-Time', description: 'Guide prospective students and support the admission workflow.', applyUrl: '#' },
  { id: 'job-3', title: 'Lab Assistant', location: 'Kodagu', type: 'Contract', description: 'Manage laboratory inventory and ensure safety standards.', applyUrl: '#' },
];
