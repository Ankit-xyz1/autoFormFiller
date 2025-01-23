const puppeteer = require('puppeteer');

// Function to add a delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const names = ["Ananya", "Isha", "Aditi", "Diya", "Madhavi", "Priya", "Neha", "Kavya", "Sneha", "Simran",
        "Shivani", "Ritika", "Nikita", "Kiran", "Shreya", "Meera", "Alisha", "Tanya", "Radhika", "Shruti",
        "Pooja", "Sanya", "Navya", "Kajal", "Manju", "Anjali", "Aishwarya", "Shubhi", "Aarohi", "Siddhi",
        "Lavanya", "Srishti", "Aaradhya", "Naina", "Riya", "Sonal", "Tanvi", "Bhuvi", "Pari", "Sonali",
        "Anvita", "Bhavya", "Shalini", "Ayesha", "Kajal", "Kriti", "Kanika", "Khushboo", "Mansi", "Meenal",
        "Nandini", "Suman", "Kanchan", "Kumari", "Kavitha", "Sundari", "Shweta", "Aarushi", "Manju", "Gargi",
        "Poojan", "Rupal", "Hina", "Nisha", "Hema", "Yashika", "Madhuri", "Komal", "Shivendra", "Vishal",
        "Tushar", "Sanjay", "Rajesh", "Ravi", "Amit", "Vikas", "Vijay", "Anil", "Sandeep", "Manoj",
        "Ajay", "Suresh", "Sunil", "Ashok", "Prem", "Deepak", "Kumar", "Nitin", "Harish", "Ramesh",
        "Pankaj", "Pradeep", "Mukesh", "Siddharth", "Arvind", "Ram", "Sujay", "Raghav", "Harsh", "Krish",
        "Tanmay", "Vikrant", "Subhash", "Keshav", "Mukul", "Saurabh", "Rahul", "Akhil", "Basant"]; // Array of names

    const browser = await puppeteer.launch({ headless: false }); // Launch the browser once

    for (let i = 0; i < 5; i++) {
        const randomName = names[Math.floor(Math.random() * names.length)]; // Pick a random name
        const page = await browser.newPage(); // Create a new page

        try {
            // Open the Google Form
            await page.goto('https://forms.gle/ujo8am9GdFCZGVsz9', { waitUntil: 'domcontentloaded' });

            // Wait for the "Name" input field to be visible and interactable
            await page.waitForSelector('input[type="text"]', { visible: true });

            // 1. Fill in the "Name" field with a random name
            await page.type('input[type="text"]', randomName); // Type the random name

            // 2. Dynamically handle all multiple-choice questions
            const allQuestions = await page.$$('div[role="radiogroup"]'); // Select all multiple-choice questions
            for (let j = 0; j < allQuestions.length; j++) {
                const options = await allQuestions[j].$$('div[role="radio"]'); // Get options for the current question
                const randomOption = Math.floor(Math.random() * options.length); // Pick a random option
                await options[randomOption].click(); // Click the random option
            }

            // 3. Wait for the submit button and click it
            await page.waitForSelector('div[role="button"][aria-label="Submit"]', { visible: true }); // Wait for the submit button
            await page.click('div[role="button"][aria-label="Submit"]'); // Click the submit button

            // Log success
            console.log(`Form submitted with name: ${randomName}`);
        } catch (error) {
            console.error(`Error during form submission for name: ${randomName}`, error);
        } finally {
            await page.close(); // Close the page after each iteration
        }

        // Wait for 5 seconds before the next iteration
        await delay(5000);
    }

    await browser.close(); // Close the browser after all iterations
})();
