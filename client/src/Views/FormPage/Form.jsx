import axios from "axios";
import style from "./Form.module.css"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getByTeams } from "../../Redux/Actions/actions";
import validate from "../validations";

const Form = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const teams = useSelector(state => state.teams);

    useEffect(() => {  //es para que se ejecute siempre y el estado de teams no se quede en ceros
        dispatch(getByTeams());
    }, [dispatch]);

    //* Estado Local:

    const [form, setForm] = useState({
        forename: "",
        surname: "",
        description: "",
        image: "",
        nationality: "",
        dob: "",
        number: "",
        Teams: []
    });
    
    const [errors, setErrors] = useState({});

    // Handlers

    const handleChange = (event) => {
        setErrors(validate({ ...form, [event.target.name]: event.target.value }));
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSelect = (event) => {
        setErrors(validate({ ...form, Teams: [...form.Teams, event.target.value] }));
        setForm({ ...form, Teams: [...form.Teams, event.target.value] });
    };

    const newDriver = {
        forename: form.forename,
        surname: form.surname,
        description: form.description,
        image: form.image,
        nationality: form.nationality,
        dob: form.dob,
        number: form.number,
        Teams: form.Teams
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // para que no recargue la pagina
        //dispatch(postDriver(newDriver));
        console.log('Selected Teams:', form.Teams);
        try {
            await axios.post("http://localhost:3001/drivers", newDriver);

            alert("The Driver was successfully created!");

            setForm({
            forename: "",
            surname: "",
            description: "",
            image: "",
            nationality: "",
            dob: "",
            number: "",
            Teams: []
        }); //es para vaciar los imputs despues de crear a un driver
        
        navigate('/home') // te llevara a home despues de crear al nuevo driver

        } catch(error) {
            alert(error.response.data.error);
        }
    };

    return (
        <div className={style.dadContainer}>
            <div className={style.titleContainer}>
                <h2>{"It's"} Time To Create a New Driver!</h2>
            </div>
            <div className={style.formContainer}>
                <div className={style.imgContainer}>
                    <h3 className={style.achetres}>This is how it will look your New Driver:</h3>
                    <div className={style.divPrev}>
                        {form.image && <img className={style.imgCreate} src={form.image} alt="New Driver" />}
                        <h4>{form.forename} {form.surname}</h4>
                        <h4>Description: {form.description}</h4>
                        <h4>Nationality: {form.nationality}</h4>
                        <h4>Date of Birth: {form.dob}</h4>
                        <h4>Number: {form.number}</h4>
                        <h4>Teams: {form.Teams.join(", ")}</h4>
                    </div>
                </div>

                <div className={style.formInputs}>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="">Forename: </label><input onChange={handleChange} name="forename" type="text" placeholder="firstname" />
                        <label className={style.formErrors}>{errors.forename}</label>

                        <label htmlFor="">Surname: </label><input onChange={handleChange} name="surname" type="text" placeholder="lastname" />
                        <label className={style.formErrors}>{errors.surname}</label>

                        <label htmlFor="">Description: </label><input onChange={handleChange} name="description" type="text" placeholder="a description of your driver" />
                        <label className={style.formErrors}>{errors.description}</label>

                        <label htmlFor="">Image URL: </label><input onChange={handleChange} name="image" type="text" placeholder="https://url-of-image.jpg" />
                        <label className={style.formErrors}>{errors.image}</label>

                        <label htmlFor="">Nationality: </label><input onChange={handleChange} name="nationality" type="text" placeholder="nationality of your driver" />
                        <label className={style.formErrors}>{errors.nationality}</label>

                        <label htmlFor="">Date Of Birth: </label><input onChange={handleChange} name="dob" type="date" placeholder="yyyy-mm-dd" />
                        <label className={style.formErrors}>{errors.dob}</label>

                        <label htmlFor="">Number: </label><input onChange={handleChange} name="number" type="text" placeholder="1 to 100" />
                        <label className={style.formErrors}>{errors.number}</label>
                        
                        <label htmlFor="">Teams: </label>
                        <select onChange={handleSelect} name="Teams">
                            {teams.map(team => <option key={team.id} value={team.name}>{team.name}</option>)}
                        </select>
                        <label className={style.formErrors}>{errors.Teams}</label>

                        <div className={style.submitContainer}>
                            <button className={style.submitBtn} type="submit">Create</button> 
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Form;
//!checar si el type es button o submit