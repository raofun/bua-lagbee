const fetch = require('node-fetch');

async function testInit() {
  try {
    const res = await fetch("http://localhost:3000/api/helpers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Helper",
        location: "Test Location",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
        category: "Chef",
        shift: "Morning",
        workingHours: "8 AM - 12 PM",
        tasks: [{ name: "General Duty", bnName: "সাধারণ কাজ", price: 5000 }],
        skills: ["Cooking"],
        bnSkills: ["রান্না"],
        
        adminId: "dummy" 
      })
    });
    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}
testInit();
