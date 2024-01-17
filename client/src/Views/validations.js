const validate = (form) => {
    const regexNumber = /^[0-9]*$/;
    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;
    //const regexDob = /^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/ //yyyy-mm-dd

    let errors = {};

    //* Validacion para image
    errors.image = !form.image
    ? "Image is required"
    : !form.image.startsWith('https://')
    ? "The URL must begin with https:// ..."
    : "";

    //* Validacion para forname:
    errors.forename = !form.forename
    ? "Forename is required"
    : !regexName.test(form.forename)
    ? "The Forename can only contain letters"
    : form.forename.length < 3
    ? "The Forename must be more than 3 characters"
    : form.forename.length > 20 
    ? "The Forename must be less than 20 characters"
    : ""

    //* Validacion para surneame:
    errors.surname = !form.surname
    ? "Surname is required"
    : !regexName.test(form.surname)
    ? "The Surname can only contain letters"
    : form.surname.length < 3
    ? "The Surname must be more than 3 characters"
    : form.surname.length > 20
    ? "The Surname must be less than 20 characters"
    : ""

    //* Validacion para description:
    errors.description = !form.description
    ? "Description is required"
    : ""

    //* Validacion para nationality:
    errors.nationality = !form.nationality
    ? "Nationality is required"
    : !regexName.test(form.nationality)
    ? "The Nationality can only contain letters"
    : form.nationality.length < 1
    ? "The Nationality must be more than 1 characters"
    : form.nationality.length > 30
    ? "The Nationality must be less than 30 characters"
    : ""

    //* Validacion para dob:
    errors.dob = !form.dob
    ? "The date of birth is required"
    // : form.dob.includes("/")
    // ? `The date only accepts "-" and not "/"`
    // : !regexDob.test(form.dob)
    // ? "The date only accepts dd/mm/yyyy"
    : ""

    //* Validacion para number:
    errors.number = !regexNumber.test(form.number)
    ? "The number of driver must be a number"
    : parseInt(form.number) <= 0 
    ? "The maximum number cannot be less than 0"
    : parseInt(form.number) > 100
    ? "The number cannot exceed 100"
    : "";
    
    //* Validacion para Teams:
    if (!form.Teams || form.Teams.length === 0) {
      errors.Teams = "The driver must have at least one Team";
    } else {
      errors.Teams = "";
    }
    
    return errors;

};

export default validate;