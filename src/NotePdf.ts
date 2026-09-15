import { pdfNotice } from './disclaimer.ts';
import { PDFDocument, StandardFonts, rgb } from './vendor/pdf-lib.js';
import { noteSections, type Note } from './noteModel.ts';
import type { Outline } from './catalog.ts';
import type { PdfResult, DrawOp } from './pdf.ts';
export async function buildNotePdf(note:Note,outline:Outline,paper:'US Letter'|'A4'):Promise<PdfResult> {
 const doc=await PDFDocument.create(),font=await doc.embedFont(StandardFonts.Helvetica),bold=await doc.embedFont(StandardFonts.HelveticaBold);
 const [width,height]=paper==='A4'?[595.28,841.89]:[612,792];
 const pages:PdfResult['pages']=[];let ops:DrawOp[]=[],y=0;
 const draw=(text:string,size:number,b=false)=>{(b?bold:font).encodeText(text);ops.push({kind:'text',text,x:42,y,size,bold:b,color:'#283c31'});};
 const page=()=>{ops=[];pages.push({width,height,title:outline.title,ops});y=34;draw('FOLIO / ENCOUNTER NOTE',8,true);y=57;draw(outline.title,Math.min(14,14*(width-84)/bold.widthOfTextAtSize(outline.title,14)),true);y=height-52;draw(`Page ${pages.length} / ${note.values.reviewed==='yes'?'Reviewed by author':'Draft - not reviewed'}`,7);y=height-37;draw(pdfNotice[0],6);y=height-26;draw(pdfNotice[1],6);y=85;};
 const ensure=(heightNeeded:number)=>{if(y+heightNeeded>height-75)page();};
 const write=(value:string,size=10,b=false)=>{
  // Never silently drop patient-entered characters. Unsupported glyphs produce an explicit export error.
  const normalized=value.replace(/[“”]/g,'"').replace(/[‘’]/g,"'").replace(/[–—]/g,'-');
  for(const paragraph of normalized.split('\n')) {
   let row='';
   for(const ch of paragraph) {if((b?bold:font).widthOfTextAtSize(row+ch,size)>width-84){ensure(size+5);draw(row,size,b);y+=size+5;row='';}row+=ch;}
   ensure(size+5);draw(row||' ',size,b);y+=size+5;
  }
 };
 page();
 for(const section of noteSections(outline)) {
  const fields=section.fields.filter(f=>note.values[f.id]!==undefined&&note.values[f.id]!=='');
  if(!fields.length)continue;
  ensure(55);write(section.title.toUpperCase(),11,true);y+=6;
  for(const f of fields){ensure(36);write(f.label,9,true);write(f.type==='check'?(note.values[f.id]==='yes'?'Yes':'No'):note.values[f.id]);y+=8;}
  y+=8;
 }
 if(!Object.values(note.values).some(Boolean))write('No entries recorded.');
 for(const p of pages){const sheet=doc.addPage([width,height]);for(const op of p.ops)if(op.kind==='text')sheet.drawText(op.text,{x:op.x,y:height-op.y,size:op.size,font:op.bold?bold:font,color:rgb(.16,.25,.2)});}
 doc.setTitle('Folio encounter note');return {bytes:await doc.save(),pages,filename:`folio-note-${note.id.slice(0,8)}-${paper==='A4'?'a4':'letter'}.pdf`};
}
