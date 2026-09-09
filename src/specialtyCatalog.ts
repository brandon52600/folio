// Broad visit templates: specialty context rather than a single presenting symptom.
export const specialtyDetails: Record<string, [string, string]> = {
  'Family medicine': [
    'general',
    'Preventive care / screening history|Immunizations|Chronic condition priorities|Family / caregiving context|Reproductive health needs|Community / care access',
  ],
  'Internal medicine': [
    'general',
    'Active chronic conditions|Recent admissions / transitions|Disease monitoring / trends|Medication burden / interactions|Specialist care coordination|Functional trajectory',
  ],
  'Emergency medicine': [
    'general',
    'Event timeline / last known baseline|Immediate concerns / acuity|Prehospital care / response|Trauma / toxic exposure|Last oral intake|Collateral history / baseline function',
  ],
  'General practice': [
    'general',
    'New / ongoing concerns|Preventive care needs|Longitudinal health changes|Self-management / understanding|Family / social context|Referrals / follow-up needs',
  ],
  Cardiology: [
    'cardio',
    'Cardiovascular diagnoses / procedures|Exercise capacity / baseline|Home BP / pulse trends|Cardiac testing history|Risk factors / family history|Cardiac devices / follow-up',
  ],
  Pulmonology: [
    'resp',
    'Respiratory diagnoses / admissions|Breathing / activity baseline|Inhalers / oxygen / equipment|Smoking / inhalational exposures|Sleep / breathing history|Pulmonary testing / imaging history',
  ],
  'General surgery': [
    'gi',
    'Reason for surgical review|Prior operations / complications|Anesthesia history|Wound / healing history|Nutrition / functional capacity|Bleeding / clotting / perioperative medicines',
  ],
  Gastroenterology: [
    'gi',
    'Digestive diagnoses / procedures|Eating / swallowing baseline|Bowel habit baseline|Nutrition / weight trajectory|Endoscopy / screening history|Liver / pancreatic / family history',
  ],
  Neurology: [
    'neuro',
    'Neurologic diagnoses / events|Cognition / communication baseline|Mobility / falls / independence|Seizure / consciousness history|Neurologic testing / imaging|Rehabilitation / support needs',
  ],
  Orthopedics: [
    'msk',
    'Injuries / operations / implants|Mobility / activity goals|Joint / limb function baseline|Work / sport demands|Rehabilitation / assistive devices|Bone health / fracture history',
  ],
  Rheumatology: [
    'msk',
    'Inflammatory / autoimmune history|Joint / stiffness pattern|Extra-articular involvement|Disease activity / flares|Immunomodulators / monitoring|Infection / vaccination history',
  ],
  Nephrology: [
    'renal',
    'Kidney diagnosis / function trends|Blood pressure / volume baseline|Urine / protein history|Dialysis / transplant status if applicable|Renal medicines / nephrotoxic exposures|Electrolyte / anemia / bone history',
  ],
  Urology: [
    'renal',
    'Voiding / continence baseline|Stone / infection history|Urologic operations / devices|Sexual / reproductive function|Prostate / genital concerns|Prior imaging / cancer surveillance',
  ],
  'Obstetrics & gynecology': [
    'repro',
    'Menstrual / menopausal history|Obstetric history / current pregnancy|Contraception / reproductive goals|Sexual / pelvic health|Cervical / breast screening history|Prior gynecologic procedures',
  ],
  Endocrinology: [
    'endo',
    'Endocrine diagnoses / trajectory|Glucose / hormone monitoring|Hormone replacement / steroid exposure|Growth / weight / metabolic history|Bone / fracture history|Reproductive / endocrine family history',
  ],
  Dermatology: [
    'skin',
    'Skin / hair / nail concerns|Prior dermatologic diagnoses|Skin cancer / biopsy history|Sun / occupational exposures|Skin products / treatment tolerance|Distribution / change over time',
  ],
  Otolaryngology: [
    'ent',
    'Ear / hearing baseline|Nasal / sinus history|Voice / swallowing baseline|Sleep / airway history|ENT surgery / device history|Noise / tobacco / allergy exposure',
  ],
  Ophthalmology: [
    'eye',
    'Vision / correction baseline|Ocular diagnoses / procedures|Contact lenses / eye medicines|Last eye examination|Systemic disease / ocular effects|Family ocular history / visual goals',
  ],
  Psychiatry: [
    'psych',
    'Psychiatric history / admissions|Mood / cognition / behavior baseline|Treatment / therapy experience|Safety / self-harm / violence history|Trauma / substance context|Supports / recovery goals',
  ],
  Pediatrics: [
    'peds',
    'Birth / perinatal history|Growth / nutrition|Development / milestones|Immunizations / preventive visits|School / behavior / family context|Caregiver concerns / safety',
  ],
  Hematology: [
    'heme',
    'Hematologic diagnoses / laboratory trends|Bleeding / thrombosis history|Transfusion / treatment history|Infections / immune suppression|Nutrition / absorption history|Family blood disorders / malignancy',
  ],
};
export const broadVisitFields = [
  'Visit purpose / priorities',
  'Baseline health / function',
  'Interval changes / new concerns',
  'Current management / response',
  'Available records / prior evaluation',
  'Care goals / barriers',
];
export const broadReview = [
  'Fever / chills',
  'Weight / appetite change',
  'Fatigue / sleep change',
  'Chest symptoms / dyspnea',
  'Bowel / urinary change',
  'Mood / neurologic change',
];
