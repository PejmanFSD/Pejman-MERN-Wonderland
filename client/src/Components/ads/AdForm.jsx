import { useState } from "react";

export default function AdForm() {
    const [company, setCompany] = useState('');
    const [text, setText] = useState('');
    // const [image, setImage] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
    e.preventDefault();
    const ad = { company, text };
    const response = await fetch('/ads', {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ company, text })
    });
    const json = await response.json();
    if (!response.ok) {
        setError(json.error);
    } else {
        setCompany('');
        setText('');
        setError(null);
        console.log('New Ad added');
    }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create a new Ad</h3>
            <div>
                <label htmlFor="company">Ad Company:</label>
                <input
                    type="text"
                    onChange={(e) => setCompany(e.target.value)}
                    id="company"
                    name="company"
                    value={company}
                    required
                />
            </div>

            <div>
                <label htmlFor="text">Ad Text:</label>
                <textarea
                    type="text"
                    onChange={(e) => setText(e.target.value)}
                    id="text"
                    name="ad[text]"
                    value={text}
                    required
                >
                </textarea>
            </div>

            {/* <div>
            <label htmlFor="image">Ad Image:</label>
            <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            />
            </div> */}
            {/* <div>
                <label htmlFor="image">Ad Image:</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    id="image"
                    name="image"
                    value={image}
                    multiple
                />
            </div> */}
            <button>Create Ad</button>
            {error && <div>{error}</div>}
        </form>
    )
}