
const fetch = require('node-fetch');
const FormData = require('form-data');

async function testForm() {
    const formUrl = "https://formsubmit.co/3c5a1d07857bfc3c551a6c1e5b79683e";

    const formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('message', 'This is a test message from a debugging script.');
    formData.append('_captcha', 'false');
    formData.append('_subject', 'Debug Test Submission');
    formData.append('_template', 'table');

    console.log(`Sending POST request to ${formUrl}...`);

    try {
        const response = await fetch(formUrl, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log(`Response Status: ${response.status} ${response.statusText}`);
        const data = await response.json(); // FormSubmit.co returns JSON when Accept: application/json is set
        console.log('Response Body:', data);

        if (response.ok) {
            console.log('Submission successful according to API.');
        } else {
            console.error('Submission failed.');
        }

    } catch (error) {
        console.error('Error during fetch:', error);
    }
}

testForm();
