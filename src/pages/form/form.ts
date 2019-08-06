import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  forms={
career:'',
name:'',
gender:'',
age:'',
contact:'',
emailid:'',
city:'',
percentage:'',
schoolname:'',
collegename:'',
graduationyear:'',
projects:'',
tandc:'',
position:'',
skills:'',
additional:'',
references:''

  };
  pdfObj=null;
  strings: any; 
  
  constructor(private fileOpener : FileOpener,public navCtrl: NavController, public navParams: NavParams,private plt: Platform, private file: File) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }
  create(){
    var docDefinition = {
      content: [

        { text: this.forms.name, style: 'name' },

        { text: this.forms.gender, style: 'subheader' },

        { text: this.forms.age  , style: 'subheader' },
 
        { text: this.forms.emailid, style: 'subheader' },

        { text:  this.forms.contact , style: 'subheader' },
        
        { text: this.forms.city, style: 'subheader' },

        { text: this.forms.collegename, style: 'subheader1' },
      
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
    
        { text: 'Career Objective:', style: 'header1' },
        { text: this.forms.career, style: 'header2' },

        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},

        { text: 'Education Details:', style: 'header1' },
        { text: 'High School:', style: 'header3' },
        { text: this.forms.schoolname, style: 'header2' },
        { text: this.forms.percentage, style: 'header2' },

        { text: 'College:', style: 'header3' },
        { text: this.forms.collegename, style: 'header2' },
        { text: this.forms.graduationyear, style: 'header2' },

        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},

        { text: 'Training:', style: 'header1' },
        { text: this.forms.tandc, style: 'header2' },

       {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},

        { text: 'Projects:', style: 'header1' },
        { text: this.forms.projects, style: 'header2' },

        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},

        { text: 'Skills:', style: 'header1' },
        { text: this.forms.skills, style: 'header2' },

        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},

        { text: 'Position of Responsibility:', style: 'header1' },
        { text: this.forms.position, style: 'header2' },

        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},

        { text: 'References:', style: 'header1' },
        { text: this.forms.references, style: 'header2' },





        ],
     
     
       styles: {

        header3: {
          fontSize: 13,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        header2: {
          fontSize: 12,
          bold: false,
          margin: [0, 0, 0, 5]
        },
        header1: {
          fontSize: 15,
          bold: true,
          margin: [0, 5, 0, 0]
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        subheader1: {
          fontSize: 10,
          bold: true,
          margin: [0, 2, 0, 5]
        },
    
      subheader: {
          fontSize: 10,
          bold: true,
          margin: [0, 2, 0, 0]
        },
        name: {
          fontSize: 15,
          bold: true,
          
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
  
  generate() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
 
}


