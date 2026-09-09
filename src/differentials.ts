// Educational reminders, not ranked probabilities or confirmed diagnoses.
// ! marks an important time-sensitive alternative, not a likelihood estimate.
const groups = `
Fever;Night sweats;Child with fever ~ Viral infection|Bacterial respiratory infection|Urinary tract infection|Medication-associated fever|Inflammatory disease|!Sepsis
Fatigue;Excessive daytime sleepiness;Reduced exercise tolerance ~ Sleep deprivation|Obstructive sleep apnea|Anemia|Hypothyroidism|Depression|Medication effect
Unintentional weight loss;Poor growth / weight gain ~ Inadequate caloric intake|Malabsorption|Hyperthyroidism|Diabetes mellitus|Chronic infection|Malignancy
Chest pain;Pain with breathing ~ Musculoskeletal chest pain|Gastroesophageal reflux|Pneumonia|Pericarditis|!Acute coronary syndrome|!Pulmonary embolism|!Aortic dissection
Palpitations;Fast heart rate;Irregular pulse alert ~ Sinus tachycardia|Premature atrial or ventricular beats|Atrial fibrillation|Supraventricular tachycardia|Hyperthyroidism|!Ventricular arrhythmia
Syncope;Low blood pressure / lightheadedness;Dizziness on standing ~ Vasovagal syncope|Orthostatic hypotension|Volume depletion|Medication effect|!Cardiac arrhythmia|!Structural cardiac obstruction
Leg swelling;Rapid weight gain / fluid retention;Leg edema with kidney disease ~ Chronic venous insufficiency|Heart failure|Medication-related edema|Nephrotic syndrome|Cirrhosis|!Deep vein thrombosis
Cough;Persistent sputum production;Recurrent chest infections ~ Upper airway cough syndrome|Asthma|Chronic bronchitis|Bronchiectasis|Gastroesophageal reflux|Pneumonia
Shortness of breath;Breathlessness on exertion;Low oxygen reading ~ Asthma|COPD|Heart failure|Pneumonia|Anemia|!Pulmonary embolism|!Pneumothorax
Wheezing;Asthma symptom flare;Child with cough / wheeze ~ Asthma|Viral lower respiratory infection|Bronchiolitis in infants|Aspiration|!Airway foreign body|!Anaphylaxis
Hemoptysis ~ Bronchitis|Bronchiectasis|Pneumonia|Tuberculosis|Lung malignancy|!Pulmonary embolism
Abdominal pain;Child with abdominal pain ~ Gastroenteritis|Constipation|Peptic disease|Urinary tract infection|!Appendicitis|!Bowel obstruction
Nausea & vomiting;Child with vomiting / diarrhea ~ Gastroenteritis|Medication effect|Migraine|Pregnancy when applicable|!Bowel obstruction|!Diabetic ketoacidosis
Diarrhea ~ Viral gastroenteritis|Foodborne bacterial infection|Medication-related diarrhea|Irritable bowel syndrome|Inflammatory bowel disease|Clostridioides difficile infection
Constipation;Child with constipation ~ Functional constipation|Medication effect|Dehydration|Hypothyroidism|Pelvic floor dysfunction|!Bowel obstruction
Headache;Child with headache ~ Tension-type headache|Migraine|Medication-overuse headache|Viral illness|!Meningitis|!Intracranial hemorrhage
Dizziness / vertigo;Balance difficulty ~ Benign positional vertigo|Vestibular neuritis|Vestibular migraine|Orthostatic hypotension|Medication effect|!Posterior circulation stroke
Weakness ~ Deconditioning|Electrolyte disturbance|Medication effect|Peripheral neuropathy|Myopathy|!Stroke
Numbness / tingling;Burning feet ~ Diabetic neuropathy|Nerve entrapment|Radiculopathy|Vitamin B12 deficiency|Alcohol-related neuropathy|Medication-induced neuropathy
Low back pain;Acute back strain ~ Muscular strain|Degenerative disc disease|Lumbar radiculopathy|Spinal stenosis|Vertebral compression fracture|!Cauda equina syndrome|!Spinal infection
Knee pain;Traumatic joint swelling ~ Osteoarthritis|Meniscal injury|Ligament injury|Patellofemoral pain|Crystal arthritis|!Septic arthritis
Shoulder pain ~ Rotator cuff tendinopathy|Subacromial bursitis|Adhesive capsulitis|Glenohumeral osteoarthritis|Cervical radiculopathy|!Septic arthritis
Multiple joint pain;Morning joint stiffness ~ Rheumatoid arthritis|Osteoarthritis|Psoriatic arthritis|Viral arthritis|Systemic lupus erythematosus|Crystal arthritis
Painful urination;Recurrent urinary infections ~ Cystitis|Urethritis|Vaginitis when applicable|Prostatitis when applicable|Urinary stone|Bladder pain syndrome
Blood in urine ~ Urinary tract infection|Urinary stone|Benign prostatic enlargement|Glomerulonephritis|Urinary tract malignancy|Urinary tract trauma
Flank pain ~ Ureteral stone|Pyelonephritis|Musculoskeletal pain|Hydronephrosis|Renal cyst complication|!Renal infarction
Urinary frequency;Nighttime urination ~ Overactive bladder|Urinary tract infection|Diabetes mellitus|Benign prostatic enlargement|Diuretic effect|Nocturnal polyuria
Pelvic pain ~ Endometriosis|Ovarian cyst|Pelvic inflammatory disease|Urinary tract infection|!Ectopic pregnancy|!Ovarian torsion
Abnormal vaginal bleeding;Heavy menstrual periods ~ Ovulatory dysfunction|Uterine fibroids|Endometrial polyp|Adenomyosis|Coagulopathy|!Pregnancy-related bleeding|Endometrial malignancy
Vaginal discharge;Vulvar itching / irritation ~ Vulvovaginal candidiasis|Bacterial vaginosis|Trichomoniasis|Cervicitis|Contact dermatitis|Genitourinary syndrome of menopause
Missed period / pregnancy concern;Irregular menstrual cycles ~ Pregnancy|Polycystic ovary syndrome|Hypothalamic amenorrhea|Thyroid dysfunction|Hyperprolactinemia|Primary ovarian insufficiency
Excessive thirst / urination ~ Diabetes mellitus|Diabetes insipidus|Primary polydipsia|Hypercalcemia|Diuretic effect|!Hyperglycemic crisis
Heat intolerance ~ Hyperthyroidism|Menopausal vasomotor symptoms|Medication effect|Anxiety|Heat illness|Infection
Cold intolerance ~ Hypothyroidism|Anemia|Low caloric intake|Peripheral vascular disease|Raynaud phenomenon|Medication effect
Weight gain ~ Increased caloric intake|Medication-associated weight gain|Hypothyroidism|Fluid retention|Polycystic ovary syndrome|Cushing syndrome
Rash;Child with rash ~ Viral exanthem|Atopic dermatitis|Contact dermatitis|Urticaria|Drug eruption|!Severe cutaneous drug reaction
Pruritus;Kidney disease-related itching ~ Xerosis|Atopic dermatitis|Contact dermatitis|Scabies|Cholestasis|Chronic kidney disease-associated pruritus
Changing skin lesion ~ Benign nevus|Seborrheic keratosis|Actinic keratosis|Basal cell carcinoma|Squamous cell carcinoma|Melanoma
Skin redness / swelling;Painful skin abscess ~ Cellulitis|Cutaneous abscess|Contact dermatitis|Insect bite reaction|Venous stasis dermatitis|!Necrotizing soft tissue infection
Sore throat;Child with sore throat;Recurrent tonsil symptoms ~ Viral pharyngitis|Streptococcal pharyngitis|Infectious mononucleosis|Postnasal irritation|!Peritonsillar abscess|!Epiglottitis
Ear pain;Child with ear pain ~ Acute otitis media|Otitis externa|Eustachian tube dysfunction|Cerumen impaction|Referred dental or TMJ pain|!Mastoiditis
Nasal congestion / sinus pressure;Seasonal allergy symptoms;Postnasal drainage ~ Allergic rhinitis|Viral rhinosinusitis|Nonallergic rhinitis|Bacterial sinusitis|Nasal polyps|Rhinitis medicamentosa
Hearing loss / tinnitus;Ear fullness / blocked ear ~ Cerumen impaction|Middle-ear effusion|Eustachian tube dysfunction|Noise-induced hearing loss|Presbycusis|!Sudden sensorineural hearing loss
Red eye ~ Viral conjunctivitis|Bacterial conjunctivitis|Allergic conjunctivitis|Dry eye|!Keratitis|!Acute angle-closure glaucoma
Vision loss / blurred vision ~ Refractive error|Cataract|Diabetic retinopathy|Macular disease|!Retinal detachment|!Retinal vascular occlusion
Eye pain;Contact lens discomfort ~ Dry eye|Corneal abrasion|Corneal foreign body|!Microbial keratitis|!Uveitis|!Acute angle-closure glaucoma
Double vision ~ Decompensated strabismus|Cranial nerve palsy|Thyroid eye disease|Myasthenia gravis|Orbital disease|!Brainstem stroke
Low mood;Grief-related distress ~ Major depressive disorder|Adjustment disorder|Grief response|Bipolar depression|Substance-induced mood disorder|Hypothyroidism
Anxiety / panic ~ Generalized anxiety disorder|Panic disorder|Adjustment disorder|Hyperthyroidism|Substance or medication effect|Cardiac arrhythmia
Insomnia ~ Insomnia disorder|Anxiety disorder|Depression|Circadian rhythm disorder|Obstructive sleep apnea|Substance or medication effect
Hallucinations / unusual beliefs ~ Primary psychotic disorder|Mood disorder with psychosis|Substance-induced psychosis|Medication effect|Neurocognitive disorder|!Delirium
Easy bruising / bleeding;Anticoagulant follow-up / bleeding concern ~ Medication-associated bleeding|Thrombocytopenia|Von Willebrand disease|Liver disease|Platelet dysfunction|!Disseminated intravascular coagulation
Enlarged lymph node;Neck lump ~ Reactive lymphadenopathy|Viral infection|Bacterial regional infection|Granulomatous infection|Lymphoma|Metastatic malignancy
Pallor / anemia concern;Iron deficiency concern ~ Iron deficiency anemia|Anemia of inflammation|Chronic kidney disease anemia|Vitamin B12 deficiency|Folate deficiency|Hemolytic anemia
Recurrent infections ~ Repeated exposure|Diabetes mellitus|Medication-induced immune suppression|Structural or anatomic disease|HIV infection|Primary immunodeficiency
Dehydration / poor intake ~ Gastroenteritis|Inadequate fluid intake|Heat-related fluid loss|Diuretic effect|Hyperglycemia|Dysphagia
Elevated blood pressure;Persistent difficult-to-control BP ~ Primary hypertension|White-coat hypertension|Medication-associated hypertension|Renal parenchymal disease|Obstructive sleep apnea|Primary aldosteronism
Sleep apnea concern;Snoring;Excessive daytime sleepiness ~ Obstructive sleep apnea|Primary snoring|Insufficient sleep|Sedating medication effect|Circadian rhythm disorder|Central sleep apnea
Heartburn / reflux;Upper abdominal discomfort ~ Gastroesophageal reflux|Functional dyspepsia|Gastritis|Peptic ulcer disease|Biliary disease|!Acute coronary syndrome
Seizure / seizure-like episode ~ Epileptic seizure|Convulsive syncope|Functional seizure|Hypoglycemia|Electrolyte disturbance|Substance withdrawal
Neck pain ~ Cervical muscle strain|Cervical spondylosis|Cervical radiculopathy|Myofascial pain|!Cervical myelopathy|!Spinal infection
Urinary incontinence ~ Stress incontinence|Urge incontinence|Overflow incontinence|Functional incontinence|Urinary tract infection|Medication effect
Breast lump / breast pain ~ Fibrocystic change|Breast cyst|Fibroadenoma|Mastitis|Breast abscess|Breast carcinoma
Diabetes follow-up;High blood sugar readings ~ Type 2 diabetes|Type 1 diabetes|Medication-induced hyperglycemia|Stress hyperglycemia|Pancreatogenic diabetes|!Hyperglycemic crisis
Acne ~ Acne vulgaris|Rosacea|Bacterial folliculitis|Malassezia folliculitis|Periorificial dermatitis|Medication-induced acneiform eruption
Epistaxis;Recurrent nosebleeds ~ Nasal mucosal dryness|Local trauma|Rhinitis|Medication-associated bleeding|Coagulopathy|Sinonasal lesion
Flashes / floaters ~ Posterior vitreous detachment|Vitreous syneresis|Migraine aura|Vitreous hemorrhage|!Retinal tear|!Retinal detachment
Memory / cognitive concern ~ Mild cognitive impairment|Alzheimer disease|Vascular cognitive impairment|Depression|Medication effect|!Delirium
Medication side effects;Medication-related psychiatric symptoms ~ Adverse medication effect|Drug interaction|Medication withdrawal|Dosing error or toxicity|Underlying disease progression|Substance-related symptoms
Recurrent falls ~ Mechanical trip|Orthostatic hypotension|Peripheral neuropathy|Vestibular disorder|Medication effect|!Cardiac syncope
Muscle cramps ~ Exercise-associated cramps|Dehydration|Electrolyte imbalance|Medication effect|Peripheral neuropathy|Peripheral arterial disease
Bloating / excess gas ~ Functional bloating|Irritable bowel syndrome|Constipation|Lactose intolerance|Celiac disease|Small intestinal bacterial overgrowth
Heel pain ~ Plantar fasciitis|Achilles tendinopathy|Heel fat-pad syndrome|Calcaneal stress fracture|Nerve entrapment|Inflammatory enthesitis
Hair shedding;Hair loss patches ~ Telogen effluvium|Androgenetic alopecia|Alopecia areata|Traction alopecia|Tinea capitis|Scarring alopecia
Painful mouth sores ~ Aphthous stomatitis|Traumatic ulcer|Herpes simplex infection|Oral candidiasis|Nutritional deficiency|Inflammatory systemic disease
Minor head injury;Post-concussion symptoms ~ Concussion|Scalp contusion|Cervical strain|Post-traumatic migraine|Vestibular dysfunction|!Intracranial hemorrhage
Laceration / open wound ~ Simple laceration|Tendon injury|Nerve injury|Vascular injury|Retained foreign body|Open fracture
Ankle injury;Ankle pain ~ Lateral ankle sprain|Syndesmotic sprain|Ankle fracture|Tendon injury|Osteochondral injury|Crystal arthritis
Allergic reaction / hives;Hives;Child with wheals / hives ~ Acute urticaria|Drug eruption|Viral-associated urticaria|Physical urticaria|Angioedema|!Anaphylaxis
Acute dental pain ~ Dental caries|Pulpitis|Periapical abscess|Periodontal infection|Cracked tooth|!Deep neck infection
Foreign body in skin ~ Retained foreign body|Puncture wound|Foreign-body granuloma|Cellulitis|Abscess|Tendon or nerve injury
Burn injury ~ Thermal burn|Chemical burn|Electrical burn|Friction burn|Sunburn|!Inhalation injury
Alcohol intoxication concern ~ Alcohol intoxication|Sedative intoxication|Hypoglycemia|Head injury|Alcohol withdrawal|!Wernicke encephalopathy
Slow heart rate ~ Physiologic sinus bradycardia|Medication effect|Sinus node dysfunction|Atrioventricular block|Hypothyroidism|!Acute myocardial ischemia
Heart murmur concern ~ Innocent flow murmur|Aortic stenosis|Mitral regurgitation|Aortic regurgitation|Hypertrophic cardiomyopathy|!Infective endocarditis
Leg pain with walking ~ Peripheral arterial disease|Lumbar spinal stenosis|Muscle overuse|Peripheral neuropathy|Venous disease|!Acute limb ischemia
COPD symptom worsening ~ COPD exacerbation|Pneumonia|Heart failure|Bronchiectasis exacerbation|!Pulmonary embolism|!Pneumothorax
Lung nodule consultation ~ Healed granuloma|Hamartoma|Inflammatory nodule|Primary lung cancer|Metastatic nodule|Active infection
Abnormal chest imaging ~ Pneumonia|Atelectasis|Pulmonary edema|Pleural effusion|Interstitial lung disease|Lung malignancy
CPAP intolerance ~ Mask leak or pressure injury|Rhinitis|Nasal obstruction|Pressure-related aerophagia|Claustrophobia|Residual sleep-disordered breathing
Cough after meals ~ Gastroesophageal reflux|Oropharyngeal dysphagia|Aspiration|Esophageal dysmotility|Upper airway cough syndrome|Asthma
Difficulty swallowing ~ Esophageal stricture|Schatzki ring|Eosinophilic esophagitis|Achalasia|Oropharyngeal dysfunction|Esophageal malignancy
Rectal bleeding ~ Hemorrhoids|Anal fissure|Diverticular bleeding|Colitis|Colorectal polyp|Colorectal malignancy
Black stools ~ Peptic ulcer bleeding|Erosive gastritis|Iron or bismuth discoloration|Angiodysplasia|!Variceal bleeding|Upper GI malignancy
Yellow skin / eyes ~ Viral hepatitis|Drug-induced liver injury|Alcohol-associated hepatitis|Biliary obstruction|Hemolysis|!Ascending cholangitis
Elevated liver enzymes ~ Metabolic steatotic liver disease|Alcohol-associated liver disease|Viral hepatitis|Drug-induced liver injury|Autoimmune hepatitis|Biliary obstruction
Early fullness after eating ~ Functional dyspepsia|Gastroparesis|Peptic ulcer disease|Medication effect|Gastric outlet obstruction|Gastric malignancy
Fecal urgency / leakage ~ Diarrhea-associated incontinence|Fecal impaction with overflow|Anal sphincter injury|Pelvic floor dysfunction|Neurologic disease|Inflammatory bowel disease
Recurrent lower abdominal cramping ~ Irritable bowel syndrome|Constipation|Food intolerance|Inflammatory bowel disease|Diverticular disease|Endometriosis when applicable
Anal pain;Painful hemorrhoid concern ~ Anal fissure|Thrombosed external hemorrhoid|Perianal abscess|Proctitis|Levator ani syndrome|Anal malignancy
Groin bulge ~ Inguinal hernia|Femoral hernia|Lymphadenopathy|Lipoma|Hydrocele|!Incarcerated or strangulated hernia
Umbilical bulge;Incisional bulge ~ Umbilical or incisional hernia|Rectus diastasis|Lipoma|Postoperative seroma|Hematoma|!Strangulated hernia
Right upper abdominal pain;Gallstone consultation ~ Biliary colic|Acute cholecystitis|Choledocholithiasis|Peptic disease|Pancreatitis|!Ascending cholangitis
Pilonidal pain / drainage ~ Pilonidal disease|Cutaneous abscess|Hidradenitis suppurativa|Infected epidermoid cyst|Perianal fistula|Pressure-related skin injury
Soft tissue lump ~ Lipoma|Epidermoid cyst|Abscess|Hematoma|Ganglion cyst|Soft tissue sarcoma
Postoperative wound concern ~ Surgical-site infection|Seroma|Hematoma|Wound dehiscence|Contact dermatitis|!Deep or necrotizing infection
Recurrent perianal drainage ~ Anal fistula|Perianal abscess|Crohn disease|Hidradenitis suppurativa|Pilonidal disease|Anal malignancy
Tremor ~ Essential tremor|Enhanced physiologic tremor|Parkinson disease|Medication-induced tremor|Hyperthyroidism|Cerebellar disease
Facial weakness ~ Bell palsy|Ramsay Hunt syndrome|Lyme-associated facial palsy|Parotid lesion|Facial nerve trauma|!Stroke
Radiating leg pain ~ Lumbar radiculopathy|Spinal stenosis|Deep gluteal syndrome|Hip disease|Peripheral neuropathy|!Cauda equina syndrome
Transient neurologic episode ~ Transient ischemic attack|Migraine aura|Focal seizure|Hypoglycemia|Functional neurologic symptoms|!Stroke
Hand clumsiness ~ Nerve entrapment|Cervical radiculopathy|Cervical myelopathy|Peripheral neuropathy|Parkinson disease|!Stroke
Muscle twitching ~ Benign fasciculation syndrome|Stress or stimulant effect|Electrolyte disorder|Radiculopathy|Medication effect|Motor neuron disease
Restless legs ~ Restless legs syndrome|Nocturnal leg cramps|Peripheral neuropathy|Medication-induced akathisia|Venous insufficiency|Positional discomfort
Hip pain ~ Hip osteoarthritis|Greater trochanteric pain syndrome|Hip labral disease|Lumbar referred pain|Femoral neck stress fracture|!Septic arthritis
Elbow pain ~ Lateral epicondylitis|Medial epicondylitis|Olecranon bursitis|Ulnar neuropathy|Osteoarthritis|Occult fracture
Wrist pain ~ Wrist sprain|Scaphoid fracture|De Quervain tenosynovitis|Carpal tunnel syndrome|Triangular fibrocartilage injury|Inflammatory arthritis
Foot pain ~ Metatarsalgia|Stress fracture|Morton neuroma|Osteoarthritis|Tendinopathy|!Diabetic foot infection
Finger locking ~ Trigger finger|Flexor tendon injury|Dupuytren contracture|Joint osteoarthritis|Inflammatory tenosynovitis|!Infectious flexor tenosynovitis
Hand numbness at night ~ Carpal tunnel syndrome|Ulnar neuropathy|Cervical radiculopathy|Polyneuropathy|Positional nerve compression|Cervical myelopathy
Achilles pain ~ Achilles tendinopathy|Retrocalcaneal bursitis|Paratenonitis|Insertional enthesitis|Calcaneal stress injury|!Achilles rupture
Painful knee replacement ~ Aseptic loosening|Prosthetic instability|Arthrofibrosis|Periprosthetic fracture|Referred pain|!Prosthetic joint infection
Painful swollen toe ~ Gout|Calcium pyrophosphate arthritis|Trauma|Cellulitis|Psoriatic arthritis|!Septic arthritis
Cold-induced finger color change ~ Primary Raynaud phenomenon|Systemic sclerosis|Lupus-associated Raynaud phenomenon|Medication-induced vasospasm|Acrocyanosis|!Digital arterial occlusion
Dry eyes and mouth ~ Sjogren syndrome|Medication-induced dryness|Dehydration|Blepharitis|Diabetes mellitus|Prior head and neck radiation
Widespread body pain ~ Fibromyalgia|Myofascial pain|Hypothyroidism|Inflammatory myopathy|Polymyalgia rheumatica|Medication-associated myalgia
Proximal stiffness ~ Polymyalgia rheumatica|Rheumatoid arthritis|Rotator cuff disease|Osteoarthritis|Inflammatory myopathy|!Giant cell arteritis
Psoriasis with joint symptoms ~ Psoriatic arthritis|Osteoarthritis|Rheumatoid arthritis|Gout|Reactive arthritis|Mechanical enthesopathy
Inflammatory back stiffness ~ Axial spondyloarthritis|Mechanical back pain|Psoriatic axial disease|Enteropathic arthritis|Diffuse idiopathic skeletal hyperostosis|!Spinal infection
Positive autoimmune test concern ~ Incidental autoantibody positivity|Systemic lupus erythematosus|Sjogren syndrome|Systemic sclerosis|Drug-induced autoimmunity|Autoimmune thyroid disease
Osteoporosis / fragility fracture concern;Low bone density ~ Primary osteoporosis|Glucocorticoid-induced osteoporosis|Osteomalacia|Hyperparathyroidism|Hypogonadism|Malignancy-related bone disease
Reduced kidney function result ~ Volume depletion|Medication-related kidney injury|Diabetic kidney disease|Hypertensive kidney disease|Urinary obstruction|Glomerulonephritis
Protein in urine;Foamy urine ~ Transient proteinuria|Orthostatic proteinuria|Diabetic kidney disease|Hypertensive kidney disease|Primary glomerular disease|Monoclonal protein disorder
High potassium result ~ Specimen hemolysis|Kidney failure|Medication-related hyperkalemia|Hypoaldosteronism|Metabolic acidosis|Tissue breakdown
Low sodium result ~ Diuretic-associated hyponatremia|SIADH|Volume depletion|Heart failure|Adrenal insufficiency|Primary polydipsia
Dialysis-related symptoms ~ Intradialytic hypotension|Volume overload|Electrolyte disturbance|Uremia|!Dialysis access infection|!Dialysis disequilibrium syndrome
Kidney stone prevention visit ~ Calcium oxalate stones|Calcium phosphate stones|Uric acid stones|Struvite stones|Cystine stones|Medication-related stones
Weak urinary stream;Difficulty emptying bladder ~ Benign prostatic enlargement|Urethral stricture|Medication-related retention|Neurogenic bladder|Prostatitis|Urinary tract obstruction
Testicular pain ~ Epididymitis|Orchitis|Torsion of testicular appendage|Inguinal hernia|Ureteral referred pain|!Testicular torsion
Scrotal lump ~ Epididymal cyst|Hydrocele|Varicocele|Inguinal hernia|Epididymitis|Testicular malignancy
Erectile difficulty ~ Vasculogenic erectile dysfunction|Psychogenic erectile dysfunction|Medication effect|Diabetic neuropathy|Hypogonadism|Peyronie disease
Penile curvature / pain ~ Peyronie disease|Congenital curvature|Traumatic scarring|Penile fracture|Superficial vein thrombosis|Inflammatory penile disease
Elevated PSA consultation ~ Benign prostatic enlargement|Prostatitis|Urinary infection|Recent instrumentation|Urinary retention|Prostate cancer
Pelvic / perineal discomfort ~ Chronic pelvic pain syndrome|Bacterial prostatitis|Pelvic floor dysfunction|Bladder pain syndrome|Pudendal neuralgia|Anorectal disease
Painful periods ~ Primary dysmenorrhea|Endometriosis|Adenomyosis|Uterine fibroids|Pelvic inflammatory disease|Ovarian cyst
Hot flashes / menopausal symptoms ~ Menopausal vasomotor symptoms|Hyperthyroidism|Medication effect|Anxiety|Hypoglycemia|Infection
Pain with intercourse ~ Genitourinary syndrome of menopause|Vulvodynia|Pelvic floor dysfunction|Vaginitis|Endometriosis|Pelvic inflammatory disease
Pelvic organ prolapse concern ~ Anterior vaginal wall prolapse|Posterior vaginal wall prolapse|Apical prolapse|Vaginal cyst|Urethral diverticulum|Pelvic mass
Fertility concern ~ Ovulatory dysfunction|Male factor infertility|Tubal disease|Endometriosis|Uterine cavity abnormality|Unexplained infertility
Nausea in pregnancy ~ Nausea and vomiting of pregnancy|Hyperemesis gravidarum|Gastroenteritis|Gastroesophageal reflux|Urinary infection|Biliary disease
Postpartum concerns ~ Normal postpartum recovery|Postpartum depression|Mastitis|Endometritis|!Postpartum preeclampsia|!Postpartum hemorrhage|!Venous thromboembolism
Low blood sugar episodes ~ Insulin-related hypoglycemia|Sulfonylurea effect|Reduced food intake|Alcohol-related hypoglycemia|Adrenal insufficiency|Endogenous hyperinsulinism
Thyroid nodule concern ~ Colloid nodule|Thyroid cyst|Multinodular goiter|Thyroiditis|Follicular adenoma|Thyroid malignancy
Abnormal thyroid test;Thyroid replacement follow-up ~ Autoimmune hypothyroidism|Graves disease|Thyroiditis|Nonthyroidal illness|Medication or assay interference|Thyroid hormone under- or over-replacement
Excess facial / body hair ~ Polycystic ovary syndrome|Idiopathic hirsutism|Medication-associated hair growth|Nonclassic congenital adrenal hyperplasia|Cushing syndrome|Androgen-secreting tumor
Milky nipple discharge ~ Physiologic lactation|Medication-induced hyperprolactinemia|Prolactinoma|Hypothyroidism|Chest wall stimulation|Chronic kidney disease
Low libido / hormone concern ~ Depression|Medication effect|Relationship-associated sexual dysfunction|Hypogonadism|Menopausal changes|Chronic systemic illness
High calcium result ~ Primary hyperparathyroidism|Malignancy-associated hypercalcemia|Medication effect|Vitamin D excess|Granulomatous disease|Familial hypocalciuric hypercalcemia
Eczema flare ~ Atopic dermatitis|Contact dermatitis|Seborrheic dermatitis|Psoriasis|Scabies|Tinea infection
Psoriasis flare ~ Plaque psoriasis|Seborrheic dermatitis|Tinea corporis|Nummular eczema|Pityriasis rosea|Drug eruption
Fungal nail concern ~ Onychomycosis|Traumatic nail dystrophy|Nail psoriasis|Lichen planus|Chronic paronychia|Nail-unit malignancy
Wart concern ~ Viral wart|Corn or callus|Seborrheic keratosis|Molluscum contagiosum|Skin tag|Squamous cell carcinoma
Rosacea symptoms ~ Rosacea|Acne vulgaris|Seborrheic dermatitis|Periorificial dermatitis|Contact dermatitis|Cutaneous lupus
Recurrent boils ~ Recurrent furunculosis|Hidradenitis suppurativa|Inflamed epidermoid cyst|Folliculitis|Pilonidal disease|Cutaneous abscess
Dandruff / scalp scaling ~ Seborrheic dermatitis|Scalp psoriasis|Tinea capitis|Contact dermatitis|Atopic dermatitis|Pityriasis amiantacea
Contact dermatitis concern ~ Allergic contact dermatitis|Irritant contact dermatitis|Atopic dermatitis|Tinea infection|Psoriasis|Scabies
Hoarse voice ~ Acute laryngitis|Voice overuse|Reflux-associated irritation|Vocal fold lesion|Vocal fold paresis|Laryngeal malignancy
Ear discharge ~ Otitis externa|Otitis media with perforation|Chronic suppurative otitis media|Cholesteatoma|Ear canal trauma|!Skull-base injury with CSF leak
Loss of smell ~ Postviral olfactory dysfunction|Chronic rhinosinusitis|Nasal polyps|Head trauma|Medication effect|Neurodegenerative disease
Persistent throat clearing ~ Upper airway cough syndrome|Reflux-associated irritation|Allergic rhinitis|Habit cough|Vocal fold irritation|Medication-related cough
Jaw pain near ear ~ Temporomandibular disorder|Dental disease|Otitis externa|Parotid disease|Trigeminal neuralgia|!Giant cell arteritis in older adults
Dry / gritty eyes ~ Dry eye disease|Blepharitis|Meibomian gland dysfunction|Allergic conjunctivitis|Exposure keratopathy|Sjogren syndrome
Itchy watery eyes ~ Allergic conjunctivitis|Dry eye|Blepharitis|Viral conjunctivitis|Irritant conjunctivitis|Contact lens reaction
Eyelid lump ~ Chalazion|Hordeolum|Epidermoid cyst|Papilloma|Basal cell carcinoma|Sebaceous carcinoma
Eyelid crusting ~ Blepharitis|Meibomian gland dysfunction|Seborrheic dermatitis|Allergic dermatitis|Bacterial conjunctivitis|Ocular rosacea
Gradual cloudy vision ~ Cataract|Refractive error|Dry eye|Macular degeneration|Diabetic retinopathy|Corneal disease
Diabetic eye review ~ Diabetic retinopathy|Diabetic macular edema|Cataract|Refractive fluctuation|Glaucoma|Retinal vascular disease
Glaucoma follow-up concern ~ Primary open-angle glaucoma|Ocular hypertension|Normal-tension glaucoma|Angle-closure disease|Steroid-induced glaucoma|Non-glaucomatous optic neuropathy
Eye strain with near work ~ Uncorrected refractive error|Presbyopia|Dry eye|Convergence insufficiency|Accommodative dysfunction|Tension-type headache
Excessive tearing ~ Reflex tearing from dry eye|Allergic conjunctivitis|Blepharitis|Nasolacrimal obstruction|Eyelid malposition|Dacryocystitis
Poor concentration / ADHD concern;Child with school attention concerns ~ ADHD|Anxiety disorder|Sleep disorder|Learning disorder|Depression|Hearing or vision impairment
Obsessions / compulsions ~ Obsessive-compulsive disorder|Generalized anxiety disorder|Depression with rumination|Body dysmorphic disorder|Autism-related repetitive behavior|Psychotic disorder
Trauma-related symptoms ~ Post-traumatic stress disorder|Acute stress disorder|Adjustment disorder|Depression|Panic disorder|Substance-related disorder
Elevated mood / reduced sleep ~ Bipolar mania or hypomania|Substance-induced mood disorder|Medication-induced activation|Hyperthyroidism|Psychotic disorder|!Delirium
Alcohol use concern ~ Alcohol use disorder|Alcohol intoxication|Alcohol withdrawal|Depressive disorder|Anxiety disorder|Other substance use disorder
Cannabis use concern ~ Cannabis use disorder|Cannabis intoxication|Cannabis withdrawal|Cannabinoid hyperemesis|Substance-induced anxiety|Substance-induced psychosis
Eating / body image concern ~ Anorexia nervosa|Bulimia nervosa|Binge-eating disorder|Avoidant restrictive food intake disorder|Body dysmorphic disorder|Depression
Irritability / anger episodes ~ Mood disorder|Anxiety disorder|Trauma-related disorder|Substance-related disorder|ADHD|Intermittent explosive disorder
Child with bedwetting ~ Primary nocturnal enuresis|Constipation-associated bladder dysfunction|Urinary tract infection|Diabetes mellitus|Obstructive sleep apnea|Neurogenic bladder
Child with limping ~ Transient synovitis|Minor trauma|Fracture|Juvenile idiopathic arthritis|!Septic arthritis|!Slipped capital femoral epiphysis
Infant with excessive crying ~ Infant colic|Feeding difficulty|Gastroesophageal reflux|Cow milk protein allergy|!Serious infection|!Intussusception|!Injury or hair tourniquet
Low platelet count ~ Immune thrombocytopenia|Medication-induced thrombocytopenia|Viral-associated thrombocytopenia|Liver disease with hypersplenism|Marrow disorder|!Thrombotic microangiopathy
High platelet count ~ Reactive thrombocytosis|Iron deficiency|Chronic inflammation|Recent surgery or tissue injury|Essential thrombocythemia|Malignancy-associated thrombocytosis
Low white blood cell count ~ Viral-associated leukopenia|Medication effect|Autoimmune neutropenia|Duffy-null associated neutrophil count|Nutritional deficiency|Marrow disorder
High white blood cell count ~ Infection|Inflammation|Corticosteroid effect|Smoking-related leukocytosis|Physiologic stress|Hematologic malignancy
High ferritin result ~ Inflammation|Metabolic liver disease|Alcohol-associated liver disease|Hereditary hemochromatosis|Transfusional iron overload|Malignancy
High hemoglobin / hematocrit ~ Relative erythrocytosis|Smoking-related erythrocytosis|Sleep apnea|Testosterone effect|Polycythemia vera|Chronic hypoxic lung disease
Clot follow-up ~ Provoked venous thrombosis|Unprovoked venous thrombosis|Cancer-associated thrombosis|Antiphospholipid syndrome|Inherited thrombophilia|Recurrent thrombosis
Vitamin B12 deficiency concern ~ Dietary deficiency|Autoimmune gastritis|Post-gastric surgery malabsorption|Ileal disease|Medication-associated deficiency|Nitrous oxide-related deficiency
Abnormal protein blood test ~ Monoclonal gammopathy of undetermined significance|Polyclonal inflammation|Multiple myeloma|Lymphoplasmacytic lymphoma|AL amyloidosis|Chronic liver disease
`;
export const differentials: Record<string, string[]> = {};
for (const row of groups.trim().split('\n')) {
  const [aliases, diagnoses] = row.split('~').map((s) => s.trim());
  for (const title of aliases.split(';').map((s) => s.trim()))
    differentials[title] = diagnoses.split('|');
}
export const systemDifferentials: Record<string, string[]> = Object.fromEntries(
  Object.entries({
    general:
      'Anemia|Thyroid disease|Sleep disorder|Medication effect|Infection|Mood disorder',
    cardio:
      'Coronary artery disease|Heart failure|Arrhythmia|Valvular disease|Hypertension|Peripheral arterial disease',
    resp: 'Asthma|COPD|Pneumonia|Sleep apnea|Interstitial lung disease|Pulmonary vascular disease',
    gi: 'Gastroesophageal reflux|Peptic disease|Irritable bowel syndrome|Inflammatory bowel disease|Biliary disease|Liver disease',
    neuro:
      'Migraine|Peripheral neuropathy|Radiculopathy|Seizure disorder|Movement disorder|Cerebrovascular disease',
    msk: 'Osteoarthritis|Tendinopathy|Muscle strain|Inflammatory arthritis|Crystal arthritis|Radiculopathy',
    renal:
      'Urinary infection|Urinary stone|Chronic kidney disease|Glomerular disease|Urinary obstruction|Bladder dysfunction',
    repro:
      'Ovulatory dysfunction|Endometriosis|Fibroids|Genital infection|Menopausal symptoms|Pregnancy-related condition',
    endo: 'Diabetes mellitus|Thyroid disease|Metabolic syndrome|Osteoporosis|Parathyroid disease|Adrenal disorder',
    skin: 'Atopic dermatitis|Contact dermatitis|Psoriasis|Fungal infection|Acne|Skin neoplasm',
    ent: 'Rhinitis|Rhinosinusitis|Otitis|Eustachian tube dysfunction|Laryngeal disease|Referred dental pain',
    eye: 'Refractive error|Dry eye|Cataract|Glaucoma|Retinal disease|Ocular inflammation',
    psych:
      'Depressive disorder|Anxiety disorder|Bipolar disorder|Trauma-related disorder|Substance-related disorder|Psychotic disorder',
    peds: 'Viral illness|Asthma|Atopic dermatitis|Functional constipation|Feeding disorder|Developmental or learning disorder',
    heme: 'Iron deficiency|Anemia of inflammation|Platelet disorder|Medication-associated cytopenia|Coagulation disorder|Hematologic malignancy',
  }).map(([key, value]) => [key, value.split('|')]),
);
