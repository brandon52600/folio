// Each row: title ~ six complaint-specific history labels ~ four symptoms ~ two targeted exam components.
// Reused presentations receive specialty-specific context when instantiated in the catalog.
export const complaintSets: Record<string, string> = {
  primary: `
Seasonal allergy symptoms ~ Season / exposure pattern|Indoor / outdoor triggers|Nasal / eye involvement|Sleep disruption|OTC products / response|Asthma / atopy history ~ Sneezing|Nasal itch|Watery eyes|Postnasal drip ~ Nasal mucosa / secretions|Conjunctiva / oropharynx
Medication side effects ~ Suspected medicine / dose|Start / dose-change dates|Symptom-dose relationship|Missed / extra doses|Other medicines / supplements|Prior reactions ~ Nausea|Dizziness|Rash|Somnolence ~ Mental status / vital signs|Skin / hydration / symptom-directed examination
Recurrent falls ~ Fall circumstances|Trip / collapse distinction|Prodrome / loss of consciousness|Injury / head strike|Footwear / home hazards|Assistive device use ~ Imbalance|Lightheadedness|Weakness|Vision change ~ Gait / balance when safe|Neurologic / injury / footwear assessment
Muscle cramps ~ Muscle distribution|Night / exertion pattern|Episode duration|Fluid losses|Medication changes|Exercise load ~ Spasm|Muscle tenderness|Weakness|Paresthesia ~ Muscle tenderness / strength|Peripheral pulses / hydration
Snoring ~ Witnessed apneas|Gasping episodes|Sleep schedule|Daytime sleepiness|Alcohol / sedatives|Nasal obstruction ~ Morning headache|Dry mouth|Fatigue|Poor concentration ~ Oropharynx / nasal patency|Neck circumference / cardiopulmonary examination
Bloating / excess gas ~ Meal relationship|Food triggers|Stool pattern|Visible distension|Early satiety|Weight trajectory ~ Belching|Flatulence|Abdominal discomfort|Constipation ~ Abdominal distension / tenderness|Hydration / nutritional status
Heel pain ~ First-step pain|Activity relationship|Footwear changes|Training load|Trauma|Ability to bear weight ~ Heel tenderness|Morning stiffness|Swelling|Numbness ~ Heel / plantar fascia palpation|Gait / ankle motion / neurovascular status
Hair shedding ~ Diffuse / patchy pattern|Shedding timeline|Recent illness / pregnancy|Diet / weight changes|Hair practices|Medication changes ~ Scalp itch|Scaling|Fatigue|Cold intolerance ~ Scalp distribution / inflammation|Hair shafts / skin / nails
Painful mouth sores ~ Number / location|Recurrence pattern|Healing duration|Food / product triggers|Dental trauma|Immune suppression ~ Oral pain|Dysphagia|Fever|Genital ulcers ~ Oral / pharyngeal inspection|Hydration / regional lymph nodes
Excessive daytime sleepiness ~ Sleep duration|Shift work|Snoring / apnea|Unintentional naps|Driving / work safety|Sedating medicines ~ Fatigue|Morning headache|Poor concentration|Mood change ~ Alertness / attention|Airway / neurologic examination as indicated
`,
  emergency: `
Minor head injury ~ Mechanism / time|Loss of consciousness|Amnesia|Vomiting episodes|Anticoagulant use|Behavior / baseline change ~ Headache|Dizziness|Confusion|Visual change ~ Mental status / pupils / focal neurologic exam|Scalp / skull / cervical injury assessment
Laceration / open wound ~ Mechanism / object|Time since injury|Contamination / foreign body|Bleeding / control measures|Tetanus history|Numbness / movement loss ~ Pain|Bleeding|Tingling|Weakness ~ Wound depth / contamination|Distal tendon / motor / sensory / perfusion assessment
Ankle injury ~ Inversion / eversion mechanism|Immediate weight bearing|Current walking ability|Swelling timeline|Prior injury|Pain location ~ Swelling|Bruising|Instability|Numbness ~ Bony / ligament tenderness|Neurovascular status / gait when safe
Allergic reaction / hives ~ Suspected trigger|Exposure-to-symptom interval|Airway symptoms|Systems involved|Prior severe reaction|Treatment before arrival ~ Hives|Lip swelling|Wheeze|Vomiting ~ Airway / voice / breathing / perfusion|Skin / mucosal swelling
Acute dental pain ~ Tooth / jaw location|Hot / cold sensitivity|Chewing relationship|Facial swelling|Recent dental procedure|Immune suppression ~ Fever|Trismus|Dysphagia|Drainage ~ Dentition / gingiva / oral floor|Facial swelling / airway / neck assessment
Foreign body in skin ~ Object / material|Entry site|Time / mechanism|Removal attempts|Contamination|Tetanus history ~ Pain|Redness|Drainage|Numbness ~ Entry wound / localization|Distal motor / sensory / vascular assessment
Burn injury ~ Heat / chemical / electrical source|Exposure duration|Enclosed-space exposure|First aid|Body areas involved|Circumferential involvement ~ Pain|Blistering|Hoarseness|Dyspnea ~ Burn depth / extent|Airway / perfusion / distal neurovascular examination
Alcohol intoxication concern ~ Intake / timing|Co-ingestants|Trauma / falls|Baseline use|Withdrawal history|Collateral / safety context ~ Vomiting|Confusion|Unsteady gait|Somnolence ~ Airway / breathing / mental status|Trauma survey / focal neurologic findings
Acute back strain ~ Lifting / injury mechanism|Pain distribution|Leg radiation|Weakness / sensory change|Bowel / bladder change|Fever / cancer / injection exposure ~ Spasm|Stiffness|Leg pain|Saddle numbness ~ Spine tenderness / movement when safe|Lower limb motor / sensory / reflex examination
Painful skin abscess ~ Site / duration|Size progression|Drainage|Prior abscesses|Diabetes / immune suppression|Injection / shaving exposure ~ Pain|Redness|Fever|Chills ~ Fluctuance / surrounding erythema|Regional nodes / systemic appearance
`,
  cardio: `
Breathlessness on exertion ~ Walking / stair threshold|Change from baseline|Rest recovery time|Chest symptom relationship|Weight / edema trend|Cardiac testing history ~ Orthopnea|Nocturnal dyspnea|Fatigue|Palpitations ~ Neck veins / lung bases|Heart sounds / peripheral edema
Low blood pressure / lightheadedness ~ Home BP / pulse|Postural relationship|Fluid losses|Medication timing|Syncope history|Bleeding history ~ Presyncope|Weakness|Blurred vision|Nausea ~ Orthostatic vitals when safe|Perfusion / volume status
Slow heart rate ~ Recorded rate / method|Baseline pulse|Exercise response|Rate-slowing medicines|Syncope / near-syncope|Device history ~ Fatigue|Dizziness|Exercise intolerance|Chest discomfort ~ Pulse / rhythm / perfusion|Cardiac auscultation / volume assessment
Fast heart rate ~ Recorded rate|Rest / exertion pattern|Abrupt / gradual episodes|Fever / fluid loss|Stimulants|Prior rhythm recordings ~ Palpitations|Dyspnea|Dizziness|Chest tightness ~ Rate / rhythm / hemodynamic status|Thyroid / hydration / cardiac examination
Irregular pulse alert ~ Device / alert timing|Recorded rhythm strips|Episode burden|Activity at alert|Stroke / bleeding history|Rate-control medicines ~ Palpitations|Fatigue|Dyspnea|Presyncope ~ Pulse deficit / rhythm|Heart / lung / focal neurologic assessment
Heart murmur concern ~ Detection circumstances|Prior echocardiogram|Childhood / rheumatic history|Exercise capacity|Family valve disease|Recent infection ~ Exertional dyspnea|Chest discomfort|Syncope|Edema ~ Murmur timing / location / radiation|Peripheral pulses / congestion signs
Leg pain with walking ~ Walking distance|Rest relief|Calf / thigh / buttock location|Rest pain|Wounds / healing|Smoking / vascular procedures ~ Cramping|Cold foot|Numbness|Skin breakdown ~ Peripheral pulses / skin integrity|Limb temperature / capillary refill
Rapid weight gain / fluid retention ~ Weight change / interval|Daily weight method|Salt / fluid intake|Diuretic adherence|Urine output|Baseline dry weight ~ Edema|Orthopnea|Abdominal fullness|Dyspnea ~ Jugular venous pressure / lungs|Edema / abdominal congestion
Dizziness on standing ~ Position change|Episode duration|Fluid intake|Medication timing|Falls / injury|Autonomic symptoms ~ Presyncope|Blurred vision|Weakness|Palpitations ~ Orthostatic pulse / BP when safe|Gait / hydration / cardiac rhythm
Reduced exercise tolerance ~ Prior / current capacity|Limiting symptom|Progression|Recovery time|Cardiac rehabilitation history|Medication changes ~ Fatigue|Dyspnea|Chest pressure|Leg discomfort ~ Heart / lungs / perfusion|Edema / functional observation when safe
`,
  resp: `
Asthma symptom flare ~ Day / night symptom frequency|Reliever use|Controller adherence|Trigger exposure|Peak flow / baseline|Prior severe exacerbations ~ Chest tightness|Cough|Wheeze|Breathlessness ~ Work of breathing / speech|Air entry / expiratory sounds
COPD symptom worsening ~ Baseline dyspnea|Sputum change|Oxygen baseline|Inhaler technique|Recent infection|Prior admissions ~ Increased cough|Purulent sputum|Wheeze|Fever ~ Respiratory effort / saturation|Breath sounds / edema
Persistent sputum production ~ Daily amount|Color / consistency|Morning predominance|Blood content|Recurrent infections|Prior cultures / imaging ~ Productive cough|Fever|Weight loss|Chest discomfort ~ Chest auscultation|Clubbing / nutritional status
Pain with breathing ~ Location / laterality|Sudden onset|Cough relationship|Trauma|Immobility / clot history|Infection symptoms ~ Dyspnea|Cough|Hemoptysis|Fever ~ Respiratory effort / symmetry|Breath sounds / leg swelling
Low oxygen reading ~ Device / technique|Baseline saturation|Rest / exertion readings|Oxygen prescription|Acute illness|Smoking / exposure ~ Breathlessness|Confusion|Cyanosis|Chest discomfort ~ Confirm oxygenation / perfusion|Respiratory effort / heart and lung exam
Recurrent chest infections ~ Episodes / interval|Imaging-confirmed episodes|Antibiotic courses|Aspiration risk|Immune suppression|Smoking / structural lung history ~ Fever|Sputum|Hemoptysis|Weight loss ~ Lung examination / clubbing|Oral / swallowing / nutritional assessment
Lung nodule consultation ~ Imaging date / report|Prior imaging comparison|Smoking exposure|Cancer history|Occupational exposures|Family lung cancer ~ Cough|Hemoptysis|Weight loss|Chest pain ~ Chest examination|Nodes / clubbing / general appearance
Abnormal chest imaging ~ Reported finding|Imaging indication|Prior comparison|Recent infection|Inhalational exposures|Prior lung disease ~ Cough|Dyspnea|Fever|Weight loss ~ Breath sounds / chest expansion|Peripheral edema / lymph nodes
CPAP intolerance ~ Mask type / fit|Nightly use|Leak / pressure symptoms|Nasal obstruction|Device data|Sleepiness response ~ Dry mouth|Nasal dryness|Bloating|Skin irritation ~ Mask contact areas|Nasal / oropharyngeal examination
Cough after meals ~ Solids / liquids relationship|Choking episodes|Reflux / regurgitation|Voice change|Neurologic history|Aspiration pneumonia history ~ Dysphagia|Wet voice|Wheeze|Weight loss ~ Voice / oral motor function|Lung auscultation / hydration
`,
  gi: `
Difficulty swallowing ~ Solids / liquids|Progressive / intermittent|Initiation / sticking location|Food impaction|Weight change|Reflux / neurologic history ~ Regurgitation|Cough with meals|Odynophagia|Drooling ~ Oral / neck examination|Neurologic / nutritional assessment
Rectal bleeding ~ Color / amount|Stool surface / mixed|Defecation relationship|Bowel habit change|Anticoagulants|Family colorectal cancer ~ Anal pain|Constipation|Dizziness|Weight loss ~ Hemodynamic / abdominal examination|Anorectal examination if indicated and consented
Black stools ~ Tarry / sticky character|Frequency / amount|Iron / bismuth use|NSAID / anticoagulant use|Ulcer / liver history|Prior bleeding ~ Dizziness|Weakness|Hematemesis|Abdominal pain ~ Perfusion / pallor|Abdomen / liver disease signs
Upper abdominal discomfort ~ Meal relationship|Early satiety|NSAID exposure|Prior H. pylori testing|Weight trajectory|Vomiting / bleeding history ~ Epigastric burning|Bloating|Nausea|Belching ~ Epigastric tenderness|Hydration / pallor / masses
Yellow skin / eyes ~ First noticed|Urine / stool color|Alcohol / medicine exposure|Travel / hepatitis risk|Gallstone history|Prior liver results ~ Pruritus|Dark urine|Pale stool|Abdominal pain ~ Sclera / skin / mental status|Abdomen / liver / ascites
Elevated liver enzymes ~ Results / trend|Reason for testing|Alcohol pattern|Medicines / supplements|Metabolic history|Hepatitis exposure ~ Fatigue|Nausea|Pruritus|Abdominal discomfort ~ Liver disease stigmata|Abdominal / volume examination
Early fullness after eating ~ Portion tolerated|Solid / liquid intake|Weight trajectory|Vomiting timing|Diabetes / medicines|Prior gastric surgery ~ Bloating|Nausea|Epigastric pain|Appetite loss ~ Nutritional status|Abdominal distension / masses
Fecal urgency / leakage ~ Stool form|Accident frequency|Warning / sensation|Obstetric / anorectal procedures|Neurologic symptoms|Medication / laxative use ~ Diarrhea|Tenesmus|Rectal bleeding|Constipation ~ Abdominal / neurologic examination|Perianal / rectal examination if indicated and consented
Recurrent lower abdominal cramping ~ Stool relationship|Bowel pattern|Food triggers|Nocturnal symptoms|Stress relationship|Prior GI evaluation ~ Bloating|Diarrhea|Constipation|Mucus ~ Abdominal tenderness / distension|Nutritional status / pallor
Anal pain ~ Defecation relationship|Lump / swelling|Bleeding|Constipation / straining|Drainage / fever|Prior anorectal disease ~ Painful stool|Pruritus|Discharge|Tenesmus ~ Perianal inspection if consented|Abdominal examination / infection signs
`,
  surgery: `
Groin bulge ~ Side / location|Cough / strain relationship|Reducibility history|Pain progression|Vomiting / obstipation|Prior hernia repair ~ Groin pain|Nausea|Abdominal distension|Constipation ~ Groin examination standing / supine if safe and consented|Abdominal tenderness / obstruction signs
Umbilical bulge ~ Size change|Strain relationship|Pain / tenderness|Reducibility history|Prior surgery|Vomiting / bowel function ~ Local discomfort|Redness|Nausea|Distension ~ Umbilical bulge / skin assessment|Abdominal examination
Right upper abdominal pain ~ Meal / fatty food relationship|Episode duration|Back / shoulder radiation|Fever / jaundice|Prior ultrasound|Prior pancreatitis ~ Nausea|Vomiting|Dark urine|Pale stool ~ Right upper quadrant tenderness|Jaundice / hydration
Painful hemorrhoid concern ~ Bleeding / pain pattern|Lump / prolapse|Constipation / straining|Bowel habit change|Prior treatment|Anticoagulants ~ Anal itch|Bright red bleeding|Swelling|Painful defecation ~ Perianal inspection if consented|Abdominal / anorectal examination as indicated
Pilonidal pain / drainage ~ Natal cleft location|Recurrence|Drainage / odor|Fever|Sitting limitation|Prior procedures ~ Tenderness|Swelling|Redness|Discharge ~ Natal cleft inspection with consent|Extent of surrounding inflammation
Soft tissue lump ~ Location / depth|Growth rate|Pain / pressure|Skin change|Trauma|Prior excision / pathology ~ Tenderness|Numbness|Restricted motion|Drainage ~ Size / consistency / mobility|Regional nodes / neurovascular effects
Postoperative wound concern ~ Procedure / date|Drainage character|Redness progression|Wound opening|Fever / pain trajectory|Diabetes / immunosuppression ~ Swelling|Purulent drainage|Chills|Increasing pain ~ Wound / surrounding skin|General status / deeper involvement assessment
Incisional bulge ~ Operation history|Bulge progression|Strain relationship|Reducibility history|Pain episodes|Bowel obstruction symptoms ~ Discomfort|Nausea|Vomiting|Constipation ~ Incision / bulge assessment|Abdominal distension / tenderness
Gallstone consultation ~ Imaging findings|Pain episode history|Food relationship|Fever / jaundice history|Prior pancreatitis|Previous abdominal operations ~ Nausea|Vomiting|Right upper quadrant pain|Dark urine ~ Abdominal examination|Sclera / hydration / nutritional status
Recurrent perianal drainage ~ Opening / location|Drainage pattern|Prior abscess|Bowel disease history|Fever / pain|Continence baseline ~ Anal pain|Swelling|Blood|Diarrhea ~ Perianal inspection with consent|Abdominal examination / systemic infection signs
`,
  neuro: `
Tremor ~ Rest / action pattern|Body distribution|Progression|Caffeine / medicines|Alcohol relationship|Family tremor ~ Slowness|Stiffness|Imbalance|Handwriting change ~ Rest / postural / action tremor|Tone / coordination / gait
Balance difficulty ~ Falls / near falls|Walking triggers|Darkness / uneven ground|Vertigo distinction|Sensory symptoms|Medication exposure ~ Unsteadiness|Numb feet|Weakness|Vision change ~ Gait / stance when safe|Cerebellar / sensory / vestibular examination
Facial weakness ~ Last normal time|Upper / lower face|Eye closure|Ear pain / vesicles|Other neurologic deficits|Recent infection ~ Drooling|Taste change|Eye dryness|Hearing change ~ Facial movement / eye closure|Full cranial nerve / limb neurologic examination
Burning feet ~ Symmetry / distribution|Night symptoms|Diabetes / alcohol history|Nutrition / surgery history|Medication exposure|Gait impact ~ Tingling|Numbness|Allodynia|Imbalance ~ Distal sensation / reflexes|Foot skin / pulses / strength
Radiating leg pain ~ Back-to-leg distribution|Cough / strain effect|Position relationship|Motor change|Saddle sensation|Bladder / bowel change ~ Numbness|Weakness|Back pain|Gait limitation ~ Lower limb power / reflexes / sensation|Nerve tension assessment if appropriate
Transient neurologic episode ~ Last known well|Specific deficits|Duration / resolution|Recurrent episodes|Vascular risks|Antithrombotic use ~ Speech change|Vision loss|Unilateral weakness|Numbness ~ Focal neurologic / language examination|Pulse / vascular examination
Hand clumsiness ~ Laterality|Fine motor tasks|Progression|Neck symptoms|Sensory distribution|Gait / bladder change ~ Weak grip|Numbness|Stiffness|Imbalance ~ Hand strength / coordination|Reflexes / sensation / gait
Muscle twitching ~ Distribution|Frequency|Exercise / stress relationship|Weakness progression|Muscle wasting|Medication / stimulant exposure ~ Cramps|Fatigue|Numbness|Swallowing difficulty ~ Muscle bulk / power|Reflexes / fasciculations / sensation
Post-concussion symptoms ~ Injury date / mechanism|Initial loss of consciousness|Symptom trajectory|Cognitive load|Sleep / mood change|Prior concussions ~ Headache|Dizziness|Light sensitivity|Poor concentration ~ Neurologic / balance examination|Ocular movements / cervical assessment as safe
Restless legs ~ Urge to move|Rest relationship|Evening predominance|Relief with movement|Iron / renal history|Sleep / medicine context ~ Sleep onset difficulty|Leg discomfort|Fatigue|Daytime sleepiness ~ Lower limb neurologic examination|Peripheral circulation / edema
`,
  orthopedics: `
Hip pain ~ Groin / lateral / posterior site|Weight-bearing relationship|Trauma|Walking distance|Mechanical symptoms|Prior hip procedure ~ Stiffness|Limp|Catching|Night pain ~ Hip motion / localized tenderness|Gait / distal neurovascular status
Elbow pain ~ Medial / lateral / posterior site|Repetitive tasks|Trauma|Grip relationship|Swelling|Ulnar sensory symptoms ~ Tenderness|Stiffness|Weak grip|Tingling ~ Elbow motion / tendon palpation|Ulnar nerve / distal neurovascular assessment
Wrist pain ~ Radial / ulnar location|Fall / loading mechanism|Hand dominance|Swelling timeline|Repetitive use|Prior fracture ~ Weak grip|Clicking|Numbness|Stiffness ~ Bony / snuffbox / tendon tenderness|Motion / distal sensation and perfusion
Ankle pain ~ Injury / overuse|Weight-bearing ability|Instability history|Swelling pattern|Footwear / activity|Prior sprains ~ Stiffness|Giving way|Bruising|Numbness ~ Bony / ligament / tendon tenderness|Gait / neurovascular status
Foot pain ~ Forefoot / midfoot location|Load relationship|Shoe fit|Activity change|Trauma|Diabetes / neuropathy ~ Swelling|Callus pain|Numbness|Redness ~ Foot alignment / skin / focal tenderness|Pulses / sensation / gait
Finger locking ~ Finger involved|Morning pattern|Locking frequency|Manual work|Diabetes history|Prior injection / procedure ~ Clicking|Palm tenderness|Stiffness|Reduced grip ~ Flexor tendon / A1 region palpation|Active motion / locking observation
Hand numbness at night ~ Digit distribution|Night waking|Wrist position|Shaking relief|Weakness / dropping objects|Work / pregnancy context ~ Tingling|Burning|Weak grip|Hand pain ~ Thenar strength / sensory distribution|Median nerve provocative assessment if appropriate
Achilles pain ~ Insertion / midsubstance site|Sudden pop|Activity load|Walking / push-off|Fluoroquinolone / steroid exposure|Prior tendon problems ~ Swelling|Morning stiffness|Weak push-off|Bruising ~ Tendon continuity / tenderness|Calf squeeze assessment if rupture suspected
Traumatic joint swelling ~ Mechanism|Time to swelling|Ability to continue activity|Locking / giving way|Prior injury|Anticoagulants ~ Pain|Bruising|Restricted motion|Numbness ~ Effusion / bony tenderness|Neurovascular assessment / stability when safe
Painful knee replacement ~ Operation date|Prior baseline|Pain trajectory|Fever / wound drainage|Instability|Recent infection / procedures ~ Swelling|Warmth|Stiffness|Giving way ~ Incision / warmth / effusion|Motion / gait / distal neurovascular status
`,
  rheumatology: `
Morning joint stiffness ~ Duration after waking|Small / large joints|Symmetry|Movement response|Swelling pattern|Functional limits ~ Joint warmth|Fatigue|Swelling|Reduced grip ~ Tender / swollen joint distribution|Motion / extra-articular skin findings
Painful swollen toe ~ Sudden onset|Joint involved|Prior attacks|Diet / alcohol context|Diuretics / renal history|Fever / skin break ~ Redness|Warmth|Severe tenderness|Walking difficulty ~ Joint / surrounding skin inspection|Other joints / tophi / systemic appearance
Cold-induced finger color change ~ Color sequence|Symmetry|Cold / stress triggers|Episode duration|Ulcers / tissue loss|Vasoconstrictor exposure ~ Numbness|Pain|Tingling|Skin tightness ~ Digital perfusion / ulcers|Nailfold / skin / joint examination
Dry eyes and mouth ~ Duration|Artificial tear use|Difficulty with dry foods|Dental decay|Salivary swelling|Drying medicines ~ Grittiness|Oral dryness|Fatigue|Joint pain ~ Oral moisture / dentition / glands|Eyes / joints / skin assessment
Widespread body pain ~ Pain distribution|Sleep restoration|Fatigue pattern|Activity tolerance|Mood / stress|Prior inflammatory disease ~ Cognitive fog|Headache|Stiffness|Paresthesia ~ Musculoskeletal tenderness / motion|Strength / neurologic / synovitis assessment
Proximal stiffness ~ Shoulder / hip distribution|Morning duration|Daily function|New headache|Jaw / visual symptoms|Steroid exposure ~ Fatigue|Weight loss|Fever|Limited mobility ~ Shoulder / hip motion|Temporal / vascular assessment if indicated
Psoriasis with joint symptoms ~ Skin disease history|Joint pattern|Digit swelling|Enthesis pain|Back stiffness|Nail changes ~ Swelling|Morning stiffness|Heel pain|Eye redness ~ Joints / entheses / digits|Skin / scalp / nail examination
Inflammatory back stiffness ~ Age at onset|Morning / night pattern|Exercise response|Alternating buttock pain|Uveitis / bowel history|Family spondyloarthritis ~ Heel pain|Joint swelling|Eye pain|Fatigue ~ Spinal mobility / posture|Sacroiliac / enthesis / peripheral joint assessment
Positive autoimmune test concern ~ Test / titer / date|Testing indication|Symptom timeline|Rash / photosensitivity|Oral ulcers / Raynaud history|Medication exposure ~ Joint swelling|Dryness|Pleuritic pain|Fatigue ~ Skin / mouth / joints|Cardiopulmonary / edema assessment
Osteoporosis / fragility fracture concern ~ Fracture mechanism|Height loss|Menopause / hormonal history|Steroid exposure|Calcium / vitamin D intake|Falls / bone testing ~ Back pain|Kyphosis|Mobility loss|Balance difficulty ~ Height / spinal tenderness / posture|Gait / balance / proximal strength
`,
  nephrology: `
Reduced kidney function result ~ Creatinine / eGFR trend|Prior baseline|Recent illness / dehydration|Nephrotoxic medicines|Urinary obstruction symptoms|Diabetes / BP history ~ Fatigue|Edema|Nausea|Reduced urine ~ Volume status / BP|Bladder / cardiac / lung assessment
Protein in urine ~ Test type / amount|Persistence|Foamy urine|Recent exercise / fever|Diabetes / pregnancy context|Family renal disease ~ Edema|Hematuria|Fatigue|Weight gain ~ BP / edema / volume status|Skin / joint / systemic findings
Foamy urine ~ Duration / persistence|Urine volume|Swelling|Prior urine protein results|Diabetes / hypertension|Medication / exercise context ~ Edema|Nocturia|Hematuria|Fatigue ~ BP / volume assessment|Abdominal / systemic examination
High potassium result ~ Result / repeat sample|Hemolysis report|Kidney function|Medicines / supplements|Diet / salt substitutes|Recent illness ~ Weakness|Palpitations|Paresthesia|Nausea ~ Pulse / perfusion|Strength / hydration / volume status
Low sodium result ~ Sodium trend|Fluid intake|Diuretic / psychotropic use|Vomiting / diarrhea|Recent surgery / illness|Baseline mental status ~ Headache|Nausea|Confusion|Gait change ~ Mental status / neurologic examination|Volume status / orthostatic assessment when safe
Dialysis-related symptoms ~ Dialysis modality / schedule|Missed / shortened sessions|Dry weight / gains|Access symptoms|During / after session pattern|Residual urine ~ Cramps|Dizziness|Dyspnea|Pruritus ~ Access inspection / relevant flow assessment|BP / lungs / edema
Kidney stone prevention visit ~ Stone episodes / composition|Fluid intake|Dietary sodium / protein|Prior obstruction / infections|Family stone history|Urine study history ~ Flank discomfort|Hematuria|Dysuria|Urgency ~ Hydration / BP|Abdominal / costovertebral examination
Leg edema with kidney disease ~ Weight / edema trend|Salt intake|Urine output|Diuretic response|Proteinuria history|Breathing baseline ~ Orthopnea|Fatigue|Foamy urine|Abdominal fullness ~ Volume status / lung bases|Peripheral edema / skin integrity
Persistent difficult-to-control BP ~ Home BP technique|Medication adherence|Salt / NSAIDs|Sleep apnea|Kidney function trend|Prior secondary workup ~ Headache|Dizziness|Palpitations|Edema ~ Repeat BP / pulses|Volume / abdominal vascular assessment
Kidney disease-related itching ~ Distribution / timing|Skin lesions|Dialysis adequacy history|New medicines|Skin care|Sleep impairment ~ Dry skin|Excoriation|Fatigue|Sleep disturbance ~ Skin / secondary lesions|Volume status / systemic examination
`,
  urology: `
Weak urinary stream ~ Stream strength|Hesitancy / intermittency|Straining|Incomplete emptying|Nocturia|Prostate / urethral procedures ~ Frequency|Urgency|Dribbling|Retention ~ Suprapubic examination|Relevant genital / prostate exam if indicated and consented
Difficulty emptying bladder ~ Last normal void|Urine amounts|Pain / fullness|New medicines|Constipation|Neurologic / surgical history ~ Suprapubic pain|Dribbling|Weak stream|Back pain ~ Bladder distension / tenderness|Focused neurologic / genital examination as indicated
Recurrent urinary infections ~ Culture-confirmed episodes|Organisms / resistance|Antibiotic response|Intercourse relationship|Emptying / stone history|Menopause / catheter context ~ Dysuria|Frequency|Urgency|Hematuria ~ Suprapubic / costovertebral assessment|Pelvic / genital examination if indicated and consented
Testicular pain ~ Sudden onset / timing|Laterality|Trauma|Nausea / vomiting|Urinary / sexual exposure|Prior episodes ~ Swelling|Fever|Dysuria|Groin pain ~ Scrotal / testicular examination with consent|Abdominal / groin examination
Scrotal lump ~ Location|Size change|Pain|Standing relationship|Trauma / infection history|Prior testicular disease ~ Heaviness|Swelling|Tenderness|Fever ~ Testis / epididymis / cord examination with consent|Groin / regional nodes
Erectile difficulty ~ Onset / consistency|Morning erections|Libido|Situational pattern|Vascular / diabetes history|Medicines / relationship context ~ Low desire|Penile pain|Curvature|Urinary symptoms ~ Vascular / neurologic assessment|Genital examination if indicated and consented
Penile curvature / pain ~ Acquired / lifelong|Progression|Pain with erection|Penetration limitation|Trauma|Erectile function ~ Palpable plaque|Shortening|Erectile difficulty|Distress ~ Genital examination with consent|Plaque / deformity assessment as appropriate
Elevated PSA consultation ~ PSA trend|Recent infection / retention|Recent instrumentation|Prior biopsy / MRI|Family prostate cancer|Urinary baseline ~ Weak stream|Frequency|Hematuria|Pelvic discomfort ~ Abdominal examination|Prostate examination if indicated and consented
Nighttime urination ~ Episodes per night|Voided volumes|Evening fluids|Leg edema|Sleep apnea|Diuretics / diabetes ~ Urgency|Weak stream|Thirst|Daytime sleepiness ~ Volume status / edema|Bladder / relevant cardiopulmonary examination
Pelvic / perineal discomfort ~ Location|Voiding relationship|Ejaculation relationship|Duration / recurrences|Culture history|Bowel / musculoskeletal symptoms ~ Dysuria|Frequency|Painful ejaculation|Constipation ~ Abdomen / pelvic floor assessment if appropriate|Genital / prostate examination if indicated and consented
`,
  repro: `
Painful periods ~ Cycle relationship|Age at onset|Missed activities|Bleeding volume|Intercourse / bowel pain|Prior treatment ~ Cramping|Nausea|Back pain|Diarrhea ~ Abdominal examination|Pelvic examination if indicated and consented
Heavy menstrual periods ~ Pad / tampon use|Flooding / clots|Cycle regularity|Bleeding duration|Pregnancy possibility|Bleeding disorder history ~ Fatigue|Dizziness|Pelvic pressure|Dyspnea ~ Pallor / hemodynamic status|Abdominal / pelvic examination if indicated and consented
Irregular menstrual cycles ~ Cycle intervals|Last menstrual period|Pregnancy possibility|Weight / exercise changes|Hyperandrogenic symptoms|Hormonal medicines ~ Acne|Hirsutism|Hot flashes|Galactorrhea ~ Thyroid / skin / body habitus|Pelvic examination if indicated and consented
Hot flashes / menopausal symptoms ~ Last menstrual period|Episode frequency|Night symptoms|Sleep / mood impact|Hormone therapy history|Bleeding after menopause ~ Sweats|Vaginal dryness|Sleep disturbance|Palpitations ~ General / thyroid examination|Relevant breast / pelvic assessment as indicated and consented
Pain with intercourse ~ Entry / deep pain|Onset / consistency|Lubrication|Bleeding / discharge|Pelvic procedures|Trauma / safety context ~ Burning|Dryness|Pelvic pain|Urinary urgency ~ External / pelvic floor examination if consented|Pelvic examination when indicated and tolerated
Vulvar itching / irritation ~ Location|Discharge|Product exposure|Lesions / skin change|Antibiotics / diabetes|Sexual exposure ~ Burning|Dysuria|Soreness|Odor ~ Vulvar skin / lesions with consent|Discharge / surrounding skin assessment
Pelvic organ prolapse concern ~ Bulge sensation|Standing / strain relationship|Manual support|Urinary / bowel emptying|Obstetric / surgical history|Functional impact ~ Pelvic pressure|Incontinence|Constipation|Dyspareunia ~ Pelvic support assessment with consent|Bladder / bowel-related examination as indicated
Fertility concern ~ Duration attempting conception|Cycle / ovulation pattern|Intercourse timing|Prior pregnancies|Partner evaluation|Pelvic infection / surgery ~ Irregular menses|Pelvic pain|Galactorrhea|Sexual dysfunction ~ Thyroid / androgenic signs|Pelvic examination if indicated and consented
Nausea in pregnancy ~ Gestational age|Vomiting frequency|Fluid / food tolerance|Urine output|Weight change|Abdominal pain / bleeding ~ Dizziness|Dry mouth|Fatigue|Reflux ~ Vitals / hydration / weight|Abdominal assessment / pregnancy-appropriate examination
Postpartum concerns ~ Delivery date / mode|Complications|Bleeding / lochia|Feeding / breast symptoms|Mood / support|Headache / BP history ~ Pelvic pain|Fever|Breast pain|Low mood ~ BP / general status / edema|Incision / perineum / breast assessment if indicated and consented
`,
  endo: `
Low blood sugar episodes ~ Recorded glucose|Meal / exercise timing|Medicines / insulin dose|Symptoms / awareness|Need for assistance|Resolution after intake ~ Sweating|Tremor|Confusion|Palpitations ~ Mental status / perfusion|Injection sites / nutritional assessment
High blood sugar readings ~ Glucose trend|Medication adherence|Illness / steroid exposure|Fluid intake|Ketone data if available|Insulin delivery issues ~ Thirst|Polyuria|Nausea|Blurred vision ~ Hydration / mental status|Breathing pattern / infection assessment
Thyroid nodule concern ~ Detection / imaging|Growth|Voice change|Swallowing / breathing pressure|Radiation exposure|Family thyroid cancer ~ Neck fullness|Dysphagia|Hoarseness|Palpitations ~ Thyroid size / nodules / mobility|Cervical nodes / voice
Abnormal thyroid test ~ TSH / hormone trend|Testing indication|Biotin / supplements|Thyroid medicines|Recent illness / pregnancy|Prior thyroid treatment ~ Fatigue|Weight change|Temperature intolerance|Bowel change ~ Thyroid / pulse / tremor|Skin / reflexes / edema
Excess facial / body hair ~ Onset speed|Distribution|Menstrual pattern|Acne|Voice / body changes|Androgen / medicine exposure ~ Hair growth|Scalp thinning|Irregular menses|Weight gain ~ Hair distribution / acne|Virilization / metabolic signs with consent
Milky nipple discharge ~ Spontaneous / expressed|Bilateral / unilateral|Pregnancy / lactation timing|Medication exposure|Menstrual changes|Headache / vision symptoms ~ Amenorrhea|Low libido|Headache|Visual change ~ Breast examination if consented|Thyroid / visual fields as indicated
Low libido / hormone concern ~ Desire / arousal pattern|Morning erections when relevant|Menstrual / menopausal context|Mood / sleep|Medication exposure|Relationship / fertility goals ~ Fatigue|Erectile difficulty|Dryness|Hot flashes ~ Relevant endocrine / general examination|Genital examination only if indicated and consented
Low bone density ~ Bone density report|Fragility fractures|Height loss|Steroid use|Nutrition / absorption|Menopause / gonadal history ~ Back pain|Height loss|Balance difficulty|Weakness ~ Height / spine / posture|Gait / proximal strength
High calcium result ~ Calcium / albumin trend|Supplements|Kidney stones|Bone symptoms|Medication exposure|Family calcium disorders ~ Constipation|Thirst|Polyuria|Fatigue ~ Hydration / mental status|Musculoskeletal / neck examination
Thyroid replacement follow-up ~ Dose / formulation|Dosing routine|Missed doses|Food / supplement interactions|Recent thyroid results|Pregnancy / weight changes ~ Fatigue|Palpitations|Constipation|Temperature intolerance ~ Pulse / thyroid / tremor|Skin / reflexes / edema
`,
  skin: `
Eczema flare ~ Distribution|Itch severity|Product / climate triggers|Sleep impact|Treatment use|Secondary infection history ~ Dryness|Cracking|Oozing|Pain ~ Lesion distribution / excoriations|Infection signs / skin barrier
Psoriasis flare ~ Sites / extent|Scale / thickness|Trigger / recent infection|Treatment adherence|Joint symptoms|Nail involvement ~ Itch|Pain|Fissures|Joint stiffness ~ Plaques / body distribution|Nails / joints when relevant
Hives ~ Individual lesion duration|Recurrence|Food / medicine timing|Physical triggers|Angioedema|Airway / systemic symptoms ~ Itch|Wheals|Lip swelling|Wheeze ~ Skin lesions / distribution|Airway / mucosal swelling / perfusion
Hair loss patches ~ Patch progression|Scalp inflammation|Hair pulling / styling|Recent illness|Autoimmune history|Family hair loss ~ Itch|Scale|Tenderness|Nail pitting ~ Scalp / hair shafts|Nails / brows / relevant skin
Fungal nail concern ~ Nails involved|Duration|Color / thickness|Foot fungus|Trauma / footwear|Diabetes / immune history ~ Brittleness|Pain|Scaling|Discoloration ~ Nail morphology|Interdigital skin / circulation
Wart concern ~ Location / number|Spread|Pain / bleeding|Prior treatments|Immune suppression|Contact / shaving history ~ Rough papules|Tenderness|Itch|Bleeding ~ Lesion morphology / distribution|Adjacent skin / mucosa when appropriate
Rosacea symptoms ~ Facial distribution|Flushing triggers|Papules / pustules|Eye irritation|Topical steroid exposure|Treatment response ~ Burning|Redness|Grittiness|Dry eyes ~ Central face / telangiectasia|Eyelids / ocular irritation
Recurrent boils ~ Sites / frequency|Scarring / tunnels|Drainage|Friction / shaving|Smoking / metabolic history|Family similar lesions ~ Pain|Swelling|Odor|Discharge ~ Nodules / scars / sinus openings|Surrounding infection with consent
Dandruff / scalp scaling ~ Scalp / facial involvement|Itch|Product use|Seasonal pattern|Treatment attempts|Hair shedding ~ Flaking|Redness|Greasy scale|Irritation ~ Scalp / facial folds|Hair shafts / secondary infection
Contact dermatitis concern ~ Exposure timing|Product / work contact|Distribution|New jewelry / adhesives|Prior reactions|Protective equipment ~ Itch|Burning|Vesicles|Fissures ~ Contact pattern / morphology|Hands / exposed skin / infection signs
`,
  ent: `
Hoarse voice ~ Duration|Voice use|URI / intubation history|Reflux symptoms|Smoking / alcohol|Swallowing / breathing change ~ Throat clearing|Cough|Dysphagia|Neck lump ~ Voice / oral / neck examination|Laryngeal evaluation by qualified examiner as indicated
Ear fullness / blocked ear ~ Side|URI / allergy relationship|Flight / diving|Hearing change|Wax / instrumentation|Prior ear surgery ~ Pressure|Popping|Tinnitus|Otalgia ~ Otoscopy / canal assessment|Hearing screen / nasal examination
Ear discharge ~ Side|Color / odor|Pain / fever|Swimming / trauma|Tubes / perforation history|Diabetes / immune suppression ~ Hearing loss|Itch|Vertigo|Tenderness ~ Canal / tympanic membrane|Pinna / mastoid / cranial nerves as indicated
Recurrent nosebleeds ~ Side / frequency|Duration / blood loss|Nasal dryness|Spray / trauma exposure|Anticoagulants|Other bleeding ~ Nasal crusting|Dizziness|Bruising|Obstruction ~ Anterior nasal inspection|Oropharynx / pallor
Loss of smell ~ Sudden / gradual|Infection timing|Nasal obstruction|Head injury|Taste distinction|Medication / exposure ~ Congestion|Rhinorrhea|Headache|Taste change ~ Nasal / oral examination|Cranial nerve examination as indicated
Persistent throat clearing ~ Postnasal symptoms|Meal / supine relation|Voice use|Irritant exposure|Swallowing symptoms|Habit / medication context ~ Cough|Hoarseness|Globus|Heartburn ~ Oropharynx / nasal mucosa|Neck / voice assessment
Neck lump ~ Site|Growth / duration|Tenderness|Infection / dental history|Smoking / alcohol|Weight / systemic symptoms ~ Dysphagia|Hoarseness|Fever|Night sweats ~ Neck mass / nodal regions|Oral / pharyngeal / thyroid examination
Recurrent tonsil symptoms ~ Episode frequency|Documented infections|Antibiotic response|Missed work / school|Sleep obstruction|Prior abscess ~ Sore throat|Fever|Halitosis|Snoring ~ Tonsils / symmetry / uvula|Neck nodes / airway assessment
Postnasal drainage ~ Seasonal / continuous|Mucus character|Allergy triggers|Nasal sprays|Reflux context|Environmental irritants ~ Cough|Throat clearing|Sneezing|Congestion ~ Nasal mucosa / secretions|Oropharyngeal examination
Jaw pain near ear ~ Chewing relationship|Click / locking|Bruxism|Dental history|Trauma|Morning predominance ~ Otalgia|Headache|Jaw stiffness|Facial pain ~ TMJ motion / tenderness|Dentition / otoscopy
`,
  eye: `
Dry / gritty eyes ~ Laterality|Screen / environment effect|Contact lens use|Tear products|Dry mouth / autoimmune history|Ocular surgery ~ Burning|Foreign body sensation|Fluctuating blur|Tearing ~ Visual acuity / ocular surface|Lid margins / blink / tear assessment
Itchy watery eyes ~ Seasonality|Allergen exposure|Discharge type|Contact lens use|Nasal symptoms|Prior episodes ~ Itch|Redness|Tearing|Lid swelling ~ Conjunctiva / lids|Acuity / corneal assessment as indicated
Eyelid lump ~ Lid location|Pain|Duration / recurrence|Drainage|Vision effects|Prior treatment ~ Swelling|Tenderness|Crusting|Redness ~ Lid lesion / margins|Visual acuity / orbital signs
Eyelid crusting ~ Morning pattern|Bilateral involvement|Skin / rosacea history|Contact lens use|Lid hygiene|Recurrent styes ~ Burning|Itch|Dryness|Tearing ~ Lid margins / lashes|Conjunctiva / ocular surface
Gradual cloudy vision ~ Eye affected|Progression|Glare / night driving|Correction changes|Steroid / diabetes history|Functional impact ~ Halos|Blur|Reduced contrast|Monocular doubling ~ Acuity / pupils|Lens / fundus examination as appropriate
Diabetic eye review ~ Diabetes duration|Glucose / BP control|Prior retinal findings|Laser / injections|Last examination|Vision changes ~ Blurring|Floaters|Distortion|Vision loss ~ Acuity / pupils|Retinal examination by qualified examiner
Glaucoma follow-up concern ~ Prior pressure / field results|Drop regimen|Adherence / side effects|Family history|Prior procedures|Vision change ~ Peripheral vision change|Blur|Halos|Eye irritation ~ Acuity / pupils|Pressure / optic nerve assessment by qualified examiner
Eye strain with near work ~ Task duration|Working distance|Correction / last refraction|Screen breaks|Double vision|Headache timing ~ Blur|Dryness|Headache|Ocular fatigue ~ Acuity near / distance|Alignment / accommodation assessment as indicated
Excessive tearing ~ One / both eyes|Outdoor / indoor pattern|Discharge|Irritation|Prior facial surgery|Lid position symptoms ~ Watering|Crusting|Redness|Blur ~ Lid position / puncta|Ocular surface / lacrimal region
Contact lens discomfort ~ Lens type|Wear / overnight schedule|Water exposure|Cleaning routine|Pain / light sensitivity|Time since lens removal ~ Redness|Photophobia|Discharge|Blurred vision ~ Acuity / external eye|Corneal assessment by qualified examiner
`,
  psych: `
Poor concentration / ADHD concern ~ Childhood onset evidence|Settings affected|Work / school impact|Organization / impulsivity|Sleep / mood context|Substance / medicine exposure ~ Distractibility|Restlessness|Forgetfulness|Task avoidance ~ Attention / behavior / speech|Mental status / relevant general examination
Obsessions / compulsions ~ Intrusive thought content|Rituals|Time burden|Avoidance|Insight|Functional impairment ~ Anxiety|Distress|Sleep disturbance|Skin injury ~ Thought content / insight|Behavior / skin injury when relevant
Trauma-related symptoms ~ Trauma context / consent to discuss|Re-experiencing|Avoidance|Hyperarousal|Duration / function|Safety / supports ~ Nightmares|Flashbacks|Irritability|Poor sleep ~ Affect / arousal / engagement|Thought content / safety / cognition
Elevated mood / reduced sleep ~ Episode duration|Sleep need|Energy / goal-directed activity|Spending / risk behavior|Psychosis|Medicines / substances ~ Pressured speech|Irritability|Distractibility|Impulsivity ~ Speech / activity / thought process|Judgment / insight / safety assessment
Alcohol use concern ~ Quantity / frequency|Loss of control|Last use|Withdrawal / seizure history|Consequences|Change goals ~ Craving|Tremor|Insomnia|Nausea ~ Withdrawal signs / vitals|Mental status / nutrition
Cannabis use concern ~ Product / potency|Frequency / route|Reason for use|Withdrawal|Function / driving|Co-occurring symptoms ~ Anxiety|Poor concentration|Nausea|Sleep change ~ Mental status / cognition|Hydration / relevant physical examination
Eating / body image concern ~ Restriction / binge pattern|Compensatory behavior|Weight trajectory|Exercise pattern|Menstrual changes|Safety / supports ~ Dizziness|Fatigue|Cold intolerance|Palpitations ~ Vitals / nutritional status|Mental status / hydration
Grief-related distress ~ Loss / timing|Cultural context|Function / self-care|Support network|Sleep / appetite|Self-harm thoughts ~ Sadness|Guilt|Yearning|Poor concentration ~ Affect / thought content|Attention / self-care / safety assessment
Medication-related psychiatric symptoms ~ Drug / dose change|Symptom timing|Adherence|Interactions / substances|Prior reaction|Sleep / safety effects ~ Agitation|Sedation|Restlessness|Tremor ~ Mental status / movement examination|Vitals / relevant autonomic findings
Irritability / anger episodes ~ Triggers|Frequency / duration|Behavior / consequences|Sleep / mood episodes|Trauma / substances|Violence risk / access to means ~ Agitation|Impulsivity|Anxiety|Insomnia ~ Affect / impulse control / judgment|Thought content / safety assessment
`,
  peds: `
Child with ear pain ~ Age|Side / duration|URI context|Fever measurement|Ear drainage|Feeding / sleep impact ~ Irritability|Congestion|Hearing change|Poor feeding ~ Otoscopy / mastoid|Hydration / general appearance
Child with sore throat ~ Age / onset|Swallowing ability|Fever|Sick contacts|Cough / nasal symptoms|Immunization status ~ Neck pain|Rash|Drooling|Poor intake ~ Oropharynx / tonsils / airway|Cervical nodes / hydration
Child with abdominal pain ~ Location / migration|Stool pattern|Vomiting sequence|Urinary symptoms|Growth / intake|School / stress context ~ Fever|Diarrhea|Constipation|Appetite loss ~ Abdominal tenderness / guarding|Hydration / genital exam only if indicated and consented
Child with constipation ~ Stool frequency / form|Pain / withholding|Soiling|Diet / fluids|Onset / meconium history|Growth / neurologic symptoms ~ Abdominal pain|Bloating|Blood streaks|Urinary accidents ~ Abdomen / growth|Perianal / spinal examination if indicated and consented
Child with bedwetting ~ Primary / secondary|Night / daytime pattern|Dry interval|Constipation|Thirst / urine volume|Sleep / family context ~ Urgency|Dysuria|Snoring|Daytime accidents ~ Growth / BP / abdomen|Lumbosacral / neurologic assessment
Child with headache ~ Pattern / progression|Morning / nocturnal symptoms|Vomiting|Vision / school impact|Trauma|Family migraine history ~ Photophobia|Nausea|Dizziness|Weakness ~ Neurologic / gait examination|Vision / fundus assessment as indicated
Child with wheals / hives ~ Trigger timing|Food / medicine exposure|Lesion duration|Airway symptoms|Infection context|Prior reactions ~ Itch|Lip swelling|Vomiting|Wheeze ~ Airway / breathing / perfusion|Skin / mucosal swelling
Child with limping ~ Onset / injury|Weight-bearing ability|Pain location|Fever|Recent infection|Night pain / systemic change ~ Joint pain|Swelling|Fatigue|Stiffness ~ Gait if safe / hip and limb exam|Joint motion / neurovascular status
Child with school attention concerns ~ Age / developmental level|Home / school reports|Onset / settings|Sleep|Learning / hearing / vision|Family / psychosocial context ~ Distractibility|Hyperactivity|Anxiety|Poor sleep ~ Development / behavior / attention|Hearing / vision / general examination
Infant with excessive crying ~ Age / onset|Daily pattern|Consolability|Feeding / weight|Urine / stool output|Fever / injury concerns ~ Vomiting|Poor feeding|Distension|Lethargy ~ Full infant examination / vitals|Hydration / abdomen / skin and digits
`,
  heme: `
Low platelet count ~ Count / trend|Other cell lines|Bleeding history|Recent infection|Medicine / heparin exposure|Alcohol / liver history ~ Petechiae|Bruising|Gum bleeding|Epistaxis ~ Skin / mucosal bleeding|Liver / spleen / lymph nodes
High platelet count ~ Count / persistence|Recent infection / surgery|Iron deficiency|Inflammatory disease|Clot / bleeding history|Prior hematology testing ~ Headache|Visual symptoms|Burning hands|Bruising ~ Peripheral circulation / skin|Spleen / systemic examination
Low white blood cell count ~ Differential / ANC|Prior baseline|Infection frequency|Medicines / treatment exposure|Autoimmune history|Family / ancestry context ~ Fever|Mouth ulcers|Sore throat|Skin infection ~ Oral / infection-site examination|Nodes / spleen / general status
High white blood cell count ~ Differential / trend|Acute infection|Steroid / smoking exposure|Other blood counts|Constitutional symptoms|Prior hematology results ~ Fever|Night sweats|Fatigue|Weight loss ~ Infection sites / nodes|Liver / spleen / skin
Iron deficiency concern ~ Ferritin / hemoglobin trend|Menstrual / GI loss|Diet|Donation history|Malabsorption / surgery|Iron treatment response ~ Pica|Fatigue|Restless legs|Exertional dyspnea ~ Pallor / oral mucosa|Cardiac / abdominal examination
High ferritin result ~ Ferritin / saturation trend|Inflammation / infection|Alcohol / liver history|Transfusions|Family iron overload|Iron supplements ~ Fatigue|Joint pain|Abdominal discomfort|Skin darkening ~ Skin / joints / liver|Cardiac / endocrine signs as indicated
High hemoglobin / hematocrit ~ Trend / hydration|Smoking / altitude|Sleep apnea|Testosterone exposure|Clot history|Prior erythrocytosis evaluation ~ Headache|Pruritus|Visual symptoms|Dizziness ~ Oxygenation / perfusion|Spleen / cardiopulmonary examination
Clot follow-up ~ Clot site / date|Provoking factors|Prior events|Anticoagulant adherence|Bleeding|Family thrombotic history ~ Leg swelling|Chest pain|Dyspnea|Bruising ~ Relevant limb / cardiopulmonary exam|Skin / mucosal bleeding
Vitamin B12 deficiency concern ~ Level / blood count|Diet|GI surgery / absorption|Metformin / acid suppression|Replacement history|Neurologic symptoms ~ Paresthesia|Gait change|Glossitis|Fatigue ~ Sensation / proprioception / gait|Oral mucosa / pallor
Abnormal protein blood test ~ Test / amount / trend|Reason tested|Anemia / renal results|Bone pain|Recurrent infection|Prior hematology evaluation ~ Fatigue|Back pain|Weight loss|Numbness ~ Spine / focal bone tenderness|Neurologic / nodes / volume assessment
`,
};
export const specialtySets: Record<string, string> = {
  'Family medicine': 'primary',
  'Internal medicine': 'primary',
  'General practice': 'primary',
  'Emergency medicine': 'emergency',
  Cardiology: 'cardio',
  Pulmonology: 'resp',
  'General surgery': 'surgery',
  Gastroenterology: 'gi',
  Neurology: 'neuro',
  Orthopedics: 'orthopedics',
  Rheumatology: 'rheumatology',
  Nephrology: 'nephrology',
  Urology: 'urology',
  'Obstetrics & gynecology': 'repro',
  Endocrinology: 'endo',
  Dermatology: 'skin',
  Otolaryngology: 'ent',
  Ophthalmology: 'eye',
  Psychiatry: 'psych',
  Pediatrics: 'peds',
  Hematology: 'heme',
};

