//4th view, white bg with create poll form

const CreatePage = () => {
    return (
        <div>
            <h2>Create a Poll</h2>
            <form>
                //place the list of already made options here; each option has its own x button to remove it
                <input type="text">Enter Field</input>
                <button onClick={addOption}>+</button> //the + button adds another option to the poll
                <input type="checkbox" name="multichoice">Allow multiple choices</input>
                <input type="checkbox" name="loginreq">Require login to vote</input>
                <input type="submit">Create Poll</input>
            </form>
        </div>
    );
};

function addOption(){
    
}
export default CreatePage;