export const hpiGroups = [
  {
    label: 'O / Onset',
    fields: ['Date / time', 'Sudden / gradual', 'Initial symptoms'],
  },
  {
    label: 'P / Previously happened',
    fields: [
      'Previous occurrence / number',
      'Similarity / differences',
      'Prior evaluation / results',
    ],
  },
  {
    label: 'P / Palliative factors',
    fields: [
      'Relieving factors',
      'Measures tried / response',
      'Degree / duration of relief',
    ],
  },
  {
    label: 'P / Provoking factors',
    fields: ['Triggers', 'Aggravating factors', 'Reproducibility'],
  },
  {
    label: 'Q / Quality of pain',
    fields: ['Pain / symptom description', 'Character', 'Change in quality'],
  },
  { label: 'R / Region', fields: ['Location', 'Side', 'Extent / depth'] },
  {
    label: 'R / Radiation',
    fields: ['Present / absent', 'Destination', 'Pattern'],
  },
  {
    label: 'S / Setting',
    fields: [
      'Activity at onset',
      'Environment / circumstances',
      'Relevant context',
    ],
  },
  {
    label: 'S / Severity',
    fields: [
      'Current / worst (scale if useful)',
      'Baseline comparison',
      'Functional limitation',
    ],
  },
  {
    label: 'T / Timing',
    fields: [
      'Constant / intermittent',
      'Episode duration / frequency',
      'Course / progression',
    ],
  },
];
export const hpiFields = hpiGroups.map((g) => g.label);
export const exposureFields = [
  'Sick contacts',
  'Recent travel / destination',
  'Travel dates / return',
  'Occupational / environmental exposure',
  'Food / water / animal / insect exposure',
  'New medicine / procedure / injury',
];
export const additionalHpiFields = [
  'Treatments tried / dose / duration',
  'Benefit / side effects',
  'Previous testing / available results',
  'Impact on eating / sleep / activity',
  'Source / reliability / collateral history',
  'Main concern / priorities',
];
export const allergyTypes = ['Contact', 'Food', 'Environment', 'Drugs'];
const split = (s: string) => s.split('|').map((v) => v.trim());
export const complaintHpi: Record<string, string[]> = Object.fromEntries(
  Object.entries({
    Fever:
      'Maximum temperature|Measurement route / device|Fever pattern|Rigors / chills|Antipyretic / response|Sick contacts / exposure timing|Travel / return dates|Animal / insect exposures|Recent procedure / device|Immune suppression|Recent antibiotics|Localizing symptoms',
    Fatigue:
      'Fatigue / sleepiness / weakness|Daily pattern|Activity tolerance|Work / school limitation|Sleep hours / quality|Snoring / witnessed pauses|Mood / motivation|Diet / food access|Bleeding history|Recent infection|Medication changes|Previous fatigue evaluation',
    'Unintentional weight loss':
      'Amount lost / interval|Measured / estimated weight|Intentional / unintentional|Appetite|Food intake / access|Chewing / swallowing|Early satiety|Bowel habit change|Pain / meal relationship|Activity change|Substance use|Prior weight trajectory',
    'Night sweats':
      'Frequency / duration|Drenching / clothes / bedding|Room temperature / bedding|Measured fever|Flushing / episodes|Sleep interruption / nightmares|Low-glucose symptoms|Travel / TB exposure|Persistent infection|Medication changes|Menstrual changes|Alcohol / withdrawal context',
    'Chest pain':
      'Chest location / extent|Pressure / sharp / burning|Exertional relationship|Breathing relationship|Meal relationship|Movement / positional relationship|Episode duration|Rest / medication response|Arm / jaw / back radiation|Difference from prior episodes|Cardiac / vascular history|Family history / stimulant exposure',
    Palpitations:
      'Fast / pounding / skipped beats|Regular / irregular sensation|Abrupt / gradual onset|Abrupt / gradual termination|Episode duration / frequency|Pulse recorded during episode|Exertion / rest|Caffeine / stimulant exposure|Medication / decongestant use|Associated fainting|Previous rhythm evaluation|Family sudden-death history',
    Syncope:
      'Activity / position before event|Prodrome|Exertional relationship|Triggers / situational context|Witness description|Duration unresponsive|Movements / tongue injury|Incontinence|Injury|Recovery time / confusion|Prior episodes / testing|Cardiac history / family history',
    'Leg swelling':
      'Unilateral / bilateral|Onset speed|Distribution / progression|Elevation / overnight response|Pain / redness / warmth|Recent travel / immobility|Recent surgery / injury|Prior clot / swelling|Medication changes|Weight change|Urine output|Cardiac / renal / liver history',
    Cough:
      'Dry / productive|Sputum amount|Sputum color / consistency|Blood / amount|Nocturnal pattern|Meals / lying-flat relationship|Exercise / irritant relationship|Choking / abrupt onset|Postnasal / reflux symptoms|Smoking / vaping / occupation|ACE inhibitor / medication changes|Previous cough / treatment response',
    'Shortness of breath':
      'Sudden / gradual onset|Rest / exertion|Walking / stair threshold|Change from baseline|Orthopnea / pillow count|Nocturnal awakening|Episode duration|Triggers / relieving factors|Recent travel / immobility|Recent surgery / procedure|Previous clot / lung history|Inhaler / oxygen baseline',
    Wheezing:
      'Inspiratory / expiratory noise|Localized / generalized sensation|Abrupt / gradual onset|Exercise / weather triggers|Allergen / irritant exposure|Infection relationship|Feeding / choking event|Prior asthma / atopy|Inhaler use / technique|Response to usual measures|Prior admissions / emergency visits|Medication / food trigger',
    Hemoptysis:
      'Cough / vomit / nasal source|Amount / frequency|Fresh blood / clots|Sputum mixture|Ongoing / resolved bleeding|Persistent cough history|TB / infection exposure|Prior lung disease / cancer|Smoking history|Anticoagulant use|Other bleeding / bruising|Procedure / trauma / clot history',
    'Abdominal pain':
      'Initial / current location|Migration / radiation|Constant / colicky pattern|Meal relationship|Stool / gas relationship|Movement / positional relationship|Sequence of pain and vomiting|Last stool / flatus|Urinary / flank symptoms|Menstrual / pregnancy context|Previous abdominal surgery|Prior similar episodes / evaluation',
    'Nausea & vomiting':
      'Frequency / amount|Food / blood / coffee-ground material|Green / bilious emesis|Meal relationship|Pain before / after vomiting|Fluid tolerance|Urine output|Recent intake / sick contacts|Travel / food exposure|Medication / substance exposure|Cannabis / alcohol use|Pregnancy possibility',
    Diarrhea:
      'Stool frequency / volume|Watery / greasy / formed|Blood / mucus|Urgency / tenesmus|Nocturnal stools|Fasting / food relationship|Fluid intake / urine output|Travel / water exposure|Sick contacts|Antibiotic / admission history|Prior episodes / bowel history|Weight change',
    Constipation:
      'Baseline / current stool frequency|Last stool / flatus|Stool consistency|Straining|Incomplete emptying|Manual assistance|Pain / bloating|Blood / stool change|Fluid / fiber intake|Activity / routine change|Opioids / iron / other medicines|Laxatives / response',
    Headache:
      'Sudden / maximal-at-onset pattern|First / different / recurrent headache|Location / character|Exertion / cough relationship|Postural relationship|Sleep / menstrual relationship|Aura / visual symptoms|Fever / neck stiffness|New neurologic symptoms|Trauma / procedure history|Medication use / frequency|Pregnancy / postpartum context',
    'Dizziness / vertigo':
      'Spinning / presyncope / imbalance|Continuous / episodic pattern|Episode duration|Standing / head-movement triggers|Symptoms between episodes|Walking ability|Hearing change / laterality|Tinnitus / ear fullness|Headache / neck pain|Focal neurologic symptoms|Medication / fluid-loss context|Previous episodes / testing',
    Weakness:
      'True power loss / fatigue / pain|Sudden / progressive pattern|Proximal / distal distribution|Unilateral / bilateral|Specific tasks affected|Fatigability / repeated use|Fluctuation through day|Sensory symptoms|Swallowing / speech / breathing|Bladder / bowel change|Recent infection / exposure|Medication / neurologic history',
    'Numbness / tingling':
      'Exact sensory distribution|Reduced / burning / tingling|Unilateral / bilateral|Spread / progression|Continuous / intermittent|Posture / repetitive-use relationship|Neck / back pain|Associated power loss|Saddle sensory change|Bladder / bowel change|Injury / exposure history|Prior neurologic / metabolic history',
    'Low back pain':
      'Midline / paraspinal location|Leg radiation / below knee|Lifting / trauma / activity|Movement / rest relationship|Night pain|Morning stiffness|Walking / sitting tolerance|Leg weakness / sensory change|Saddle sensation|Bladder / bowel function|Fever / cancer / infection context|Prior injury / surgery / episodes',
    'Knee pain':
      'Twist / impact / gradual onset|Pop / injury mechanics|Pain location|Immediate / delayed swelling|Weight-bearing ability|Locking / catching|Giving way / instability|Range limitation|Redness / warmth|Prior injury / surgery|Activity / overuse pattern|Hip / ankle / calf symptoms',
    'Shoulder pain':
      'Fall / lifting / overhead activity|Pain location / radiation|Active / passive limitation|Overhead reach|Behind-back reach|Weakness / stiffness|Night pain|Instability / prior dislocation|Neck relationship|Hand sensory / motor symptoms|Chest / breathing symptoms|Previous injury / treatment',
    'Multiple joint pain':
      'Joints involved|Sequence of involvement|Symmetry|Morning stiffness duration|Swelling / warmth|Activity / rest relationship|Functional limitation|Skin / nail disease|Eye symptoms|Bowel / urinary symptoms|Recent infection|Autoimmune / family history',
    'Painful urination':
      'Start / throughout / after voiding|Internal / external discomfort|Frequency / urgency|Urine volume|Blood in urine|Discharge / irritation|Genital lesions|Sexual exposure / barrier use|Pregnancy context|Fever / flank pain|Prior infection / cultures|Catheter / instrumentation',
    'Blood in urine':
      'Visible / test-detected blood|Color / amount|Initial / terminal / throughout|Clots|Painful / painless|Retention / voiding change|Exercise / trauma|Menstrual contamination|Smoking / occupational exposure|Anticoagulant use|Stone / infection history|Previous urinary evaluation',
    'Flank pain':
      'Side / exact location|Constant / colicky pattern|Groin radiation|Urinary discomfort|Blood in urine|Last normal urination|Fever / rigors|Nausea / fluid tolerance|Previous stones / infection|Single kidney / urinary surgery|Trauma / activity relationship|Pregnancy possibility',
    'Urinary frequency':
      'Small frequent voids / polyuria|Daytime frequency|Nocturia count|Fluid / caffeine intake|Urgency|Leakage pattern|Weak stream / hesitancy|Incomplete emptying|Pain / blood|Thirst / weight change|Diuretic / medication use|Pregnancy context',
    'Pelvic pain':
      'Side / central location|Sudden / recurrent pattern|Menstrual relationship|Intercourse relationship|Urination / bowel relationship|Last menstrual period|Pregnancy possibility|Bleeding / discharge|Prior ectopic pregnancy|Prior pelvic infection|Pelvic / abdominal surgery|Previous episodes / investigations',
    'Abnormal vaginal bleeding':
      'Onset / cycle relationship|Usual cycle pattern|Pad / tampon frequency|Flooding / clots|Bleeding duration|Intermenstrual / postcoital bleeding|Pregnancy possibility|Postpartum / postmenopausal context|Contraceptive changes|Anticoagulant use|Bleeding elsewhere|Dizziness / exertional symptoms',
    'Vaginal discharge':
      'Amount|Color / consistency|Odor|Itching / burning|Dyspareunia|Urinary discomfort|Bleeding / pelvic pain|New partner / STI exposure|Barrier use|Recent antibiotics|Douching / new products|Retained-object possibility',
    'Missed period / pregnancy concern':
      'Last normal period|Usual cycle regularity|Pregnancy test date / result|Contraception / missed doses|Unprotected exposure timing|Prior pregnancies / complications|Bleeding / pelvic pain|Nausea / breast symptoms|Medication use|Weight / exercise change|Stress / recent illness|Prior menstrual changes',
    'Excessive thirst / urination':
      'Daily fluid intake|Daily urine volume|Thirst / urination sequence|Nocturia|Onset / progression|Weight change|Vision change|Recurrent infections|Recent glucose results|Diabetes history|Diuretic / lithium / steroid use|Intake / output imbalance',
    'Heat intolerance':
      'Constant / episodic pattern|Sweating / flushing|Palpitations|Tremor|Weight / appetite change|Bowel frequency|Neck swelling|Eye symptoms|Thyroid medicine / supplements|Stimulant exposure|Pregnancy / postpartum context|Family thyroid history',
    'Cold intolerance':
      'Generalized / localized|Onset / progression|Constipation|Skin / hair change|Thinking / energy change|Weight change|Food intake|Bleeding history|Thyroid surgery / radiation|Thyroid medicine use|Family thyroid history|Activity / environmental context',
    'Weight gain':
      'Amount / interval|Measured weight trend|Appetite / diet change|Activity change|Sleep / stress change|Fluid swelling|Waist-size change|Steroid exposure|New psychotropic medicines|Pregnancy possibility|Menstrual change|Prior weight trajectory',
    Rash: 'Initial site|Spread / distribution|Appearance / evolution|Itch / pain|Blistering / peeling|Mouth / eye involvement|New medicine / timing|New product / exposure|Recent infection|Affected contacts|Travel / bites|Previous episodes / response',
    Pruritus:
      'Localized / generalized|Rash before / after itch|Nocturnal pattern|Heat / bathing relationship|Household contacts|New exposures / products|New medicines|Jaundice / urine change|Liver / kidney history|Sleep impact|Scratch injury|Measures tried / response',
    'Changing skin lesion':
      'Duration|Size change|Shape / border change|Color change|Surface change|Bleeding|Itch / pain|Nonhealing / ulceration|Sun / tanning exposure|Personal skin cancer history|Family skin cancer history|Immune suppression',
    'Skin redness / swelling':
      'Initial site / extent|Speed of spread|Pain severity|Pain / appearance relationship|Wound / bite / injection|Procedure / water exposure|Drainage|Blisters / sensory change|Fever / systemic symptoms|Diabetes / immune suppression|Prior episodes|Adjacent joint limitation',
    'Sore throat':
      'Swallowing pain|Fluid tolerance|Secretion handling|Muffled voice|Mouth-opening limitation|Unilateral swelling|Cough / nasal symptoms|Sick contacts|Relevant sexual exposure|Recent antibiotics|Recurrent episodes|Immune suppression',
    'Ear pain':
      'Side|Swimming / flight exposure|Instrumentation / foreign body|Hearing change|Discharge|Fullness / tinnitus|Touch-related pain|Chewing / swallowing relationship|Trauma|Diabetes / immune suppression|Prior ear disease / surgery|Dental / throat symptoms',
    'Nasal congestion / sinus pressure':
      'Unilateral / bilateral blockage|Duration|Discharge character|Smell change|Initial improvement / worsening|Allergy / exposure relationship|Facial pain / pressure|Dental symptoms|Facial / eye swelling|Visual symptoms|Severe headache|Previous episodes / treatment',
    'Hearing loss / tinnitus':
      'Sudden / gradual onset|Unilateral / bilateral|Degree / functional impact|Pulsatile / nonpulsatile tinnitus|Heartbeat synchrony|Noise exposure|Trauma|New medicines|Recent infection|Discharge / fullness|Dizziness / imbalance|Facial weakness / headache',
    'Red eye':
      'Unilateral / bilateral|Vision change|Itch / pain / gritty sensation|Discharge character|Contact lens use|Foreign body|Chemical exposure|Trauma|Photophobia|Halos|Headache / vomiting|Previous eye disease / surgery',
    'Vision loss / blurred vision':
      'Sudden / gradual|Transient / persistent|One eye / both eyes|Whole / partial field|Flashes|New floaters|Curtain / shadow|Eye-movement pain|Trauma|Diabetes / vascular history|Scalp tenderness / jaw pain|Baseline vision / correction',
    'Eye pain':
      'Surface / deep / periorbital|Pain with eye movement|Light sensitivity|Foreign-body exposure|Contact lens use|Injury|Chemical exposure|Vision change|Halos|Nausea / vomiting|Fever / eyelid swelling|Previous eye disease',
    'Double vision':
      'Monocular / binocular|Response to covering either eye|Horizontal / vertical / tilted|Gaze-direction relationship|Fatigue relationship|Time-of-day pattern|Headache onset|Ptosis|Pupil change|Weakness / swallowing symptoms|Trauma|Previous episodes',
    'Low mood':
      'Duration / course|Interest / pleasure|Sleep pattern|Appetite / weight|Energy / psychomotor change|Guilt / hopelessness|Concentration|Function / self-care|Prior elevated mood / reduced sleep need|Stressors / losses|Support / protective factors|Safety / self-harm / intent / means',
    'Anxiety / panic':
      'Persistent worry / discrete episodes|Time to peak|Episode duration|Triggers|Avoidance|Physical symptoms|Functional impairment|Prior medical assessment|Caffeine / stimulant use|Medicine changes / withdrawal|Traumatic reminders|Safety / supports',
    Insomnia:
      'Sleep-onset / maintenance / early waking|Bedtime / wake time|Sleep latency / awakenings|Naps|Shift work / routine|Snoring / witnessed pauses|Restless legs|Unusual sleep behaviors|Daytime impact|Mood / pain|Caffeine / alcohol|Sedating / stimulating medicines',
    'Hallucinations / unusual beliefs':
      'Experience / content|Onset / course|Frequency / context|Command content|Ability to resist commands|Distress / conviction|Function / self-care|Sleep deprivation|Intoxication / withdrawal|New medicines|Fever / confusion|Safety / support / collateral history',
    'Child with fever':
      'Exact age / gestation|Peak temperature / route|Fever duration / pattern|Behavior between fevers|Feeding / fluid intake|Wet diapers / urine|Medicine / dose / response|Recent vaccination|Travel / contacts|Immune history|Breathing / rash / seizures|Caregiver concerns / baseline',
    'Child with cough / wheeze':
      'Abrupt onset / choking|Feeding relationship|Barking / paroxysmal cough|Wheeze / inspiratory noise|Apnea / color change|Work of breathing|Feeding / fluid tolerance|Prior episodes|Inhaler use / response|Prematurity|Smoke exposure / atopy|Immunizations / contacts',
    'Child with vomiting / diarrhea':
      'Age / baseline feeding|Vomiting frequency / amount|Green / bloody / projectile emesis|Stool frequency / character|Blood / mucus in stool|Intake / fluid tolerance|Wet diapers / urine|Episodic severe pain|Weight / growth change|Sick contacts / travel|Food exposure|Possible ingestion',
    'Child with rash':
      'Initial site|Spread / evolution|Fever before / after rash|Itch / pain|Blisters / peeling|Mouth / eye involvement|Facial swelling|Medicine / food exposure|Skin products / bites|Affected contacts|Feeding / behavior change|Immunizations / recent illness',
    'Easy bruising / bleeding':
      'Spontaneous / trauma-related|Onset / prior pattern|Bruise location / size|Nose / gum bleeding|Menstrual bleeding|Urine / stool blood|Procedure / dental bleeding|Deep bruises / joint swelling|New medicines / supplements|Liver / nutritional history|Family bleeding history|Amount / duration of bleeding',
    'Enlarged lymph node':
      'Initial location|Size / growth|Tenderness|Fluctuation with illness|Other node regions|Throat / dental infection|Skin wound / drainage area|Animal exposure|Travel / vaccination|Fever pattern|Drenching sweats / weight change|Prior episodes / evaluation',
    'Pallor / anemia concern':
      'Test result / date|Prior hemoglobin trend|Bleeding sites|Menstrual blood loss|Dark stools|Recent donation|Diet / restrictions|Malabsorption / GI surgery|Exertional limitation|Chest symptoms / palpitations|Pica / restless legs|Prior treatment / response',
    'Recurrent infections':
      'Infection sites|Frequency / onset age|Organisms / culture results|Admissions / IV treatment|Unusual antibiotics|Treatment response / recurrence|Poor healing|Chronic diarrhea / thrush|Immune-suppressing medicines|Diabetes history|Relevant HIV exposure context|Family immune history',
  }).map(([key, value]) => [key, split(value)]),
);