// Primary-care and emergency complaints retain the body system they concern.
export const complaintSystems: Record<string, string> = {
  'Seasonal allergy symptoms': 'ent',
  'Medication side effects': 'general',
  'Recurrent falls': 'neuro',
  'Muscle cramps': 'msk',
  Snoring: 'resp',
  'Bloating / excess gas': 'gi',
  'Heel pain': 'msk',
  'Hair shedding': 'skin',
  'Painful mouth sores': 'ent',
  'Excessive daytime sleepiness': 'resp',
  'Minor head injury': 'neuro',
  'Laceration / open wound': 'skin',
  'Ankle injury': 'msk',
  'Allergic reaction / hives': 'skin',
  'Acute dental pain': 'ent',
  'Foreign body in skin': 'skin',
  'Burn injury': 'skin',
  'Alcohol intoxication concern': 'psych',
  'Acute back strain': 'msk',
  'Painful skin abscess': 'skin',
};
export const symptomOverrides: Record<string, [string, string]> = {
  'Child with school attention concerns': [
    'Distractibility|Hyperactivity|Anxiety|Poor sleep|Forgetfulness|Impulsivity|Learning difficulty|Irritability',
    'Snoring|Hearing difficulty|Vision difficulty|Low mood|Headache|Developmental regression',
  ],
  'Child with bedwetting': [
    'Urgency|Dysuria|Snoring|Daytime accidents|Constipation|Thirst|Polyuria|Abdominal pain',
    'Fever|Hematuria|Back pain|Leg weakness|Weight loss|Sleep disruption',
  ],
  'Child with headache': [
    'Photophobia|Nausea|Dizziness|Weakness|Vomiting|Visual change|Sound sensitivity|Neck pain',
    'Fever|Confusion|Gait change|Seizures|Sleep disruption|Weight loss',
  ],
  'Child with limping': [
    'Joint pain|Swelling|Fatigue|Stiffness|Fever|Refusal to bear weight|Night pain|Redness',
    'Weight loss|Rash|Back pain|Weakness|Bruising|Recent sore throat',
  ],
};
