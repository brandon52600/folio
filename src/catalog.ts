import { groupsFor, exposuresFor } from './subjectiveApplicability.ts';
import { differentials, systemDifferentials } from './differentials.ts';
import {
  complaintSets,
  specialtySets,
  complaintSystems,
  symptomOverrides,
} from './commonComplaints.ts';
import {
  specialtyDetails,
  broadVisitFields,
  broadReview,
} from './specialtyCatalog.ts';
import { generalDetails, focusedDetails } from './expandedCatalog.ts';
import {
  hpiGroups,
  exposureFields,
  additionalHpiFields,
  complaintHpi,
} from './subjective.ts';
export type Source = { title: string; url: string };
export type System = {
  id: string;
  name: string;
  short: string;
  specialties: string[];
  context: string[];
  ros: string[];
  exam: string[];
  sources: Source[];
};
export type Outline = {
  painMode?: import('./complaintProfiles.ts').PainMode;
  id: string;
  system: string;
  title: string;
  description: string;
  questions: string[];
  ros: string[];
  exams: string[];
  kind?: 'general' | 'focused' | 'specialty';
  specialty?: string;
  reviewRos?: string[];
  hpi?: string[];
  completeExam?: boolean;
  expansion?: boolean;
  generated?: boolean;
  customDiagnoses?: string[];
  sources?: Source[];
  version: number;
  reviewedAt: null;
};
const split = (s: string) =>
  s
    .split('|')
    .map((x) => x.trim())
    .filter(Boolean);
