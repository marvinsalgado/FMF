import { Component } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GeneroServiceService} from './services/genero/genero-service.service';
import {ClubesServiceService} from './services/clubes/clubes-service.service';
import {NacionalidadesServiceService} from './services/nacionalidades/nacionalidades-service.service';
import { DatePipe } from '@angular/common';
import {DatosGenerales} from './models/datosGenerales';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private ngWizardService: NgWizardService,
              private generos: GeneroServiceService,
              private nacionalidad: NacionalidadesServiceService,
              private club: ClubesServiceService,
              public formBuilder: FormBuilder,
              public datepipe: DatePipe
  ) {

    this.datosGenerales = this.formBuilder.group({
      nombre: ['', Validators.required],
      paterno: ['', Validators.required],
      materno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      nacionalidad: ['', Validators.required],
      club: ['', Validators.required],
      rfc: ['', Validators.pattern('[A-Z]{4}\\d{6}[A-Z0-9]{3}')],
      ocupacion: ['', Validators.required],
    });
  }
  title = 'jr-test';
  public datosGenerales: FormGroup;
  genero: any;
  generoName: any;
  nacionalidadName: any;
  nacionalidades: any;
  clubes: any;
  clubName: any;
  clubLogo: any;
  selectedClub: number;
  edad: number;
  rfcValidate: number;
  error: string;
  final: number;


  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
  };

  isValidTypeBoolean = true;

  ngOnInit() {
    this.final = 0;
    this.rfcValidate = 0;
    this.error = '';
    this.generoName = '';
    this.nacionalidadName = '';
    this.clubName = '';
    this.clubLogo = '';
    this.genero = this.generos.get();
    this.nacionalidades = this.nacionalidad.get();
    this.clubes = this.club.get();
  }

  calcAge() {
    const timeDiff = Math.abs(Date.now() - new Date(this.datosGenerales.value.fechaNacimiento).getTime());
    this.edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    this.rfcValidate = this.edad >= 18 && this.edad < 120 ? 1 : 0;
  }

  enviarInfo() {
    this.error = '';
    const errorRfc = this.validateRFCFecNac();
    if (errorRfc === 0) {


      const result = this.genero.find(object => {
        return object.idGenero ==  this.datosGenerales.value.genero;
      });
      this.generoName = result.nombre;

      const resultNac = this.nacionalidades.find(object => {
        return object.id ==  this.datosGenerales.value.nacionalidad;
      });
      this.nacionalidadName = resultNac.nombre;
      const resultEqui = this.clubes.find(object => {
        return object.id ==  this.datosGenerales.value.club;
      });
      this.clubName = resultEqui.nombre;
      this.clubLogo = resultEqui.logo;
      this.final = 1;
      Swal.fire('Se envio la información');


    }
  }

  validateRFCFecNac() {
    if (this.rfcValidate == 1) {
      const latestDate = this.datepipe.transform(this.datosGenerales.value.fechaNacimiento, 'yyMMdd');
      const fecha = this.datosGenerales.value.rfc.substring(4, 10);
      if (fecha !== latestDate) {
        this.error = 'La fecha de nacimiento no coincide con el RFC';
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  pdf() {
    const doc = new jsPDF();
    doc.setTextColor(0, 255, 0);
    doc.text('Evaluación Desarrollador Jr.!', 10, 10);
    doc.setTextColor(0);
    doc.text('Datos Generales', 10, 30);
    doc.text('Nombre: ' + this.datosGenerales.value.nombre, 10, 40);
    doc.text('Apellido Paterno: ' + this.datosGenerales.value.paterno, 10, 50);
    doc.text('Apellido Paterno: ' + this.datosGenerales.value.materno, 10, 60);
    doc.text('Género : ' + this.datepipe.transform(this.datosGenerales.value.fechaNacimiento, 'dd/MM/yyyy'), 10, 70);
    doc.text('Nacionalidad : ' + this.nacionalidadName, 10, 80);
    doc.text('Club de Fútbol: '  + this.clubName, 10, 90);
    if (this.edad >= 18) {
      doc.text('R.F.C.:' + this.datosGenerales.value.rfc, 10, 110);
    }
    doc.text('Ocupación: ' + this.datosGenerales.value.ocupacion, 10, 100);

    doc.save('FMF.pdf');
  }



  stepChanged(args: StepChangedArgs) {
    //console.log(args.step);
  }

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }
}
