// Test certificate validation
const testCertificateValidation = async () => {
  try {
    const response = await fetch(
      "http://localhost:3001/api/validate-certificate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ certificateCode: "BRUDF2024005" }),
      }
    );

    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Test with Node.js fetch (if available) or use curl
console.log("Testing certificate validation...");