const book: Source = {
  title: 'Clinical Methods, 3rd edition (1990); corresponding system chapters',
  url: 'https://www.ncbi.nlm.nih.gov/books/NBK201/',
};
const src = (title: string, url: string): Source => ({ title, url });
export const systems: System[] = [];
export const outlines: Outline[] = [];
function system(
  id: string,
  name: string,
  short: string,
  specialties: string[],
  context: string,
  ros: string,
  exam: string,
  sources: Source[] = [book],
) {
  systems.push({
    id,
    name,
    short,
    specialties,
    context: split(context),
    ros: split(ros),
    exam: split(exam),
    sources,
  });
}
function add(
  system: string,
  title: string,
  description: string,
  questions: string,
  ros: string,
  exams: string,
) {
  outlines.push({
    id:
      system +
      '-' +
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-$/, ''),
    system,
    title,
    description,
    questions: split(questions),
    ros: split(ros),
    exams: split(exams),
    version: 3,
    reviewedAt: null,
  });
}
const primary = ['Family medicine', 'Internal medicine', 'Emergency medicine'];
system(
  'general',
  'General & constitutional',
  'General',
  primary,
  'What is your usual health and activity level?|Which medicines, exposures, or recent illnesses may relate to this change?',
  'Fever|Chills|Fatigue|Weight change|Appetite change|Sleep disturbance',
  'Review vital signs and general appearance|Assess hydration and peripheral perfusion',
);
add(
  'general',
  'Fever',
  'Temperature pattern, exposures, and localizing symptoms.',
  'What was the highest measured temperature, by which method, and when?|Have you traveled, had sick contacts, animal or tick exposures, or recent procedures?|Is the fever continuous, episodic, or associated with shaking chills?|Any immunosuppression, implanted devices, recent antibiotics, or new medicines?',
  'Cough|Sore throat|Dysuria|Abdominal pain|Diarrhea|Rash|Headache|Neck stiffness',
  'Inspect skin and accessible mucosa for focal findings|Examine throat and relevant lymph nodes|Auscultate heart and lungs|Assess abdomen and relevant focal tenderness',
);
add(
  'general',
  'Fatigue',
  'Energy, function, sleep, and systemic contributors.',
  'Do you mean sleepiness, muscle weakness, low motivation, or lack of energy?|How has your exercise tolerance or ability to work changed?|How many hours do you sleep, and is sleep refreshing?|Any dietary restriction, bleeding, mood change, or recent infection?',
  'Shortness of breath|Palpitations|Low mood|Snoring|Daytime sleepiness|Heavy menstrual bleeding|Heat intolerance|Cold intolerance',
  'Assess conjunctival pallor and hydration|Examine thyroid and accessible lymph nodes|Assess heart sounds and breathing|Assess objective strength when weakness is reported',
);
add(
  'general',
  'Unintentional weight loss',
  'Weight trajectory, intake, and associated symptoms.',
  'How much weight was lost, over what interval, and was it measured?|Has appetite or food access changed? Any difficulty chewing or swallowing?|Any change in bowel habits, early fullness, or persistent pain?|What is your usual diet, activity, substance use, and recent medication history?',
  'Night sweats|Dysphagia|Early satiety|Diarrhea|Blood in stool|Thirst|Frequent urination|Cough',
  'Review weight trend and nutritional appearance|Inspect oral cavity and dentition|Examine lymph nodes and thyroid|Assess abdomen for focal findings',
);
add(
  'general',
  'Night sweats',
  'Sweating pattern, exposures, and systemic review.',
  'Are clothes or bedding soaked, and how often does this occur?|Does sweating occur with fever, flushing, nightmares, or low glucose symptoms?|Any travel, tuberculosis exposure, recent infection, or new medication?|Any menstrual changes, alcohol use, or substance withdrawal?',
  'Measured fever|Weight loss|Persistent cough|Enlarged nodes|Palpitations|Tremor|Diarrhea|Flushing',
  'Check temperature and general appearance|Palpate accessible lymph node regions|Examine thyroid and skin|Auscultate heart and lungs',
);
system(
  'cardio',
  'Cardiovascular',
  'Cardiovascular',
  primary,
  'Any heart disease, vascular disease, diabetes, hypertension, or relevant family history?|Any tobacco, stimulant use, medication changes, or previous cardiac evaluation?',
  'Orthopnea|Nocturnal breathlessness|Exercise intolerance|Leg swelling|Fatigue|Cough',
  'Review vital signs and general appearance|Assess peripheral pulse and perfusion',
  [
    src(
      'Clinical Methods: History of Cardiovascular Disease',
      'https://www.ncbi.nlm.nih.gov/books/NBK246/',
    ),
    src(
      'Clinical Methods: Chest Pain or Discomfort',
      'https://www.ncbi.nlm.nih.gov/books/NBK416/',
    ),
  ],
);
add(
  'cardio',
  'Chest pain',
  'Characterize discomfort, triggers, and associated symptoms.',
  'Where is the discomfort, and does it travel to an arm, jaw, back, or elsewhere?|How does it feel, how severe is it, and how long does each episode last?|Is it brought on by exertion, breathing, meals, movement, or position?|Was onset abrupt? What relieves it, and is this different from previous episodes?',
  'Shortness of breath|Sweating|Nausea|Palpitations|Syncope|Pain with breathing|Hemoptysis|Unilateral calf pain',
  'Auscultate heart sounds and rhythm|Compare breath sounds across lung fields|Assess neck veins and peripheral edema|Assess chest wall tenderness if appropriate',
);
add(
  'cardio',
  'Palpitations',
  'Rhythm sensation, episode timing, and provoking factors.',
  'Does the heartbeat feel fast, irregular, pounding, or like skipped beats?|Do episodes start and stop abruptly, and how long do they last?|Any association with exertion, caffeine, decongestants, or emotional stress?|Any fainting with episodes or family history of sudden unexplained death?',
  'Chest discomfort|Dizziness|Near-syncope|Sweating|Tremor|Heat intolerance|Weight loss|Breathlessness',
  'Assess pulse regularity and rate|Auscultate for additional heart sounds|Examine thyroid when relevant|Assess tremor and peripheral edema',
);
add(
  'cardio',
  'Syncope',
  'Before, during, and after transient loss of consciousness.',
  'What were you doing and in what position before you lost consciousness?|Any warning symptoms, exertion, pain, or palpitations beforehand?|What did a witness observe, and how long were you unresponsive?|How quickly did you recover? Any injury, confusion, tongue injury, or prior episodes?',
  'Chest pain|Breathlessness|Headache|Focal weakness|Bleeding|Vomiting|Incontinence|Palpitations',
  'Assess vital signs; consider supervised orthostatic measurements if safe|Auscultate heart and assess pulse|Perform focused neurologic examination|Inspect for injuries and relevant bleeding signs',
);
add(
  'cardio',
  'Leg swelling',
  'Distribution, time course, and systemic fluid symptoms.',
  'Is one leg or both affected, and did swelling start suddenly?|Does it improve overnight or with elevation?|Any pain, redness, recent travel, immobility, surgery, or prior clot?|Any new medicines, heart/kidney/liver history, or change in urine output?',
  'Calf pain|Skin redness|Dyspnea|Chest pain|Abdominal swelling|Reduced urine output|Weight gain|Fever',
  'Compare distribution of edema and skin changes|Assess pitting, tenderness, and limb symmetry|Assess neck veins and heart/lung findings|Check peripheral pulses and skin integrity',
);
system(
  'resp',
  'Respiratory',
  'Respiratory',
  primary,
  'Any asthma, COPD, prior lung disease, smoking/vaping, or occupational exposures?|Any recent travel, sick contacts, new medication, or prior respiratory episodes?',
  'Fever|Chills|Night sweats|Weight loss|Fatigue|Chest discomfort',
  'Assess vital signs, oxygen saturation, and general appearance|Observe speech, respiratory pattern, and work of breathing',
  [
    src(
      'Clinical Methods: Chest Examination',
      'https://www.ncbi.nlm.nih.gov/books/NBK368/',
    ),
    src(
      'Clinical Methods: Dyspnea',
      'https://www.ncbi.nlm.nih.gov/books/NBK357/',
    ),
  ],
);
add(
  'resp',
  'Cough',
  'Dry or productive cough, triggers, and airway symptoms.',
  'Is the cough dry or productive? What is the sputum like?|Is it worse at night, after meals, on exertion, or around irritants?|Any blood in the sputum, choking event, or abrupt onset?|What treatments have you tried, and are you taking an ACE inhibitor or similar new medicine?',
  'Wheeze|Dyspnea|Postnasal drip|Nasal congestion|Sore throat|Heartburn|Hoarseness|Cough-related vomiting',
  'Compare lung sounds in corresponding fields|Inspect upper airway when appropriate|Assess chest expansion|Percuss relevant lung areas if indicated',
);
add(
  'resp',
  'Shortness of breath',
  'Baseline function, onset, and exertional or positional pattern.',
  'Did breathlessness begin suddenly or build gradually?|What activities can you manage now compared with baseline?|Does it occur at rest, lying flat, or wake you from sleep?|Any recent immobilization, procedure, travel, or previous blood clot?',
  'Wheeze|Cough|Hemoptysis|Palpitations|Syncope|Leg swelling|Orthopnea|Pleuritic pain',
  'Auscultate air entry and added lung sounds|Assess chest expansion and symmetry|Auscultate heart and inspect neck veins|Assess peripheral edema and calf asymmetry',
);
add(
  'resp',
  'Wheezing',
  'Episodic airflow symptoms and exposures.',
  'Is the sound mainly with breathing out, breathing in, or both?|What exposures, exercise, weather, or infections trigger it?|Any prior asthma, inhaler use, emergency visits, or hospitalization?|Did this follow eating, a possible foreign body, medication, or allergen exposure?',
  'Cough|Chest tightness|Dyspnea|Stridor|Hives|Lip swelling|Nasal itching|Sputum',
  'Listen for wheeze distribution and air entry|Distinguish upper-airway noise from chest sounds|Inspect for visible allergic findings|Assess chest movement and accessory muscle use',
);
add(
  'resp',
  'Hemoptysis',
  'Source, quantity, recurrence, and respiratory context.',
  'Was blood coughed up, vomited, or coming from the nose or mouth?|How much blood, how often, and are there clots?|Any persistent cough, infection exposure, prior tuberculosis, or cancer history?|Any anticoagulants, bleeding tendency, recent procedure, or clotting history?',
  'Dyspnea|Pleuritic pain|Dizziness|Epistaxis|Hematemesis|Leg pain|Sputum|Loss of appetite',
  'Inspect mouth and nose for an alternative source|Assess respiratory effort and lung sounds|Assess pulse and perfusion|Inspect for bruising or other visible bleeding',
);
system(
  'gi',
  'Gastrointestinal',
  'Gastrointestinal',
  [...primary, 'General surgery'],
  'Any prior abdominal surgery, liver/bowel disease, recent travel, or dietary change?|Any alcohol use, NSAIDs, antibiotics, supplements, or family GI history?',
  'Fever|Appetite change|Weight loss|Abdominal distention|Urinary symptoms|Fatigue',
  'Review vital signs and hydration|Inspect abdominal contour and scars',
  [
    src(
      'Clinical Methods: Abdominal Pain',
      'https://www.ncbi.nlm.nih.gov/books/NBK412/',
    ),
    src(
      'Clinical Methods: Abdominal Examination',
      'https://www.ncbi.nlm.nih.gov/books/NBK420/',
    ),
  ],
);
add(
  'gi',
  'Abdominal pain',
  'Location, migration, meal relation, and associated symptoms.',
  'Where did the pain start, where is it now, and does it radiate?|Is pain constant or colicky, and how severe is it?|Does food, movement, stool, gas, or position change the pain?|When relevant, could pregnancy be possible and are there menstrual or pelvic symptoms?',
  'Nausea|Vomiting|Diarrhea|Constipation|Black stools|Blood in stool|Jaundice|Flank pain',
  'Auscultate before palpation|Gently palpate beginning away from pain|Assess focal tenderness and guarding|Consider flank tenderness if urinary symptoms are present',
);
add(
  'gi',
  'Nausea & vomiting',
  'Emesis character, frequency, intake, and fluid loss.',
  'How often are you vomiting, and can you keep fluids down?|What does the vomit contain: food, blood, coffee-ground material, or green fluid?|Did pain precede vomiting, and is vomiting related to meals?|Any new medicines, cannabis/alcohol use, travel, sick contacts, or pregnancy possibility?',
  'Diarrhea|Headache|Vertigo|Reduced urine|Thirst|Dizziness|Hematemesis|Absent stool or gas',
  'Assess hydration, perfusion, and oral mucosa|Auscultate bowel sounds|Palpate for abdominal tenderness or distention|Perform focused neurologic assessment if associated symptoms warrant',
);
add(
  'gi',
  'Diarrhea',
  'Stool pattern, exposure history, and inflammatory symptoms.',
  'How many stools per day, and are they watery, greasy, bloody, or mucous?|Does diarrhea wake you, persist with fasting, or follow certain foods?|Any recent antibiotics, admission, travel, unsafe water, or sick contacts?|Any urgency, painful defecation, or previous episodes?',
  'Cramping|Vomiting|Blood in stool|Tenesmus|Thirst|Reduced urine|Dizziness|Oral ulcers',
  'Assess hydration and peripheral perfusion|Auscultate and palpate abdomen|Inspect relevant skin and oral findings|Consider perianal inspection only if indicated, consented, and supervised',
);
add(
  'gi',
  'Constipation',
  'Baseline bowel habits, obstruction symptoms, and medication review.',
  'How often do you pass stool, and how has this changed?|Are stools hard? Any straining, incomplete emptying, or manual assistance?|When did you last pass stool or gas? Any vomiting or marked distention?|What is your fluid/fiber intake and use of opioids, iron, laxatives, or supplements?',
  'Abdominal pain|Rectal bleeding|Nausea|Vomiting|Early satiety|Urinary retention|Cold intolerance|Back pain',
  'Assess hydration and abdominal distention|Auscultate and palpate abdomen|Assess relevant neurologic function when indicated|Consider rectal examination only with indication, consent, chaperone, and supervision',
);
system(
  'neuro',
  'Neurologic',
  'Neurologic',
  primary,
  'Any prior neurologic condition, head injury, vascular risks, or family history?|Any medication/substance change or recent illness?',
  'Headache|Dizziness|Vision change|Speech change|Gait change|Nausea',
  'Assess vital signs, alertness, and orientation|Observe speech and facial symmetry',
  [
    src(
      'Clinical Methods: Dizziness',
      'https://www.ncbi.nlm.nih.gov/books/NBK325/',
    ),
    src(
      'Merck Manual: Approach to the Patient With Headache',
      'https://www.merckmanuals.com/professional/neurologic-disorders/headache/approach-to-the-patient-with-headache',
    ),
  ],
);
add(
  'neuro',
  'Headache',
  'Onset, headache phenotype, and neurologic warning symptoms.',
  'Was onset sudden and maximal immediately, or gradual?|Where is the pain and how does it differ from previous headaches?|Any relation to exertion, posture, cough, menstrual cycle, or recent trauma?|Any fever, neck stiffness, new weakness, visual loss, or pregnancy/postpartum context?',
  'Photophobia|Phonophobia|Vomiting|Aura|Scalp tenderness|Jaw pain with chewing|Lacrimation|Confusion',
  'Assess pupils and eye movements|Assess visual fields; fundoscopy if trained and appropriate|Perform focused motor, sensory, and coordination assessment|Assess neck movement without forcing painful maneuvers',
);
add(
  'neuro',
  'Dizziness / vertigo',
  'Timing, triggers, balance, and hearing symptoms.',
  'Is this spinning, near-fainting, imbalance, or another sensation?|How long does each episode last, and is it continuous between episodes?|Is it triggered by standing or head movement?|Any new hearing change, severe headache, inability to walk, or focal neurologic symptom?',
  'Hearing loss|Tinnitus|Ear fullness|Double vision|Vomiting|Palpitations|Syncope|Limb weakness',
  'Observe eye movements and nystagmus|Assess hearing and relevant ear findings|Assess gait and coordination if safe|Consider supervised positional testing only when appropriate; do not use untrained HINTS',
);
add(
  'neuro',
  'Weakness',
  'True power loss, distribution, and functional change.',
  'Is there loss of muscle power rather than tiredness or pain limitation?|Which areas are affected, and was onset sudden or progressive?|Is weakness proximal, distal, one-sided, or worse with repeated use?|Any difficulty swallowing, speaking, breathing, or controlling bladder/bowel?',
  'Numbness|Diplopia|Ptosis|Muscle pain|Back pain|Falls|Dysphagia|Dyspnea',
  'Compare limb power side to side|Assess tone and reflexes as trained|Map associated sensory changes|Assess cranial nerve function and gait if safe',
);
add(
  'neuro',
  'Numbness / tingling',
  'Sensory distribution, progression, and associated deficits.',
  'Where exactly is the altered sensation, and does it spread?|Is sensation reduced, burning, pins-and-needles, or another feeling?|Is it linked to position, repetitive work, neck/back pain, or injury?|Any sudden weakness, saddle sensory change, or new bladder/bowel dysfunction?',
  'Weakness|Neck pain|Back pain|Balance difficulty|Burning pain|Vision change|Speech change|Urinary retention',
  'Map light-touch sensation and compare sides|Assess associated strength and reflexes|Inspect affected skin and circulation|Assess gait and proprioception when relevant and safe',
);
system(
  'msk',
  'Musculoskeletal',
  'Musculoskeletal',
  [...primary, 'General surgery'],
  'Any injury, repetitive activity, inflammatory disease, prior surgery, or prosthesis?|What tasks are limited, and what is your usual mobility?',
  'Fever|Joint swelling|Stiffness|Weakness|Numbness|Rash',
  'Review vital signs and overall mobility|Inspect affected region and compare sides',
  [book],
);
add(
  'msk',
  'Low back pain',
  'Mechanical pattern, radiation, and neurologic symptoms.',
  'Where is the pain and does it travel below the knee?|Was there lifting, trauma, or a change in activity?|Is pain worse with movement, at night, or at rest?|Any saddle numbness, retention/incontinence, progressive weakness, fever, or cancer history?',
  'Leg pain|Foot weakness|Urinary retention|Bowel dysfunction|Weight loss|Night pain|Dysuria|Morning stiffness',
  'Observe gait and posture if safe|Palpate spine and paraspinal region|Assess lower-limb power, sensation, and reflexes|Consider supervised nerve-tension testing when appropriate',
);
add(
  'msk',
  'Knee pain',
  'Trauma mechanics, mechanical symptoms, and weight bearing.',
  'Was there twisting, impact, a pop, or gradual onset?|Where is pain, and was swelling immediate or delayed?|Does the knee lock, catch, give way, or feel unstable?|Can you bear weight, and is there prior injury or knee surgery?',
  'Redness|Warmth|Effusion|Calf pain|Hip pain|Ankle pain|Locking|Instability',
  'Assess alignment, swelling, and skin changes|Palpate joint line and relevant bony landmarks|Assess active and passive motion as tolerated|Consider trained stability testing after assessing safety and pain',
);
add(
  'msk',
  'Shoulder pain',
  'Painful movement, trauma, and referred symptoms.',
  'Did pain start after a fall, lifting, overhead work, or without injury?|Which movements hurt, and can you reach overhead or behind your back?|Is there true weakness, stiffness, or night pain?|Any neck pain, hand symptoms, chest discomfort, or prior dislocation?',
  'Arm numbness|Neck stiffness|Chest pain|Dyspnea|Hand weakness|Instability|Night pain|Swelling',
  'Inspect shoulder contour and symmetry|Palpate relevant shoulder landmarks|Compare active and passive range as tolerated|Assess distal neurovascular function and focused strength',
);
add(
  'msk',
  'Multiple joint pain',
  'Joint distribution and inflammatory or systemic pattern.',
  'Which joints are involved, in what sequence, and symmetrically or not?|How long does morning stiffness last?|Is pain accompanied by swelling, warmth, or restricted movement?|Any psoriasis, eye inflammation, bowel symptoms, recent infection, or autoimmune history?',
  'Oral ulcers|Eye redness|Diarrhea|Photosensitivity|Raynaud symptoms|Back stiffness|Weight loss|Fatigue',
  'Map affected joints and visible swelling|Assess warmth, tenderness, and range gently|Inspect skin, nails, and mucosa when relevant|Assess gait and functional movements',
);
system(
  'renal',
  'Renal & urinary',
  'Renal / urinary',
  primary,
  'Any stones, urinary infections, kidney disease, instrumentation, or relevant surgery?|Review medicines, fluid intake, sexual history and pregnancy possibility when relevant.',
  'Fever|Flank pain|Nausea|Reduced urine|Swelling|Fatigue',
  'Review vital signs and hydration|Assess abdominal and suprapubic region',
  [
    src('StatPearls: Dysuria', 'https://www.ncbi.nlm.nih.gov/books/NBK549918/'),
    book,
  ],
);
add(
  'renal',
  'Painful urination',
  'Voiding pain, urinary frequency, and genital symptoms.',
  'Is pain at the start, throughout, or after urination?|Any frequency, urgency, or blood in urine?|Any genital discharge, irritation, sores, or new sexual exposure?|Any flank pain, fever, prior infections, or recent catheter/procedure?',
  'Suprapubic pain|Hematuria|Vaginal discharge|Urethral discharge|Genital lesions|Vomiting|Chills|Urinary urgency',
  'Assess suprapubic tenderness|Assess costovertebral tenderness if appropriate|Inspect external genital findings only if indicated and consented|Consider further intimate examination only with supervision and chaperone discussion',
);
add(
  'renal',
  'Blood in urine',
  'Visible or detected blood, timing, and associated pain.',
  'Is blood visible or only found on testing?|Is urine discolored throughout, at the start, or at the end; any clots?|Any pain, recent exercise, trauma, or menstruation-related contamination?|Any smoking exposure, anticoagulants, stones, or prior urinary investigation?',
  'Dysuria|Urgency|Retention|Colicky pain|Weight loss|Easy bruising|Skin rash|Joint pain',
  'Assess perfusion and pallor|Palpate abdomen and suprapubic area|Assess relevant flank tenderness|Inspect for edema, rash, or bruising',
);
add(
  'renal',
  'Flank pain',
  'Colicky pain, radiation, and urinary or GI symptoms.',
  'Is pain constant or in waves, and does it travel to the groin?|Any fever, chills, vomiting, or difficulty passing urine?|Any prior stones, urinary infection, trauma, or single kidney?|What was the last normal urination, and could pregnancy be possible?',
  'Hematuria|Dysuria|Urgency|Vomiting|Abdominal pain|Groin pain|Retention|Diarrhea',
  'Assess costovertebral area gently|Examine abdomen for focal tenderness|Assess suprapubic fullness when appropriate|Assess relevant spine or muscular tenderness',
);
add(
  'renal',
  'Urinary frequency',
  'Frequency versus volume, nocturia, and emptying symptoms.',
  'Are you passing small amounts often or a large total volume?|How often do you wake to urinate, and what is fluid/caffeine intake?|Any urgency, leakage, weak stream, or incomplete emptying?|Any excessive thirst, new diuretic use, or pregnancy possibility?',
  'Dysuria|Hematuria|Incontinence|Hesitancy|Thirst|Weight loss|Pelvic pressure|Blurred vision',
  'Assess hydration and edema|Assess suprapubic fullness or tenderness|Perform relevant focused neurologic examination if indicated|Consider pelvic/prostate evaluation only with indication, consent, and supervision',
);
system(
  'repro',
  'Reproductive & obstetric',
  'Reproductive',
  ['Family medicine', 'Emergency medicine', 'Obstetrics & gynecology'],
  'When relevant, ask menstrual, pregnancy, obstetric, sexual, and contraceptive history privately.|Discuss consent, comfort, chaperone preferences, and the indication before any intimate examination.',
  'Fever|Pelvic pain|Dizziness|Urinary symptoms|Nausea|Fatigue',
  'Review vital signs and general appearance|Assess abdomen for relevant tenderness',
  [
    src(
      'Merck Manual: Female Pelvic Pain',
      'https://www.merckmanuals.com/professional/gynecology-and-obstetrics/symptoms-of-gynecologic-disorders/female-pelvic-pain',
    ),
    src(
      'SAEM: Pelvic Pain and Vaginal Bleeding',
      'https://www.saem.org/about-saem/academies-interest-groups-affiliates2/cdem/for-students/online-education/m3-curriculum/group-focused-chief-complaint-history-physical-examination-and-differential-diagnosis/pelvic-pain-and-vaginal-bleeding',
    ),
  ],
);
add(
  'repro',
  'Pelvic pain',
  'Pain pattern, menstrual relation, and pregnancy context.',
  'Is pain one-sided, central, sudden, or recurrent?|How does it relate to periods, intercourse, urination, or bowel movements?|When was the last menstrual period, and could pregnancy be possible?|Any abnormal bleeding, discharge, prior ectopic pregnancy, pelvic infection, or pelvic surgery?',
  'Vaginal bleeding|Vaginal discharge|Dyspareunia|Syncope|Shoulder-tip pain|Vomiting|Rectal bleeding|Dysuria',
  'Assess abdominal localization and guarding|Assess flank findings when relevant|Consider consented supervised external/pelvic examination if indicated|Document chaperone, consent, and components actually performed',
);
add(
  'repro',
  'Abnormal vaginal bleeding',
  'Bleeding volume, cycle pattern, and systemic effects.',
  'When did bleeding begin relative to your usual cycle?|How often are pads or tampons changed, and are there clots or flooding?|Could pregnancy be possible, or are you postpartum or postmenopausal?|Any anticoagulants, contraceptive changes, bleeding after intercourse, or bleeding elsewhere?',
  'Syncope|Palpitations|Dyspnea|Pelvic cramps|Discharge|Easy bruising|Epistaxis|Chest discomfort',
  'Assess perfusion and conjunctival pallor|Assess abdominal tenderness|Consider supervised consented examination to identify bleeding source|Record chaperone and any examination declined or deferred',
);
add(
  'repro',
  'Vaginal discharge',
  'Discharge changes, irritation, and sexual history.',
  'How have amount, color, odor, or consistency changed?|Any itching, burning, pain with intercourse, or urinary discomfort?|Any new sexual partners, barrier use changes, or STI exposure?|Any recent antibiotics, douching, new products, or possibility of a retained object?',
  'Pelvic pain|Abnormal bleeding|Genital sores|Dyspareunia|Dysuria|Skin irritation|Feverishness|Rectal symptoms',
  'Assess abdominal tenderness if symptomatic|Consider consented external inspection for irritation or lesions|Consider supervised speculum examination if indicated|Document consent, chaperone, and specimen collection only if performed',
);
add(
  'repro',
  'Missed period / pregnancy concern',
  'Cycle history, pregnancy possibility, and early symptoms.',
  'When was the last normal period, and are cycles usually regular?|Have you taken a pregnancy test; when and what was the result?|What contraception is used, and were there missed doses or unprotected exposures?|Any prior pregnancy complications, current medicines, or recent weight/exercise changes?',
  'Breast tenderness|Vomiting|Vaginal bleeding|Unilateral pain|Syncope|Shoulder-tip pain|Headache|Galactorrhea',
  'Assess general appearance, vitals, and hydration|Assess abdominal tenderness if present|Review weight trend and thyroid findings when relevant|Use gestation-appropriate examination only when indicated and supervised',
);
system(
  'endo',
  'Endocrine & metabolic',
  'Endocrine',
  ['Family medicine', 'Internal medicine', 'Emergency medicine'],
  'Any diabetes, thyroid disease, steroid exposure, or endocrine family history?|Review diet, supplements, medicines, and recent weight or activity changes.',
  'Weight change|Fatigue|Palpitations|Bowel change|Sleep change|Mood change',
  'Review vital signs and weight trend|Assess hydration, skin, and general appearance',
  [book],
);
add(
  'endo',
  'Excessive thirst / urination',
  'Fluid balance, polyuria, and metabolic symptoms.',
  'How much are you drinking and urinating over a full day?|Did thirst or frequent urination start first, and does it wake you?|Any weight loss, blurred vision, or recurrent infections?|Any diuretics, lithium, steroid use, diabetes history, or recent high glucose results?',
  'Dry mouth|Vomiting|Abdominal pain|Drowsiness|Weakness|Blurred vision|Genital itching|Nocturia',
  'Assess hydration and perfusion|Observe respiratory pattern and alertness|Inspect skin and mucosa|Assess relevant neurologic status if altered',
);
add(
  'endo',
  'Heat intolerance',
  'Temperature sensitivity, adrenergic symptoms, and thyroid context.',
  'Is intolerance constant or episodic, and is there flushing or sweating?|Any tremor, fast heartbeat, bowel frequency, or weight loss despite appetite?|Any neck swelling, eye symptoms, or recent pregnancy?|Any thyroid medicine, supplements, stimulant use, or family thyroid history?',
  'Tremor|Sweating|Loose stools|Eye irritation|Neck fullness|Muscle weakness|Menstrual change|Anxiety',
  'Assess pulse rate and rhythm|Inspect and palpate thyroid as trained|Observe tremor and proximal strength|Assess relevant eye and skin findings',
);
add(
  'endo',
  'Cold intolerance',
  'Cold sensitivity, metabolic symptoms, and systemic context.',
  'When did feeling unusually cold start, and is it generalized?|Any constipation, dry skin, hair changes, or slowed thinking?|Any thyroid surgery, radiation, thyroid medicines, or family thyroid disease?|Any low intake, bleeding, weight change, or reduced activity?',
  'Constipation|Dry skin|Hair loss|Hoarse voice|Heavy periods|Memory change|Swelling|Weakness',
  'Assess pulse and temperature|Inspect skin and hair|Examine thyroid and neck|Assess edema and reflexes if appropriate',
);
add(
  'endo',
  'Weight gain',
  'Weight timeline, appetite, edema, and medication effects.',
  'How much weight was gained and over what period?|Has appetite, diet, activity, sleep, or stress changed?|Is there fluid swelling or a change in waist size?|Any steroid use, new psychotropic medicines, pregnancy possibility, or menstrual changes?',
  'Cold intolerance|Constipation|Easy bruising|Purple striae|Leg edema|Snoring|Dyspnea|Proximal weakness',
  'Review measured weight and blood pressure|Assess edema and hydration|Inspect skin for relevant changes|Assess thyroid and proximal strength if indicated',
);
system(
  'skin',
  'Skin & dermatologic',
  'Dermatology',
  ['Family medicine', 'Internal medicine', 'Emergency medicine'],
  'Any new medicines, skin products, travel, occupational exposure, or affected contacts?|Any personal/family skin disease, allergies, or immune suppression?',
  'Fever|Malaise|Joint pain|Mucosal symptoms|Itching|Skin pain',
  'Review general appearance and systemic symptoms|Inspect distribution and morphology with appropriate exposure and consent',
  [book],
);
add(
  'skin',
  'Rash',
  'Distribution, evolution, morphology, and exposures.',
  'Where did the rash begin, and how has it spread?|Is it itchy, painful, blistering, or changing color?|Any new medicines, recent illness, contacts, or skin products?|Any mouth/eye involvement, facial swelling, fever, or peeling skin?',
  'Blisters|Eye irritation|Oral sores|Facial swelling|Breathlessness|Skin peeling|Nail changes|Photosensitivity',
  'Describe primary lesions, size, and arrangement|Inspect palms, soles, and relevant mucosa|Assess warmth, tenderness, and blanching where appropriate|Document distribution on a body sketch or writing area',
);
add(
  'skin',
  'Pruritus',
  'Localized versus generalized itch and systemic contributors.',
  'Is itch localized or widespread, and was a rash present first?|Is it worse at night, with heat, or after bathing?|Are household contacts itchy, or have there been new exposures?|Any jaundice, dark urine, renal/liver history, or new medication?',
  'Dry skin|Hives|Jaundice|Dark urine|Weight loss|Night sweats|Sleep loss|Excoriations',
  'Inspect for primary lesions versus scratch marks|Inspect relevant finger webs and flexures when appropriate|Assess skin dryness and visible jaundice|Examine accessible nodes if systemic symptoms are present',
);
add(
  'skin',
  'Changing skin lesion',
  'Evolution, bleeding, sun exposure, and lesion history.',
  'How long has the lesion been present, and what has changed?|Any change in size, shape, color, border, or surface?|Does it bleed, itch, hurt, or fail to heal?|Any skin cancer history, sun exposure, tanning, or immune suppression?',
  'Bleeding|Ulceration|Crusting|Tenderness|Local swelling|Other new lesions|Enlarged nodes|Weight loss',
  'Measure and describe lesion location and dimensions|Assess border, color variation, and surface|Compare with surrounding and other relevant lesions|Use dermoscopy only with appropriate training',
);
add(
  'skin',
  'Skin redness / swelling',
  'Local progression, pain, wound history, and systemic effects.',
  'Where did redness begin, and how quickly is it spreading?|Was there a wound, bite, injection, procedure, or water exposure?|How severe is pain, and is it greater than expected from appearance?|Any diabetes, prior similar episodes, immune suppression, or drainage?',
  'Feverishness|Chills|Drainage|Blisters|Numbness|Red streaking|Joint restriction|Dizziness',
  'Assess extent, warmth, tenderness, and skin integrity|Inspect for wounds, drainage, or fluctuance|Assess distal perfusion and sensation|Assess adjacent joint movement when relevant',
);
system(
  'ent',
  'Ear, nose & throat',
  'ENT',
  ['Family medicine', 'Emergency medicine'],
  'Any recent infection, allergy, smoke/noise exposure, dental issues, or prior ENT surgery?|Review medicines, exposures, and impact on eating, sleep, and hearing.',
  'Fever|Headache|Neck swelling|Cough|Malaise|Swallowing difficulty',
  'Assess vital signs and general appearance|Observe voice and ability to manage secretions',
  [book],
);
add(
  'ent',
  'Sore throat',
  'Pain, swallowing, airway symptoms, and infectious context.',
  'How painful is swallowing, and can you drink and handle saliva?|Any muffled voice, difficulty opening the mouth, or one-sided swelling?|Any cough, runny nose, sick contacts, or relevant sexual exposure?|Any recent antibiotics, recurrent episodes, or immune suppression?',
  'Drooling|Stridor|Rash|Ear pain|Nasal congestion|Hoarseness|Dyspnea|Neck stiffness',
  'Inspect oropharynx only when safe and appropriate|Assess tonsillar asymmetry and visible exudate|Palpate relevant neck nodes|Assess neck movement without forcing painful maneuvers',
);
add(
  'ent',
  'Ear pain',
  'External, middle-ear, and referred symptom pattern.',
  'Which ear is painful, and did it follow swimming, flight, or instrumentation?|Any hearing change, discharge, fullness, or tinnitus?|Is pain worse with touching the ear, chewing, or swallowing?|Any trauma, foreign body, diabetes, or prior ear disease?',
  'Vertigo|Sore throat|Dental pain|Facial weakness|Rash|Otorrhea|Hearing loss|Mastoid pain',
  'Inspect pinna and surrounding skin|Assess tragal and mastoid tenderness gently|Perform otoscopy using appropriate technique|Inspect relevant throat, dental, or jaw findings',
);
add(
  'ent',
  'Nasal congestion / sinus pressure',
  'Obstruction, discharge, duration, and facial symptoms.',
  'Is blockage one-sided or bilateral, and how long has it lasted?|What is the nasal discharge like, and has smell changed?|Did symptoms improve then worsen, or follow an allergy exposure?|Any facial swelling, visual symptoms, severe headache, or dental pain?',
  'Sneezing|Itchy eyes|Postnasal drip|Loss of smell|Epistaxis|Facial pain|Eye swelling|Tooth pain',
  'Inspect external nose and periorbital region|Examine nasal mucosa when appropriate|Assess relevant facial tenderness|Inspect oropharynx and dentition',
);
add(
  'ent',
  'Hearing loss / tinnitus',
  'Sudden versus gradual loss and unilateral symptoms.',
  'Did hearing change suddenly or gradually, and in one ear or both?|Is tinnitus pulsatile or continuous, and does it match your heartbeat?|Any noise exposure, ear trauma, new medicine, or recent infection?|Any dizziness, facial weakness, headache, or ear discharge?',
  'Vertigo|Ear pain|Ear fullness|Otorrhea|Facial weakness|Imbalance|Headache|Nausea',
  'Inspect ear canals and tympanic membranes|Assess hearing separately in each ear|Consider tuning fork tests if trained|Assess cranial nerve and gait findings when relevant',
);
system(
  'eye',
  'Eye & visual',
  'Ophthalmology',
  ['Family medicine', 'Emergency medicine'],
  'Any contact lens use, eye surgery, trauma, chemical exposure, or known eye disease?|Establish baseline vision, usual correction, and timing of the change.',
  'Eye pain|Headache|Nausea|Discharge|Photophobia|Double vision',
  'Check visual acuity in each eye with usual correction if feasible|Inspect external eye and pupils without pressure on a possibly injured globe',
  [book],
);
add(
  'eye',
  'Red eye',
  'Painful versus itchy eye, visual change, and exposure.',
  'Is one or both eyes red, and did vision change?|Is there itching, pain, gritty sensation, or discharge?|Any contact lenses, foreign body, chemical exposure, or trauma?|Any marked light sensitivity, halos, headache, or vomiting?',
  'Blurred vision|Tearing|Crusting|Eyelid swelling|Halos|Foreign-body sensation|Fever|Rash',
  'Inspect conjunctiva, cornea, and lids gently|Assess pupil shape and reactions|Assess eye movements and associated pain|Use fluorescein/slit-lamp examination only if appropriate and trained',
);
add(
  'eye',
  'Vision loss / blurred vision',
  'Acuity change, visual-field symptoms, and neurologic context.',
  'Was the change sudden, gradual, transient, or persistent?|Does it affect one eye or both, and all or part of the visual field?|Any flashes, new floaters, curtain-like shadow, or painful eye movement?|Any trauma, diabetes, vascular risks, scalp tenderness, or jaw pain?',
  'Flashes|Floaters|Field loss|Scalp tenderness|Jaw claudication|Weakness|Speech change|Dizziness',
  'Assess visual fields by confrontation|Assess pupil responses and relative asymmetry|Assess eye movements and relevant neurologic signs|Perform fundus assessment if trained without delaying escalation',
);
add(
  'eye',
  'Eye pain',
  'Pain localization, exposure, visual effects, and movement.',
  'Is pain on the surface, deep in the eye, or around it?|Is pain worse with eye movement or light?|Any foreign body, contact lens use, injury, or chemical exposure?|Any reduced vision, halos, nausea, fever, or eyelid swelling?',
  'Redness|Tearing|Blurred vision|Halos|Vomiting|Proptosis|Eyelid swelling|Foreign-body sensation',
  'Assess pupil reactions and symmetry|Assess eye movements and pain|Inspect eyelids, conjunctiva, and visible cornea|Use additional eye examination only within training and indication',
);
add(
  'eye',
  'Double vision',
  'Monocular versus binocular diplopia and associated deficits.',
  'Does double vision resolve when either eye is covered?|Are images side by side, above one another, or tilted?|Does it change with gaze direction, fatigue, or time of day?|Any sudden headache, drooping lid, weakness, trauma, or swallowing difficulty?',
  'Ptosis|Pupil change|Vertigo|Dysarthria|Dysphagia|Weakness|Eye pain|Imbalance',
  'Assess ocular alignment and movements|Assess pupils and ptosis|Compare monocular and binocular viewing when safe|Perform focused cranial nerve and limb examination',
);
system(
  'psych',
  'Mental health',
  'Psychiatry',
  ['Family medicine', 'Psychiatry', 'Emergency medicine'],
  'Review psychiatric/medical history, medicines, substances, trauma, and available support.|Ask directly about self-harm, suicide, harm to others, intent, access to means, and immediate safety.',
  'Sleep change|Appetite change|Concentration change|Substance use|Anxiety|Low mood',
  'Observe appearance, engagement, speech, and psychomotor activity|Assess orientation, attention, and ability to participate',
  [
    src(
      'Clinical Methods: Overview of the Psychiatric System',
      'https://www.ncbi.nlm.nih.gov/books/NBK311/',
    ),
    src(
      'APA: Psychiatric Evaluation of Adults',
      'https://www.psychiatry.org/psychiatrists/practice/clinical-practice-guidelines/adults',
    ),
  ],
);
add(
  'psych',
  'Low mood',
  'Mood course, function, biological symptoms, and safety.',
  'How long have you felt low, and is pleasure or interest reduced?|How have sleep, appetite, energy, guilt, or concentration changed?|Any past periods of unusually high energy with little need for sleep?|What stressors, losses, supports, or protective factors are present?',
  'Anhedonia|Hopelessness|Guilt|Low energy|Agitation|Slowing|Suicidal thoughts|Manic symptoms',
  'Assess reported mood and observed affect|Assess thought process and content|Assess perception and relevant cognition|Document direct safety assessment and protective factors',
);
add(
  'psych',
  'Anxiety / panic',
  'Worry pattern, episodic panic, triggers, and physical symptoms.',
  'Is anxiety ongoing or a sudden episode that peaks rapidly?|What triggers it, and what do you avoid because of it?|What physical symptoms occur, and have medical causes been assessed?|Any caffeine, stimulants, medication changes, withdrawal, or traumatic reminders?',
  'Palpitations|Chest discomfort|Dyspnea|Tremor|Sweating|Paresthesias|Fear of dying|Derealization',
  'Assess mood, affect, and thought content|Assess pulse and respiratory pattern|Assess attention and orientation|Perform symptom-directed physical examination when relevant',
);
add(
  'psych',
  'Insomnia',
  'Sleep schedule, insomnia type, and daytime impact.',
  'Is the problem falling asleep, staying asleep, or waking too early?|What are your bedtime, wake time, naps, and shift-work patterns?|Any snoring, witnessed pauses, restless legs, or unusual sleep behaviors?|Any mood change, pain, caffeine/alcohol use, or sedating/stimulating medicines?',
  'Daytime sleepiness|Snoring|Restless legs|Low mood|Manic symptoms|Nocturia|Reflux|Nightmares',
  'Assess mood, affect, and level of alertness|Assess upper-airway features if indicated|Assess relevant cardiopulmonary findings|Assess relevant neurologic or leg findings',
);
add(
  'psych',
  'Hallucinations / unusual beliefs',
  'Perception, thought content, medical context, and safety.',
  'What are you experiencing, and when did it begin?|Are voices giving commands, and do you feel able to resist them?|Any new medicines, intoxication, withdrawal, fever, or sleep deprivation?|How are these experiences affecting function, trust, and your ability to care for yourself?',
  'Confusion|Inattention|Agitation|Mood elevation|Depression|Seizures|Headache|Self-harm thoughts',
  'Assess thought organization and content|Assess perception and insight without confrontation|Assess cognition, orientation, and attention|Assess vital signs and relevant neurologic/physical findings',
);
system(
  'peds',
  'Pediatric',
  'Pediatrics',
  ['Pediatrics', 'Family medicine', 'Emergency medicine'],
  'Confirm age, gestation/birth history when relevant, immunizations, growth, and baseline behavior.|Ask caregiver concerns, medicines/doses already given, feeding, wet diapers, and sick contacts.',
  'Reduced feeding|Reduced urine|Lethargy|Irritability|Fever|Rash',
  'Assess age-appropriate vital signs and overall interaction|Assess hydration, perfusion, and respiratory effort',
  [
    src(
      'Merck Manual: Fever in Infants and Children',
      'https://www.merckmanuals.com/professional/pediatrics/symptoms-in-infants-and-children/fever-in-infants-and-children',
    ),
    book,
  ],
);
add(
  'peds',
  'Child with fever',
  'Age-specific fever history and caregiver observations.',
  'What temperature was measured, by what route, and at what age?|How is the child behaving between fevers?|Any recent vaccination, travel, exposures, or known immune problem?|Any difficulty breathing, seizure, nonblanching rash, or inability to feed?',
  'Cough|Ear pain|Vomiting|Diarrhea|Dysuria|Neck stiffness|Seizure|Breathing difficulty',
  'Inspect skin and accessible mucosa|Assess ears and throat when safe|Auscultate lungs and heart|Assess abdomen and age-appropriate neurologic interaction',
);
add(
  'peds',
  'Child with cough / wheeze',
  'Breathing symptoms, choking history, and age-appropriate context.',
  'Did symptoms begin suddenly with choking or during feeding?|Is the cough barking, paroxysmal, or associated with wheeze?|Any apnea, color change, noisy inspiration, or difficulty feeding?|Any prior episodes, inhaler use, prematurity, smoke exposure, or atopy?',
  'Stridor|Apnea|Cyanosis|Post-tussive vomiting|Nasal discharge|Chest retractions|Drooling|Chest pain',
  'Observe retractions and air movement|Compare lung sounds and wheeze distribution|Inspect upper airway only when safe|Assess age-appropriate alertness and feeding tolerance by history',
);
add(
  'peds',
  'Child with vomiting / diarrhea',
  'Fluid intake, losses, emesis character, and exposures.',
  'How often are vomiting or loose stools occurring?|Any green vomit, blood, projectile vomiting, or blood/mucus in stool?|How much is the child drinking and how many wet diapers or voids?|Any episodic severe pain, sick contacts, travel, or possible ingestion?',
  'Abdominal pain|Distention|Blood in stool|Bilious vomiting|Thirst|Dry mouth|Weight loss|Drowsiness',
  'Assess mucous membranes and tears|Assess abdominal distention and tenderness gently|Review weight and growth when available|Assess alertness and peripheral perfusion',
);
add(
  'peds',
  'Child with rash',
  'Rash evolution, exposures, and systemic symptoms.',
  'Where did the rash start and how has it spread?|Did fever or illness precede the rash?|Any new medicine, food, skin product, insect exposure, or affected contacts?|Is the rash painful, blistering, associated with swelling, or involving mouth/eyes?',
  'Itching|Blistering|Mouth sores|Red eyes|Joint pain|Facial swelling|Breathlessness|Skin peeling',
  'Describe lesion morphology and distribution|Assess palms, soles, and mucosal findings|Assess blanching when appropriate|Assess relevant nodes and age-appropriate systemic findings',
);
system(
  'heme',
  'Hematologic & lymphatic',
  'Hematology',
  ['Family medicine', 'Internal medicine'],
  'Any bleeding/clotting disorder, cancer, immune condition, or relevant family history?|Review anticoagulants, antiplatelets, supplements, alcohol, and recent infections.',
  'Fatigue|Fever|Weight loss|Night sweats|Dizziness|Dyspnea',
  'Review vital signs, perfusion, and general appearance|Inspect visible skin and mucosa for pallor or bleeding',
  [book],
);
add(
  'heme',
  'Easy bruising / bleeding',
  'Bleeding sites, severity, medication history, and family pattern.',
  'Is bleeding spontaneous or after minor injury, and when did it start?|Any nose/gum bleeding, heavy periods, blood in urine/stool, or prolonged procedure bleeding?|Any large deep bruises or painful joint swelling?|Any new medicine, liver disease, nutritional issue, or family bleeding history?',
  'Petechiae|Epistaxis|Gum bleeding|Hematuria|Black stools|Heavy menses|Joint swelling|Headache',
  'Describe bruise distribution and size|Inspect for petechiae and mucosal bleeding|Assess joint swelling when present|Assess abdomen and nodes if indicated',
);
add(
  'heme',
  'Enlarged lymph node',
  'Node distribution, infection history, and systemic features.',
  'Where was the lump first noticed and is it growing?|Is it tender, and does it fluctuate with illness?|Any throat/dental infection, skin wound, animal exposure, travel, or recent vaccination?|Any persistent fever, drenching sweats, weight loss, or other lumps?',
  'Sore throat|Dental pain|Skin lesion|Cough|Pruritus|Early satiety|Abdominal fullness|Recurrent infection',
  'Assess node location, size, tenderness, and mobility|Inspect regional skin and drainage areas|Assess other accessible node groups|Assess abdomen for relevant findings if indicated',
);
add(
  'heme',
  'Pallor / anemia concern',
  'Symptoms, bleeding and nutritional context.',
  'Was anemia found on a test, and what were the result and previous values?|Any bleeding, heavy periods, dark stools, or recent donation?|What is your diet, and any malabsorption or prior GI surgery?|Any chest symptoms, exertional limitation, pica, or prior anemia treatment?',
  'Palpitations|Syncope|Chest pain|Pica|Restless legs|Jaundice|Numbness|Glossitis',
  'Assess conjunctiva and oral mucosa|Assess pulse and heart sounds|Inspect for jaundice or bleeding signs|Perform relevant abdominal and neurologic examination',
);
add(
  'heme',
  'Recurrent infections',
  'Infection pattern, organisms, exposure, and immune context.',
  'What infections occurred, how often, and were organisms identified?|Have infections required admission, IV treatment, or unusual antibiotics?|Any unusual sites, poor healing, chronic diarrhea, or thrush?|Any immunosuppressive medicines, diabetes, HIV exposure concern, or family immune history?',
  'Oral thrush|Skin abscesses|Chronic cough|Diarrhea|Sinus symptoms|Poor wound healing|Weight loss|Night sweats',
  'Inspect oral cavity and skin for relevant findings|Assess accessible lymph nodes|Assess lungs and upper airway|Inspect infection sites as appropriate and consented',
);
for (const s of systems) {
  const [hpi, ros, exam] = generalDetails[s.id];
  const title =
    s.id === 'general'
      ? 'General & constitutional assessment'
      : `General ${s.name.toLowerCase()} assessment`;
  complaintHpi[title] = split(hpi);
  add(
    s.id,
    title,
    `Broad ${s.short.toLowerCase()} history, symptom review, and examination.`,
    hpi,
    ros,
    exam,
  );
  outlines[outlines.length - 1].kind = 'general';
}
for (const [systemId, title, hpi, ros, exam] of focusedDetails) {
  complaintHpi[title] = split(hpi);
  add(
    systemId,
    title,
    'Focused history, associated symptoms, and examination checklist.',
    hpi,
    ros,
    exam,
  );
}
// Keep each broad assessment easy to find before its focused complaints.
outlines.sort(
  (a, b) => Number(b.kind === 'general') - Number(a.kind === 'general'),
);
const directSpecialties: Record<string, string[]> = {
  general: ['General practice'],
  cardio: ['Cardiology'],
  resp: ['Pulmonology'],
  gi: ['Gastroenterology'],
  neuro: ['Neurology'],
  msk: ['Orthopedics', 'Rheumatology'],
  renal: ['Nephrology', 'Urology'],
  repro: ['Obstetrics & gynecology'],
  endo: ['Endocrinology'],
  skin: ['Dermatology'],
  ent: ['Otolaryngology'],
  eye: ['Ophthalmology'],
  psych: ['Psychiatry'],
  peds: ['Pediatrics'],
  heme: ['Hematology'],
};
for (const system of systems)
  system.specialties = [
    ...new Set([
      ...system.specialties,
      ...(directSpecialties[system.id] || []),
    ]),
  ];
