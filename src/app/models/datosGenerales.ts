export class DatosGenerales {
  public id: number;
  public nombre: string;
  public paterno: string;
  public materno: string;
  public fechaNacimiento: string;
  public genero: number;
  public nacionalidad: number;
  public club: number;
  public rfc: string;
  public ocupacion: string;

  constructor(
    id: number,
    nombre: string,
    paterno: string,
    materno: string,
    fechaNacimiento: string,
    genero: number,
    nacionalidad: number,
    club: number,
    rfc: string,
    ocupacion: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.paterno = paterno;
    this.materno = materno;
    this.fechaNacimiento = fechaNacimiento;
    this.genero = genero;
    this.nacionalidad = nacionalidad;
    this.club = club;
    this.rfc = rfc;
    this.ocupacion = ocupacion;
  }
}
