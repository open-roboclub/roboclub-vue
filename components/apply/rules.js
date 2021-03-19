export const rules = {
  nameRules: [v => !!v || 'Name is required'],
  emailRules: [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
  ],
  facultyNumberRules: [
    v => !!v || 'Faculty Number is required',
    v =>
      /^[0-9]{2}[A-Za-z]{3}[0-9]{3}$/.test(v) ||
      'Faculty Number should be valid'
  ],
  facultyNumberMtechRules: [
    v => !!v || 'Faculty Number is required',
    v =>
      /^[0-9]{2}[A-Za-z]{4}[0-9]{3}$/.test(v) ||
      'Faculty Number should be valid'
  ],
  enrollmentNumberRules: [
    v => !!v || 'Enrollment Number is required',
    v => /^[A-Za-z]{2}[0-9]{4}$/.test(v) || 'Enrollment Number should be valid'
  ],
  mobileNumberRules: [
    v => !!v || 'Mobile Number is required',
    v => /^[0-9]{10}$/.test(v) || 'Mobile Number should be valid'
  ],
  notNullRules: [v => !!v || 'Field is required']
}