export const specialties = [
  'All specialties',
  ...new Set(systems.flatMap((s) => s.specialties)),
];
for (const specialty of specialties.slice(1)) {
  const [systemId, context] = specialtyDetails[specialty];
  const title = `${specialty} - general visit`;
  const [, ros, exam] = generalDetails[systemId];
  const fields = [...broadVisitFields, ...split(context)];
  complaintHpi[title] = fields;
  add(
    systemId,
    title,
    `Broad ${specialty.toLowerCase()} intake and follow-up: baseline health, interval changes, care history, and goals.`,
    fields.join('|'),
    ros,
    exam,
  );
  Object.assign(outlines[outlines.length - 1], {
    kind: 'specialty',
    specialty,
    reviewRos: broadReview,
  });
}
for (const specialty of specialties.slice(1)) {
  const [systemId] = specialtyDetails[specialty];
  for (const row of complaintSets[specialtySets[specialty]]
    .trim()
    .split('\n')) {
    const [title, history, symptoms, exam] = row
      .split('~')
      .map((s) => s.trim());
    const clinicalSystemId = complaintSystems[title] || systemId;
    const system = systems.find((s) => s.id === clinicalSystemId)!;
    const [, systemSymptoms, systemExams] = generalDetails[clinicalSystemId];
    const hpi = [
      ...split(history),
      'Relevant diagnoses / procedures',
      'Prior complaint evaluation',
      'Measures tried / response',
      'Effect on daily function',
    ];
    let associated = split(symptoms);
    let review: string[] = [];
    if (symptomOverrides[title]) {
      associated = split(symptomOverrides[title][0]);
      review = split(symptomOverrides[title][1]);
    }
    add(
      clinicalSystemId,
      title,
      `${specialty}: ${split(history).slice(0, 3).join('; ').toLowerCase()}.`,
      hpi.join('|'),
      associated.join('|'),
      [...split(exam), ...split(systemExams)].join('|'),
    );
    Object.assign(outlines[outlines.length - 1], {
      id: `common-${specialty.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${outlines[outlines.length - 1].id}`,
      kind: 'focused',
      specialty,
      hpi,
      reviewRos: review,
      completeExam: true,
      expansion: true,
      sources: [book],
    });
  }
}
outlines.sort(
  (a, b) => Number(b.kind === 'specialty') - Number(a.kind === 'specialty'),
);
export function matchesSpecialty(o: Outline, specialty: string) {
  return (
    specialty === 'All specialties' ||
    (o.specialty
      ? o.specialty === specialty
      : getSystem(o).specialties.includes(specialty))
  );
}
export function sourcesFor(o: Outline) {
  return o.sources || getSystem(o).sources;
}
export function reviewFor(o: Outline) {
  return o.reviewRos ?? (o.kind === 'general' || o.kind === 'specialty' ? getSystem(o).ros : []);
}
export function getSystem(o: Outline) {
  return systems.find((s) => s.id === o.system)!;
}
export function hpiFor(o: Outline) {
  return o.hpi || complaintHpi[o.title];
}
export function questionsFor(o: Outline) {
  return [
    ...groupsFor(o).flatMap((g) => g.fields),
    ...exposuresFor(o),
    ...hpiFor(o),
    ...additionalHpiFields,
  ];
}
export function symptomsFor(o: Outline) {
  return [...new Set([...o.ros, ...reviewFor(o)])];
}
export function examsFor(o: Outline) {
  return o.completeExam
    ? o.exams
    : [...new Set([...getSystem(o).exam, ...o.exams])];
}

export function differentialsFor(o: Outline) {
  if (o.customDiagnoses) return o.customDiagnoses;
  return o.kind === 'general' || o.kind === 'specialty'
    ? systemDifferentials[o.system]
    : differentials[o.title];
}
