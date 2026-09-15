import { questionsFor, symptomsFor, examsFor, matchesSpecialty, type Outline } from './catalog.ts';
export type Note = { id: string; outlineId: string; createdAt: string; updatedAt: string; deleted?: boolean; values: Record<string,string> };
export type Field = { id: string; label: string; type?: 'text'|'long'|'select'|'range'|'check'|'date'; options?: string[] };
export type Section = { title: string; fields: Field[] };
export const needsCareInfo = (o: Outline) => matchesSpecialty(o, 'Emergency medicine') || matchesSpecialty(o, 'Internal medicine');
export function noteSections(o: Outline): Section[] {
 const text = (id:string,label:string):Field => ({id,label});
 const long = (id:string,label:string):Field => ({id,label,type:'long'});
 return [
  {title:'Patient information',fields:[text('name','Patient name'),text('age','Age'),text('gender','Gender'),{id:'date',label:'Encounter date',type:'date'},text('time','Encounter time / timezone'),text('location','Location / room'),...(needsCareInfo(o)?[
   {id:'code',label:'Code status',type:'select',options:['Unknown / not yet confirmed','Full code','DNR','DNR / DNI','Other / see details']} as Field,
   long('codeDetails','Code status details / source / confirmed with / date and time'),
   text('contactName','#1 emergency contact - name'),text('contactRelationship','#1 emergency contact - relationship'),text('contactPhone','#1 emergency contact - phone'),long('contactNotes','Contact availability / permission / notes'),
  ]:[]),long('cc','Chief complaint / visit reason (patient wording)')]},
  {title:'Subjective / HPI',fields:[...questionsFor(o).map((label,i)=>({id:`hpi-${i}`,label,type: /Sudden \/ gradual|Constant \/ intermittent/.test(label)?'select':'long',options:label.includes('Sudden')?['Sudden','Gradual','Unknown']:['Constant','Intermittent','Unknown']} as Field)),{id:'pain',label:'Pain severity (0-10)',type:'range'},long('hpiNotes','Additional history')]},
  {title:'Symptoms / review of systems',fields:[...symptomsFor(o).map((label,i)=>({id:`ros-${i}`,label,type:'select',options:['Present','Denied','Unknown','Not assessed']} as Field)),long('rosNotes','ROS details')]},
  {title:'Medicines & background',fields:[long('meds','Medications - name, dose, route, frequency, reason, effects, adherence'),long('supplements','Supplements / nonprescription products'),...['Contact','Food','Environment','Drugs'].map(label=>long(`allergy-${label}`,`${label} allergies - allergen, reaction, severity; none / unknown / not assessed`)),long('pmh','Past medical history'),long('psh','Past surgical history'),long('fh','Family history'),long('sh','Social history - tobacco, alcohol, drugs, caffeine, diet, exercise, relationships, occupation, housing, stress, sleep, sexual history, hobbies')]},
  {title:'Objective / vitals',fields:['BP (mmHg)','Heart rate (bpm)','Respiratory rate (/min)','Temperature (include C or F and route)','SpO2 (%) / oxygen support','Weight (kg)','Height (cm)','Measurement time / conditions'].map((label,i)=>text(`vital-${i}`,label))},
  {title:'Examination',fields:[...examsFor(o).flatMap((label,i)=>[{id:`exam-${i}`,label,type:'select',options:['Performed','Not performed','Deferred','Unable','Declined']} as Field,long(`finding-${i}`,`${label} - findings`)]),long('examNotes','Consent / chaperone / limitations / additional findings'),long('results','Tests / results / collection times')]},
  {title:'Assessment & plan',fields:[long('assessment','Assessment / working diagnoses'),long('differential','Differential / supporting and opposing evidence'),long('plan','Plan / treatments / orders'),long('followup','Follow-up / pending results / responsible clinician'),long('return','Return precautions / disposition'),long('discussion','Discussion / patient understanding / supervisor review'),{id:'reviewed',label:'I reviewed this note for accuracy',type:'check'}]},
 ];
}
