async function generateImage() {
    const apiKey = 'c18df170-2eeb-4729-8b2b-46bba09fb5e5';
    const prompt = document.getElementById('prompt').value;  

    try {
        const response = await fetch('https://api.imagepig.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': apiKey
            },
            body: JSON.stringify({"prompt": prompt})
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.error && errorData.next_request_seconds) {
                throw new Error(`Slow down, you have sent too many requests. Please wait ${errorData.next_request_seconds} seconds.`);
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        }

        const data = await response.json();
        const imageElement = document.getElementById('generatedImage');
        imageElement.src = `data:${data.mime_type};base64,${data.image_data}`;
    } catch (error) {
        showModal(error.message);
        console.error('Error generating image:', error);
    }
}

function resetPage() {
    document.getElementById('prompt').value = '';
    document.getElementById('generatedImage').src = '';
    location.reload();
}

function showModal(message) {
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none";
}

document.querySelector('.close').onclick = function() {
    closeModal();
}

window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
}