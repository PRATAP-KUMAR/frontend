import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function WorkoutForm() {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = {
            title, load, reps
        }

        const response = await fetch('http://localhost:4000/api/workouts',
            {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: { 'Content-Type': 'application/json' }
            })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('new workout added');
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        }
    }

    return (
        <form className="flex flex-col bg-cyan-400 p-5" onSubmit={handleSubmit}>
            <h3 className="text-center">Add a New Workout</h3>
            <label>Excersize Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label>Load (in Kgs): </label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <label>Repetations: </label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />
            <button className="btn-blue w-fit mt-5">Add Workout</button>
            {error && <div className="text-red-500">{error}</div>}
        </form>
    )
}

export default WorkoutForm